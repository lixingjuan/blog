#!/usr/bin/env python3
"""Build a cross-reader EPUB 2 edition with a two-level table of contents."""

from pathlib import Path
from html import escape
import re
import uuid
import zipfile
import xml.etree.ElementTree as ET

ROOT = Path(__file__).resolve().parent
OUTPUT = ROOT / "output"
CHAPTERS = sorted((ROOT / "chapters").glob("[0-9][0-9]_*/article.txt"))
BOOK_TITLE = "Ten Worlds of IELTS Vocabulary — Hierarchical Edition"
IDENTIFIER = "urn:uuid:c70970f4-2c21-4389-961a-d854637657ca"
SPECIAL_IDS = {
    "GLOSSARY": "glossary",
    "REVIEW PROMPTS": "review-prompts",
    "VOCABULARY PRACTICE": "vocabulary-practice",
}


def inline_markup(text: str) -> str:
    safe = escape(text, quote=False)
    return re.sub(r"\*\*(.+?)\*\*", r"<strong>\1</strong>", safe)


def plain(text: str) -> str:
    return re.sub(r"\*\*", "", text)


def paragraph_blocks(text: str) -> list[str]:
    return [p.strip() for p in re.split(r"\n\s*\n", text) if p.strip()]


def chapter_title(text: str) -> str:
    return plain(paragraph_blocks(text)[1]).title()


def subsection_records(text: str) -> list[tuple[str, str]]:
    records = []
    section_number = 0
    in_main_article = True
    for para in paragraph_blocks(text)[2:]:
        if para == "GLOSSARY":
            in_main_article = False
        if in_main_article and re.match(r"^\d+\.\s+", para):
            section_number += 1
            records.append((f"section-{section_number:02d}", plain(para)))
        elif para in SPECIAL_IDS:
            records.append((SPECIAL_IDS[para], para.title()))
    return records


def content_xhtml(text: str, number: int, title: str) -> str:
    paragraphs = paragraph_blocks(text)
    blocks = [
        '<div class="chapter-title" id="chapter-top">'
        f'<span class="chapter-number">CHAPTER {number:02d}</span><br/>'
        f'<span class="chapter-name">{inline_markup(paragraphs[1])}</span></div>'
    ]
    section_number = 0
    in_main_article = True
    for para in paragraphs[2:]:
        lines = para.splitlines()
        if para == "GLOSSARY":
            in_main_article = False
        if in_main_article and len(lines) == 1 and re.match(r"^\d+\.\s+", para):
            section_number += 1
            blocks.append(
                f'<p id="section-{section_number:02d}" class="section-title">{inline_markup(para)}</p>'
            )
        elif para in SPECIAL_IDS:
            blocks.append(f'<p id="{SPECIAL_IDS[para]}" class="major-title">{escape(para)}</p>')
        elif all(re.match(r"^\*\*.+?\*\* — ", line) for line in lines):
            blocks.extend(f'<p class="glossary">{inline_markup(line)}</p>' for line in lines)
        else:
            blocks.extend(f"<p>{inline_markup(line)}</p>" for line in lines)
    content = "\n".join(blocks)
    return f'''<?xml version="1.0" encoding="utf-8"?>
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.1//EN" "http://www.w3.org/TR/xhtml11/DTD/xhtml11.dtd">
<html xmlns="http://www.w3.org/1999/xhtml" xml:lang="en">
<head><title>{escape(title)}</title><link rel="stylesheet" type="text/css" href="styles.css"/></head>
<body><div id="chapter-{number:02d}">{content}</div></body>
</html>'''


def make_ncx(
    texts: list[str],
    titles: list[str],
    book_title: str = BOOK_TITLE,
    identifier: str = IDENTIFIER,
) -> tuple[str, int]:
    play_order = 0
    chapters = []
    total_points = 0
    for chapter_number, (text, title) in enumerate(zip(texts, titles), 1):
        play_order += 1
        total_points += 1
        children = []
        for target_id, label in subsection_records(text):
            play_order += 1
            total_points += 1
            children.append(
                f'<navPoint id="nav-{chapter_number:02d}-{target_id}" playOrder="{play_order}">'
                f'<navLabel><text>{escape(label)}</text></navLabel>'
                f'<content src="chapter-{chapter_number:02d}.xhtml#{target_id}"/></navPoint>'
            )
        chapters.append(
            f'<navPoint id="nav-chapter-{chapter_number:02d}" playOrder="{play_order - len(children)}">'
            f'<navLabel><text>Chapter {chapter_number:02d} — {escape(title)}</text></navLabel>'
            f'<content src="chapter-{chapter_number:02d}.xhtml#chapter-top"/>{"".join(children)}</navPoint>'
        )
    ncx = f'''<?xml version="1.0" encoding="UTF-8"?>
<!DOCTYPE ncx PUBLIC "-//NISO//DTD ncx 2005-1//EN" "http://www.daisy.org/z3986/2005/ncx-2005-1.dtd">
<ncx xmlns="http://www.daisy.org/z3986/2005/ncx/" version="2005-1" xml:lang="en">
<head><meta name="dtb:uid" content="{identifier}"/><meta name="dtb:depth" content="2"/><meta name="dtb:totalPageCount" content="0"/><meta name="dtb:maxPageNumber" content="0"/></head>
<docTitle><text>{escape(book_title)}</text></docTitle><navMap>{''.join(chapters)}</navMap></ncx>'''
    return ncx, total_points


