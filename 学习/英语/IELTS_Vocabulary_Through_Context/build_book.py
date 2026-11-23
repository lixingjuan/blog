#!/usr/bin/env python3
"""Build the merged TXT and a self-contained EPUB 3 edition."""

from pathlib import Path
from html import escape
import csv
import re
import zipfile
import xml.etree.ElementTree as ET

ROOT = Path(__file__).resolve().parent
CHAPTERS = sorted((ROOT / "chapters").glob("[0-9][0-9]_*/article.txt"))
OUTPUT = ROOT / "output"
BOOK_TITLE = "Ten Worlds of IELTS Vocabulary"
SUBTITLE = "Master 3,000+ Essential Words Through Context"
CREATOR = "IELTS Vocabulary Through Context"
IDENTIFIER = "urn:uuid:4ce77741-fd67-4db0-9946-2a7e38c84370"


def chapter_title(text: str) -> str:
    lines = [line.strip() for line in text.splitlines() if line.strip()]
    return re.sub(r"\*\*", "", lines[1]).title()


def inline_markup(text: str) -> str:
    safe = escape(text, quote=False)
    return re.sub(r"\*\*(.+?)\*\*", r"<strong>\1</strong>", safe)


def chapter_xhtml(text: str, number: int, title: str) -> str:
    blocks = []
    paragraphs = [p.strip() for p in re.split(r"\n\s*\n", text) if p.strip()]
    for index, para in enumerate(paragraphs):
        lines = para.splitlines()
        if index == 0 and re.fullmatch(r"CHAPTER\s+\d+", para):
            blocks.append(f'<p class="chapter-number">{inline_markup(para)}</p>')
            continue
        elif index == 1:
            blocks.append(f'<h1>{inline_markup(para)}</h1>')
            continue
        if len(lines) == 1 and re.match(r"^\d+\.\s+", para):
            blocks.append(f"<h2>{inline_markup(para)}</h2>")
        elif para in {"GLOSSARY", "REVIEW PROMPTS", "VOCABULARY PRACTICE"}:
            blocks.append(f"<h2>{escape(para)}</h2>")
        elif all(re.match(r"^\*\*.+?\*\* — ", line) for line in lines):
            blocks.extend(f'<p class="glossary">{inline_markup(line)}</p>' for line in lines)
        else:
            blocks.extend(f"<p>{inline_markup(line)}</p>" for line in lines)
    content = "\n".join(blocks)
    return f'''<?xml version="1.0" encoding="utf-8"?>
<!DOCTYPE html>
<html xmlns="http://www.w3.org/1999/xhtml" xml:lang="en" lang="en">
<head><meta charset="utf-8"/><title>{escape(title)}</title><link rel="stylesheet" type="text/css" href="styles.css"/></head>
<body><section epub:type="chapter" xmlns:epub="http://www.idpf.org/2007/ops" id="chapter-{number:02d}">{content}</section></body>
</html>'''


def build_txt(texts: list[str], titles: list[str]) -> Path:
    toc = "\n".join(f"{i:02d}. {title}" for i, title in enumerate(titles, 1))
    front = f"{BOOK_TITLE.upper()}\n{SUBTITLE}\n\nCONTENTS\n\n{toc}"
    merged = front + "\n\n" + ("\n\n" + "=" * 72 + "\n\n").join(t.rstrip() for t in texts) + "\n"
    target = OUTPUT / "complete_book.txt"
    target.write_text(merged)
    return target


