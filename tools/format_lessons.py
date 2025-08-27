#!/usr/bin/env python3
import re, sys, pathlib
from bs4 import BeautifulSoup

ROOT = pathlib.Path(__file__).resolve().parents[1] if (pathlib.Path(__file__).parent.name == "tools") else pathlib.Path(".")
FOLDERS = ["introduction", "grammar", "theme"]
SUBFOLDER_SCRIPT = {
    "introduction": "introduction.js",
    "grammar": "grammar.js",
    "theme": "theme.js",
}

def normalize_url(u: str) -> str:
    if not u: return u
    # github->root
    u = re.sub(r"^https?://mandritsara\.github\.io/bako/", "/", u)
    # /bako/... -> /...
    u = re.sub(r"^/bako/", "/", u)
    # ensure leading slash for site assets where appropriate
    if re.match(r"^(styles\.css|audio/|images/|introduction/|grammar/|theme/)", u):
        u = "/" + u
    return u

def ensure_header_footer(soup: BeautifulSoup):
    body = soup.body
    if not body: return
    # Header at very top
    if not soup.select_one("#header"):
        body.insert(0, soup.new_tag("div", id="header"))
    # Footer at very end (direct child of body)
    footer = soup.select_one("#footer")
    if not footer:
        footer = soup.new_tag("div", id="footer")
        body.append(footer)
    else:
        # move footer to be last child of body
        footer.extract()
        body.append(footer)

def ensure_stylesheet(soup: BeautifulSoup):
    for link in soup.find_all("link", rel=lambda v: v and "stylesheet" in v):
        href = link.get("href", "")
        if "styles.css" in href:
            link["href"] = "/styles.css"
    # if no stylesheet present, inject one
    if not any("styles.css" in (l.get("href") or "") for l in soup.find_all("link")):
        link = soup.new_tag("link", rel="stylesheet", href="/styles.css")
        soup.head.append(link)

def touch_media_and_links(soup: BeautifulSoup):
    # <source src>, <img src>, <a href> (PDF/images)
    for tag, attr in [("source","src"), ("img","src"), ("a","href"), ("script","src")]:
        for el in soup.find_all(tag):
            url = el.get(attr)
            if not url: continue
            new = normalize_url(url)
            if new != url:
                el[attr] = new

def ensure_subfolder_script(soup: BeautifulSoup, folder: str):
    # add/update <script src="{folder}.js?v=..."> at end of body, defer
    body = soup.body
    if not body: return
    target = SUBFOLDER_SCRIPT.get(folder)
    if not target: return
    found = None
    for s in soup.find_all("script"):
        src = s.get("src","")
        if src.endswith(target) or src.startswith(target):
            found = s
            break
    version_qs = f"{target}?v=2"
    if found:
        found["src"] = version_qs if "?" not in found.get("src","") else re.sub(r"\?.*$","?v=2", found["src"])
        found["defer"] = "defer"
    else:
        s = soup.new_tag("script", src=version_qs, defer=True)
        body.append(s)

def process_file(html_path: pathlib.Path):
    orig = html_path.read_text(encoding="utf-8", errors="ignore")
    soup = BeautifulSoup(orig, "html.parser")

    # fix title mismatch (optional no-op)
    # ensure global header/footer placeholders
    ensure_header_footer(soup)
    # normalize stylesheet path
    ensure_stylesheet(soup)
    # normalize all asset links
    touch_media_and_links(soup)
    # ensure subfolder script tag
    folder = html_path.parent.name
    if folder in FOLDERS:
        ensure_subfolder_script(soup, folder)

    out = soup.prettify(formatter="html")
    if out != orig:
        html_path.write_text(out, encoding="utf-8")
        print(f"✔ Updated: {html_path}")
        return True
    return False

def main():
    try:
        from bs4 import __version__  # ensure bs4 installed
    except Exception:
        print("Please install BeautifulSoup first:  pip install beautifulsoup4", file=sys.stderr); sys.exit(1)

    changed = 0
    for folder in FOLDERS:
        for html in (ROOT / folder).rglob("*.html"):
            changed += 1 if process_file(html) else 0
    print(f"\nDone. Files changed: {changed}")

if __name__ == "__main__":
    main()

