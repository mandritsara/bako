#!/usr/bin/env python3
import re, sys, pathlib
from bs4 import BeautifulSoup

ROOT = pathlib.Path(__file__).resolve().parents[1]
INTRO_DIR = ROOT / "introduction"
SUBFOLDER_SCRIPT = "introduction.js"   # subfolder JS you use

def normalize_url(u: str) -> str:
    if not u: return u
    u = re.sub(r"^https?://mandritsara\.github\.io/bako/", "/", u)  # GitHub → root
    u = re.sub(r"^/bako/", "/", u)                                  # /bako → /
    if re.match(r"^(styles\.css|audio/|images/|introduction/|grammar/|theme/)", u):
        u = "/" + u if not u.startswith("/") else u
    return u

def ensure_header_footer(soup: BeautifulSoup):
    body = soup.body
    if not body: return
    if not soup.select_one("#header"):
        body.insert(0, soup.new_tag("div", id="header"))
    footer = soup.select_one("#footer")
    if footer:
        footer.extract()
        body.append(footer)
    else:
        body.append(soup.new_tag("div", id="footer"))

def ensure_stylesheet(soup: BeautifulSoup):
    head = soup.head or soup.new_tag("head")
    if not soup.head:
        # Make sure <html> exists
        html_tag = soup.find("html")
        if not html_tag:
            html_tag = soup.new_tag("html")
            soup.insert(0, html_tag)
        html_tag.insert(0, head)
    had_css = False
    for link in head.find_all("link"):
        href = (link.get("href") or "")
        if "styles.css" in href:
            link["href"] = "/styles.css"
            had_css = True
    if not had_css:
        link = soup.new_tag("link", rel="stylesheet", href="/styles.css")
        bs = head.find("link", href=re.compile(r"bootstrap", re.I))
        (bs.insert_after if bs else head.append)(link)

def rewrite_assets(soup: BeautifulSoup):
    for tag, attr in [("source","src"), ("img","src"), ("a","href"), ("script","src")]:
        for el in soup.find_all(tag):
            url = el.get(attr)
            if not url: continue
            new = normalize_url(url)
            if new != url:
                el[attr] = new

def ensure_subfolder_script(soup: BeautifulSoup):
    body = soup.body
    if not body: return
    found = None
    for s in soup.find_all("script"):
        src = (s.get("src") or "")
        if src.endswith(SUBFOLDER_SCRIPT) or src.startswith(SUBFOLDER_SCRIPT):
            found = s; break
    target = f"{SUBFOLDER_SCRIPT}?v=2"
    if found:
        found["src"] = re.sub(r"\?.*$", "", found.get("src","")) + "?v=2"
        found["defer"] = "defer"
    else:
        body.append(soup.new_tag("script", src=target, defer=True))

def process_file(p: pathlib.Path) -> bool:
    orig = p.read_text(encoding="utf-8", errors="ignore")
    soup = BeautifulSoup(orig, "html.parser")
    ensure_header_footer(soup)
    ensure_stylesheet(soup)
    rewrite_assets(soup)
    ensure_subfolder_script(soup)
    out = soup.prettify(formatter="html")
    if out != orig:
        p.write_text(out, encoding="utf-8")
        print(f"✔ Updated: {p.relative_to(ROOT)}")
        return True
    return False

def main():
    if not INTRO_DIR.exists():
        print("No /introduction directory found.", file=sys.stderr); sys.exit(1)
    try:
        from bs4 import __version__  # noqa
    except Exception:
        print("Please install BeautifulSoup first:  pip install beautifulsoup4", file=sys.stderr); sys.exit(1)
    changed = 0
    for html in INTRO_DIR.rglob("*.html"):
        changed += 1 if process_file(html) else 0
    print(f"\nDone. Files changed: {changed}")

if __name__ == "__main__":
    main()
