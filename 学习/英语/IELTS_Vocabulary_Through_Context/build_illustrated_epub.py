#!/usr/bin/env python3
"""Build the final two-level EPUB 2 edition with an embedded cover."""

from pathlib import Path
from html import escape
import re
import zipfile
import xml.etree.ElementTree as ET

import build_hierarchical_epub as base

ROOT = Path(__file__).resolve().parent
OUTPUT = ROOT / "output"
COVER = ROOT / "assets" / "cover-final.png"
BOOK_TITLE = "Ten Worlds of IELTS Vocabulary"
IDENTIFIER = "urn:uuid:6003cbf4-5e64-4194-baf9-36b8b145f18b"
OUTPUT_NAME = "ten_worlds_ielts_vocabulary_final.epub"


def cover_xhtml() -> str:
    return '''<?xml version="1.0" encoding="utf-8"?>
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.1//EN" "http://www.w3.org/TR/xhtml11/DTD/xhtml11.dtd">
<html xmlns="http://www.w3.org/1999/xhtml" xml:lang="en">
<head><title>Cover</title><link rel="stylesheet" type="text/css" href="styles.css"/></head>
<body class="cover-body"><div class="cover-page"><img src="cover-final.png" alt="Ten Worlds of IELTS Vocabulary"/></div></body>
</html>'''


def build() -> Path:
    if len(base.CHAPTERS) != 10:
        raise SystemExit(f"Expected 10 chapters; found {len(base.CHAPTERS)}")
    if not COVER.exists():
        raise SystemExit(f"Cover image not found: {COVER}")

    texts = [path.read_text() for path in base.CHAPTERS]
    titles = [base.chapter_title(text) for text in texts]
    for index, text in enumerate(texts, 1):
        records = base.subsection_records(text)
        if len(records) != 15:
            raise SystemExit(f"Chapter {index:02d}: expected 15 secondary entries; found {len(records)}")

    ncx, total_points = base.make_ncx(texts, titles, BOOK_TITLE, IDENTIFIER)
    if total_points != 160:
        raise SystemExit(f"Expected 160 navigation points; found {total_points}")

    OUTPUT.mkdir(exist_ok=True)
    target = OUTPUT / OUTPUT_NAME
    container = '''<?xml version="1.0" encoding="UTF-8"?>
<container version="1.0" xmlns="urn:oasis:names:tc:opendocument:xmlns:container">
<rootfiles><rootfile full-path="OEBPS/content.opf" media-type="application/oebps-package+xml"/></rootfiles>
</container>'''
    css = '''html, body { margin: 0; padding: 0; }
body { font-family: serif; line-height: 1.55; margin: 5%; }
p { margin: 0 0 0.8em; text-align: justify; }
strong { font-weight: bold; }
.cover-body { margin: 0; padding: 0; text-align: center; }
.cover-page { margin: 0; padding: 0; text-align: center; }
.cover-page img { display: block; width: 100%; height: auto; margin: 0 auto; }
.chapter-title { text-align: center; margin: 1.2em 0 2em; page-break-after: avoid; }
.chapter-number { font-size: 0.85em; letter-spacing: 0.12em; }
.chapter-name { display: inline-block; margin-top: 0.7em; font-size: 1.8em; font-weight: bold; }
.section-title, .major-title { font-size: 1.3em; font-weight: bold; margin-top: 1.6em; text-align: left; page-break-after: avoid; }
.glossary { margin-bottom: 0.35em; text-align: left; }
'''
    manifest = [
        '<item id="ncx" href="toc.ncx" media-type="application/x-dtbncx+xml"/>',
        '<item id="css" href="styles.css" media-type="text/css"/>',
        '<item id="cover-image" href="cover-final.png" media-type="image/png"/>',
        '<item id="cover-page" href="cover.xhtml" media-type="application/xhtml+xml"/>',
    ]
    chapter_spine = []
    for index in range(1, 11):
        manifest.append(
            f'<item id="c{index}" href="chapter-{index:02d}.xhtml" media-type="application/xhtml+xml"/>'
        )
        chapter_spine.append(f'<itemref idref="c{index}"/>')

    opf = f'''<?xml version="1.0" encoding="utf-8"?>
<package xmlns="http://www.idpf.org/2007/opf" version="2.0" unique-identifier="book-id">
<metadata xmlns:dc="http://purl.org/dc/elements/1.1/" xmlns:opf="http://www.idpf.org/2007/opf">
<dc:identifier id="book-id" opf:scheme="UUID">{IDENTIFIER}</dc:identifier>
<dc:title>{escape(BOOK_TITLE)}</dc:title><dc:creator>IELTS Vocabulary Through Context</dc:creator>
<dc:language>en</dc:language><meta name="cover" content="cover-image"/></metadata>
<manifest>{''.join(manifest)}</manifest>
<spine toc="ncx"><itemref idref="cover-page"/>{''.join(chapter_spine)}</spine>
<guide><reference type="cover" title="Cover" href="cover.xhtml"/></guide>
</package>'''

    with zipfile.ZipFile(target, "w") as book:
        book.writestr("mimetype", "application/epub+zip", compress_type=zipfile.ZIP_STORED)
        book.writestr("META-INF/container.xml", container)
        book.writestr("OEBPS/styles.css", css)
        book.writestr("OEBPS/toc.ncx", ncx)
        book.writestr("OEBPS/content.opf", opf)
        book.writestr("OEBPS/cover.xhtml", cover_xhtml())
        book.write(COVER, "OEBPS/cover-final.png")
        for index, (text, title) in enumerate(zip(texts, titles), 1):
            book.writestr(
                f"OEBPS/chapter-{index:02d}.xhtml",
                base.content_xhtml(text, index, title),
            )
    return target