def build_epub(texts: list[str], titles: list[str]) -> Path:
    target = OUTPUT / "ten_worlds_of_ielts_vocabulary.epub"
    container = '''<?xml version="1.0" encoding="UTF-8"?>
<container version="1.0" xmlns="urn:oasis:names:tc:opendocument:xmlns:container">
  <rootfiles><rootfile full-path="EPUB/content.opf" media-type="application/oebps-package+xml"/></rootfiles>
</container>'''
    css = '''body { font-family: serif; line-height: 1.55; margin: 5%; }
h1 { font-size: 1.8em; text-align: center; margin: 0.5em 0 1.5em; }
h2 { font-size: 1.3em; margin-top: 1.6em; page-break-after: avoid; }
p { margin: 0 0 0.8em; text-align: justify; }
strong { font-weight: 700; }
.chapter-number { text-align: center; font-size: 0.85em; letter-spacing: 0.12em; }
.glossary { margin-bottom: 0.35em; text-align: left; }
nav ol { line-height: 1.8; }
'''
    nav_items = "\n".join(
        f'<li><a href="chapter-{i:02d}.xhtml">{escape(title)}</a></li>'
        for i, title in enumerate(titles, 1)
    )
    nav = f'''<?xml version="1.0" encoding="utf-8"?>
<!DOCTYPE html>
<html xmlns="http://www.w3.org/1999/xhtml" xmlns:epub="http://www.idpf.org/2007/ops" xml:lang="en">
<head><meta charset="utf-8"/><title>Contents</title><link rel="stylesheet" type="text/css" href="styles.css"/></head>
<body><nav epub:type="toc" id="toc"><h1>Contents</h1><ol>{nav_items}</ol></nav></body>
</html>'''
    manifest = ['<item id="nav" href="nav.xhtml" media-type="application/xhtml+xml" properties="nav"/>',
                '<item id="css" href="styles.css" media-type="text/css"/>']
    spine = []
    for i in range(1, len(texts) + 1):
        manifest.append(f'<item id="c{i}" href="chapter-{i:02d}.xhtml" media-type="application/xhtml+xml"/>')
        spine.append(f'<itemref idref="c{i}"/>')
    opf = f'''<?xml version="1.0" encoding="utf-8"?>
<package xmlns="http://www.idpf.org/2007/opf" version="3.0" unique-identifier="book-id" xml:lang="en">
<metadata xmlns:dc="http://purl.org/dc/elements/1.1/">
<dc:identifier id="book-id">{IDENTIFIER}</dc:identifier><dc:title>{BOOK_TITLE}</dc:title>
<dc:creator>{CREATOR}</dc:creator><dc:language>en</dc:language>
<meta property="dcterms:modified">2026-10-12T00:00:00Z</meta>
</metadata><manifest>{''.join(manifest)}</manifest><spine>{''.join(spine)}</spine></package>'''

    with zipfile.ZipFile(target, "w") as book:
        book.writestr("mimetype", "application/epub+zip", compress_type=zipfile.ZIP_STORED)
        book.writestr("META-INF/container.xml", container)
        book.writestr("EPUB/styles.css", css)
        book.writestr("EPUB/nav.xhtml", nav)
        book.writestr("EPUB/content.opf", opf)
        for i, (text, title) in enumerate(zip(texts, titles), 1):
            book.writestr(f"EPUB/chapter-{i:02d}.xhtml", chapter_xhtml(text, i, title))
    return target


def validate_epub(path: Path, expected_chapters: int) -> None:
    with zipfile.ZipFile(path) as book:
        names = book.namelist()
        assert names[0] == "mimetype"
        assert book.read("mimetype") == b"application/epub+zip"
        assert len([n for n in names if re.fullmatch(r"EPUB/chapter-\d\d\.xhtml", n)]) == expected_chapters
        for name in names:
            if name.endswith((".xml", ".opf", ".xhtml")):
                ET.fromstring(book.read(name))


def count_distinct_items() -> int:
    with (ROOT / "vocabulary_master_list.csv").open() as handle:
        return len({row["item"].casefold() for row in csv.DictReader(handle)})


def main() -> None:
    if len(CHAPTERS) != 10:
        raise SystemExit(f"Expected 10 chapters; found {len(CHAPTERS)}")
    OUTPUT.mkdir(exist_ok=True)
    texts = [path.read_text() for path in CHAPTERS]
    titles = [chapter_title(text) for text in texts]
    txt_path = build_txt(texts, titles)
    epub_path = build_epub(texts, titles)
    validate_epub(epub_path, len(texts))
    print(f"chapters={len(texts)} distinct_items={count_distinct_items()}")
    print(f"txt={txt_path} bytes={txt_path.stat().st_size}")
    print(f"epub={epub_path} bytes={epub_path.stat().st_size}")


if __name__ == "__main__":
    main()
