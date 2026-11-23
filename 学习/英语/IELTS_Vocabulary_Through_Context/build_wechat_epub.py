#!/usr/bin/env python3
"""Build an EPUB 2 edition designed for WeChat Reading import compatibility."""

from pathlib import Path
from html import escape
import re
import zipfile
import xml.etree.ElementTree as ET

ROOT = Path(__file__).resolve().parent
OUTPUT = ROOT / "output"
CHAPTERS = sorted((ROOT / "chapters").glob("[0-9][0-9]_*/article.txt"))
BOOK_TITLE = "Ten Worlds of IELTS Vocabulary — WeChat Edition"
IDENTIFIER = "urn:uuid:391391fe-f513-4558-b060-b471263ee5ec"


def inline_markup(text: str) -> str:
    safe = escape(text, quote=False)
    return re.sub(r"\*\*(.+?)\*\*", r"<strong>\1</strong>", safe)


def get_title(text: str) -> str:
    lines = [line.strip() for line in text.splitlines() if line.strip()]
    return re.sub(r"\*\*", "", lines[1]).title()


def content_xhtml(text: str, number: int, title: str) -> str:
    paragraphs = [p.strip() for p in re.split(r"\n\s*\n", text) if p.strip()]
    source_title = paragraphs[1]
    blocks = [
        '<div class="chapter-title">'
        f'<span class="chapter-number">CHAPTER {number:02d}</span><br/>'
        f'<span class="chapter-name">{inline_markup(source_title)}</span></div>'
    ]
    for index, para in enumerate(paragraphs):
        if index in (0, 1):
            continue
        lines = para.splitlines()
        if len(lines) == 1 and re.match(r"^\d+\.\s+", para):
            blocks.append(f'<p class="section-title">{inline_markup(para)}</p>')
        elif para in {"GLOSSARY", "REVIEW PROMPTS", "VOCABULARY PRACTICE"}:
            blocks.append(f'<p class="major-title">{escape(para)}</p>')
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


def build() -> Path:
    if len(CHAPTERS) != 10:
        raise SystemExit(f"Expected 10 chapters; found {len(CHAPTERS)}")
    OUTPUT.mkdir(exist_ok=True)
    texts = [path.read_text() for path in CHAPTERS]
    titles = [get_title(text) for text in texts]
    target = OUTPUT / "ten_worlds_ielts_vocabulary_wechat.epub"

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
    navpoints = "\n".join(
        f'''<navPoint id="navPoint-{i}" playOrder="{i}"><navLabel><text>{escape(title)}</text></navLabel><content src="chapter-{i:02d}.xhtml"/></navPoint>'''
        for i, title in enumerate(titles, 1)
    )
    ncx = f'''<?xml version="1.0" encoding="UTF-8"?>
<!DOCTYPE ncx PUBLIC "-//NISO//DTD ncx 2005-1//EN" "http://www.daisy.org/z3986/2005/ncx-2005-1.dtd">
<ncx xmlns="http://www.daisy.org/z3986/2005/ncx/" version="2005-1" xml:lang="en">
<head><meta name="dtb:uid" content="{IDENTIFIER}"/><meta name="dtb:depth" content="1"/><meta name="dtb:totalPageCount" content="0"/><meta name="dtb:maxPageNumber" content="0"/></head>
<docTitle><text>{escape(BOOK_TITLE)}</text></docTitle><navMap>{navpoints}</navMap></ncx>'''
    manifest = ['<item id="ncx" href="toc.ncx" media-type="application/x-dtbncx+xml"/>',
                '<item id="css" href="styles.css" media-type="text/css"/>']
    spine = []
    for i in range(1, 11):
        manifest.append(f'<item id="c{i}" href="chapter-{i:02d}.xhtml" media-type="application/xhtml+xml"/>')
        spine.append(f'<itemref idref="c{i}"/>')
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
        for i, (text, title) in enumerate(zip(texts, titles), 1):
            book.writestr(f"OEBPS/chapter-{i:02d}.xhtml", content_xhtml(text, i, title))
    return target


def validate(path: Path) -> None:
    with zipfile.ZipFile(path) as book:
        assert book.testzip() is None
        assert book.infolist()[0].filename == "mimetype"
        assert book.infolist()[0].compress_type == zipfile.ZIP_STORED
        names = book.namelist()
        assert "OEBPS/toc.ncx" in names
        assert not any(name.endswith("nav.xhtml") for name in names)
        assert len([name for name in names if re.fullmatch(r"OEBPS/chapter-\d\d\.xhtml", name)]) == 10
        for name in names:
            if name.endswith((".xml", ".opf", ".ncx", ".xhtml")):
                ET.fromstring(book.read(name))


if __name__ == "__main__":
    result = build()
    validate(result)
    print(f"wechat_epub={result} bytes={result.stat().st_size}")