def validate(path: Path) -> None:
    ns = {
        "ncx": "http://www.daisy.org/z3986/2005/ncx/",
        "opf": "http://www.idpf.org/2007/opf",
        "x": "http://www.w3.org/1999/xhtml",
    }
    with zipfile.ZipFile(path) as book:
        assert book.testzip() is None
        assert book.infolist()[0].filename == "mimetype"
        assert book.infolist()[0].compress_type == zipfile.ZIP_STORED
        names = set(book.namelist())
        assert {"OEBPS/cover-final.png", "OEBPS/cover.xhtml"} <= names
        assert not any(name.endswith("nav.xhtml") for name in names)

        opf = ET.fromstring(book.read("OEBPS/content.opf"))
        cover_meta = opf.find(".//opf:metadata/opf:meta[@name='cover']", ns)
        assert cover_meta is not None and cover_meta.attrib["content"] == "cover-image"
        guide = opf.find(".//opf:guide/opf:reference[@type='cover']", ns)
        assert guide is not None and guide.attrib["href"] == "cover.xhtml"
        manifest = {item.attrib["id"]: item.attrib["href"] for item in opf.findall(".//opf:manifest/opf:item", ns)}
        spine = [manifest[item.attrib["idref"]] for item in opf.findall(".//opf:spine/opf:itemref", ns)]
        assert spine == ["cover.xhtml", *(f"chapter-{i:02d}.xhtml" for i in range(1, 11))]

        ncx = ET.fromstring(book.read("OEBPS/toc.ncx"))
        top = ncx.findall("./ncx:navMap/ncx:navPoint", ns)
        all_points = ncx.findall(".//ncx:navPoint", ns)
        assert len(top) == 10 and len(all_points) == 160
        assert all(len(point.findall("./ncx:navPoint", ns)) == 15 for point in top)

        cover_doc = ET.fromstring(book.read("OEBPS/cover.xhtml"))
        image = cover_doc.find(".//x:img", ns)
        assert image is not None and image.attrib["src"] == "cover-final.png"

        for chapter_number, source_path in enumerate(base.CHAPTERS, 1):
            tree = ET.fromstring(book.read(f"OEBPS/chapter-{chapter_number:02d}.xhtml"))
            tags = {element.tag.rsplit("}", 1)[-1] for element in tree.iter()}
            assert not tags.intersection({"h1", "h2", "h3", "h4", "h5", "h6"})
            source_bold = len(re.findall(r"\*\*(.+?)\*\*", source_path.read_text()))
            epub_bold = len(tree.findall(".//x:strong", ns))
            assert source_bold == epub_bold


if __name__ == "__main__":
    result = build()
    validate(result)
    print(f"final_epub={result} bytes={result.stat().st_size}")
    print("cover=embedded chapters=10 child_entries=150 total_navigation_points=160 validation=passed")
