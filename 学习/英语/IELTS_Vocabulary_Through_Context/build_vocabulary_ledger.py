from pathlib import Path
import csv
import re

ROOT = Path(__file__).parent
CHAPTER_PATTERN = re.compile(r"^(\d{2})_(.+)$")
WORD_PATTERN = re.compile(r"[A-Za-z]+(?:['’-][A-Za-z]+)*")
BOLD_PATTERN = re.compile(r"\*\*(.+?)\*\*")
GLOSSARY_PATTERN = re.compile(r"^\*\*(.+?)\*\* — (.+)$", re.MULTILINE)

rows = []
reports = []

for path in sorted((ROOT / "chapters").glob("[0-9][0-9]_*/article.txt")):
    match = CHAPTER_PATTERN.match(path.parent.name)
    if not match:
        continue
    chapter = match.group(1)
    theme = match.group(2).replace("_", " ").title()
    text = path.read_text()
    body = text.split("\nGLOSSARY\n", 1)[0]
    body_targets = {item.lower(): item for item in BOLD_PATTERN.findall(body)}
    glossary = {term.lower(): (term, definition) for term, definition in GLOSSARY_PATTERN.findall(text)}
    missing_definitions = sorted(set(body_targets) - set(glossary))
    unused_definitions = sorted(set(glossary) - set(body_targets))

    reports.append(
        {
            "chapter": chapter,
            "file": str(path.relative_to(ROOT)),
            "body_words": len(WORD_PATTERN.findall(body)),
            "target_items": len(body_targets),
            "glossary_entries": len(glossary),
            "missing_definitions": "; ".join(missing_definitions),
            "unused_definitions": "; ".join(unused_definitions),
        }
    )

    for key, (term, definition) in sorted(glossary.items()):
        rows.append(
            {
                "item": term,
                "word_family": term,
                "chapter": chapter,
                "theme": theme,
                "definition": definition,
                "appears_in_body": "yes" if key in body_targets else "no",
            }
        )

    chapter_rows = [row for row in rows if row["chapter"] == chapter]
    with (path.parent / "vocabulary.csv").open("w", newline="") as handle:
        writer = csv.DictWriter(
            handle,
            fieldnames=["item", "word_family", "chapter", "theme", "definition", "appears_in_body"],
        )
        writer.writeheader()
        writer.writerows(chapter_rows)

    with (path.parent / "validation.txt").open("w") as handle:
        report = reports[-1]
        handle.write(f"CHAPTER {report['chapter']} VALIDATION\n\n")
        handle.write(f"File: {report['file']}\n")
        handle.write(f"Body word count: {report['body_words']}\n")
        handle.write(f"Unique highlighted target items: {report['target_items']}\n")
        handle.write(f"Glossary entries: {report['glossary_entries']}\n")
        handle.write(f"Highlighted items without definitions: {report['missing_definitions'] or 'none'}\n")
        handle.write(f"Definitions without highlighted body items: {report['unused_definitions'] or 'none'}\n")

with (ROOT / "vocabulary_master_list.csv").open("w", newline="") as handle:
    writer = csv.DictWriter(
        handle,
        fieldnames=["item", "word_family", "chapter", "theme", "definition", "appears_in_body"],
    )
    writer.writeheader()
    writer.writerows(rows)

with (ROOT / "validation_report.txt").open("w") as handle:
    handle.write("VOCABULARY BOOK VALIDATION REPORT\n\n")
    for report in reports:
        handle.write(f"Chapter {report['chapter']}: {report['file']}\n")
        handle.write(f"Body word count: {report['body_words']}\n")
        handle.write(f"Unique highlighted target items: {report['target_items']}\n")
        handle.write(f"Glossary entries: {report['glossary_entries']}\n")
        handle.write(f"Highlighted items without definitions: {report['missing_definitions'] or 'none'}\n")
        handle.write(f"Definitions without highlighted body items: {report['unused_definitions'] or 'none'}\n\n")

print(f"chapters={len(reports)} ledger_rows={len(rows)}")
for report in reports:
    print(
        f"chapter={report['chapter']} body_words={report['body_words']} "
        f"targets={report['target_items']} glossary={report['glossary_entries']} "
        f"missing={report['missing_definitions'] or 'none'} unused={report['unused_definitions'] or 'none'}"
    )