def build() -> Path:
    if len(CHAPTERS) != 10:
        raise SystemExit(f"Expected 10 chapters; found {len(CHAPTERS)}")
    texts = [path.read_text() for path in CHAPTERS]
    titles = [chapter_title(text) for text in texts]
    for index, text in enumerate(texts, 1):
        records = subsection_records(text)
        if len(records) != 15:
            raise SystemExit(f"Chapter {index:02d}: expected 15 secondary entries; found {len(records)}")
    ncx, total_points = make_ncx(texts, titles)
    if total_points != 160:
        raise SystemExit(f"Expected 160 total navigation points; found {total_points}")

    OUTPUT.mkdir(exist_ok=True)
    target = OUTPUT / "ten_worlds_ielts_vocabulary_hierarchical.epub"
    container = '''<?xml version="1.0" encoding="UTF-8"?>
<container version="1.0" xmlns="urn:oasis:names:tc:opendocument:xmlns:container">
<rootfiles><rootfile full-path="OEBPS/content.opf" media-type="application/oebps-package+xml"/></rootfiles>
</container>'''
    css = '''body { font-family: serif; line-height: 1.55; margin: 5%; }
p { margin: 0 0 0.8em; text-align: justify; }
strong { font-weight: bold; }
.chapter-title { text-align: center; margin: 1.2em 0 2em; page-break-after: avoid; }
.chapter-number { font-size: 0.85em; letter-spacing: 0.12em; }
.chapter-name { display: inline-block; margin-top: 0.7em; font-size: 1.8em; font-weight: bold; }
.section-title, .major-title { font-size: 1.3em; font-weight: bold; margin-top: 1.6em; text-align: left; page-break-after: avoid; }
.glossary { margin-bottom: 0.35em; text-align: left; }
'''
    manifest = ['<item id="ncx" href="toc.ncx" media-type="application/x-dtbncx+xml"/>',
                '<item id="css" href="styles.css" media-type="text/css"/>']
    spine = []
    for index in range(1, 11):
        manifest.append(f'<item id="c{index}" href="chapter-{index:02d}.xhtml" media-type="application/xhtml+xml"/>')
        spine.append(f'<itemref idref="c{index}"/>')
    opf = f'''<?xml version="1.0" encoding="utf-8"?>
<package xmlns="http://www.idpf.org/2007/opf" version="2.0" unique-identifier="book-id">
<metadata xmlns:dc="http://purl.org/dc/elements/1.1/" xmlns:opf="http://www.idpf.org/2007/opf">
<dc:identifier id="book-id" opf:scheme="UUID">{IDENTIFIER}</dc:identifier>
<dc:title>{escape(BOOK_TITLE)}</dc:title><dc:creator>IELTS Vocabulary Through Context</dc:creator>
<dc:language>en</dc:language></metadata>
<manifest>{''.join(manifest)}</manifest><spine toc="ncx">{''.join(spine)}</spine></package>'''

    with zipfile.ZipFile(target, "w") as book:
        book.writestr("mimetype", "application/epub+zip", compress_type=zipfile.ZIP_STORED)
        book.writestr("META-INF/container.xml", container)
        book.writestr("OEBPS/styles.css", css)
        book.writestr("OEBPS/toc.ncx", ncx)
        book.writestr("OEBPS/content.opf", opf)
        for index, (text, title) in enumerate(zip(texts, titles), 1):
            book.writestr(f"OEBPS/chapter-{index:02d}.xhtml", content_xhtml(text, index, title))
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
        assert not any(name.endswith("nav.xhtml") for name in book.namelist())
        ncx = ET.fromstring(book.read("OEBPS/toc.ncx"))
        top = ncx.findall("./ncx:navMap/ncx:navPoint", ns)
        all_points = ncx.findall(".//ncx:navPoint", ns)
        assert len(top) == 10
        assert len(all_points) == 160
        assert all(len(point.findall("./ncx:navPoint", ns)) == 15 for point in top)
        play_orders = [int(point.attrib["playOrder"]) for point in all_points]
        assert sorted(play_orders) == list(range(1, 161))

        for chapter_number, source_path in enumerate(CHAPTERS, 1):
            tree = ET.fromstring(book.read(f"OEBPS/chapter-{chapter_number:02d}.xhtml"))
            ids = {element.attrib["id"] for element in tree.iter() if "id" in element.attrib}
            expected_ids = {"chapter-top", *(target for target, _ in subsection_records(source_path.read_text()))}
            assert expected_ids <= ids
            tags = {element.tag.rsplit("}", 1)[-1] for element in tree.iter()}
            assert not tags.intersection({"h1", "h2", "h3", "h4", "h5", "h6"})
            source_bold = len(re.findall(r"\*\*(.+?)\*\*", source_path.read_text()))
            epub_bold = len(tree.findall(".//x:strong", ns))
            assert source_bold == epub_bold


if __name__ == "__main__":
    result = build()
    validate(result)
    print(f"hierarchical_epub={result} bytes={result.stat().st_size}")
    print("chapters=10 child_entries=150 total_navigation_points=160 validation=passed")
