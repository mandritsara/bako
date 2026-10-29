// ------------------------------
// Header + Footer (root-relative)
// ------------------------------
function loadHeaderFooter() {
  const header = document.getElementById("header");
  const footer = document.getElementById("footer");

  if (header) {
    fetch("/header.html")
      .then(r => { if (!r.ok) throw new Error("header"); return r.text(); })
      .then(html => { header.innerHTML = html; markActiveNav(header); })
      .catch(err => console.error("Error loading header:", err));
  }

  if (footer) {
    fetch("/footer.html")
      .then(r => { if (!r.ok) throw new Error("footer"); return r.text(); })
      .then(html => footer.innerHTML = html)
      .catch(err => console.error("Error loading footer:", err));
  }
}

// Highlight the nav link for the current page (header.html hardcodes Home)
function markActiveNav(header) {
  const clean = (p) => p.replace(/^\/bako(?=\/)/, "").replace(/index\.html$/, "");
  const here = clean(location.pathname);
  header.querySelectorAll(".topnav a").forEach(a => {
    a.classList.toggle("active", clean(new URL(a.href, location.href).pathname) === here);
  });
}

// ------------------------------
// Lessons (root-relative)
// ------------------------------
function loadLessons() {
  const path = location.pathname.toLowerCase();
  const category =
    path.includes("introduction") ? "Introductory Lessons" :
    path.includes("grammar")      ? "Grammar Lessons" :
    path.includes("theme")        ? "Thematic Lessons"   : null;

  if (!category) return;

  fetch("/lessons.json", { cache: "no-store" })
    .then(r => { if (!r.ok) throw new Error(r.status); return r.json(); })
    .then(data => {
      const box = document.getElementById("lessons-container");
      if (!box) return;

      const cat = (data.lessons || []).find(c => c.category === category);
      if (!cat) return;

      const grid = document.createElement("div");
      grid.className = "lesson-grid";

      // If lessons.json still has old github.io links, normalize them to root paths
      const normalize = (url) => url.replace(/^https?:\/\/mandritsara\.github\.io\/bako\//, "/");

      const el = (tag, cls, text) => {
        const e = document.createElement(tag);
        e.className = cls;
        e.textContent = text;
        return e;
      };

      cat.links.forEach(lesson => {
        // "Lesson 1a - GREETINGS + (Pronouns and Question Words)"
        //   → label "Lesson 1a", title "GREETINGS", extra "Pronouns and Question Words"
        const m = lesson.title.match(/^(Lesson\s+[\w-]+)\s*(?:-\s+)?(.*)$/);
        const label = m ? m[1] : "";
        const [title, extra] = (m ? m[2] : lesson.title).split(/\s+\+\s+/);

        const a = document.createElement("a");
        a.className = "lesson-tile";
        a.appendChild(el("span", "lesson-label", label));
        a.appendChild(el("span", "lesson-title", title));
        if (extra) a.appendChild(el("span", "lesson-extra", extra.replace(/^\((.*)\)$/, "$1")));

        const pdf  = normalize(lesson.url);
        const html = pdf.replace(/\.pdf$/i, ".html");
        a.href = pdf;

        // Prefer HTML if present, otherwise PDF
        fetch(html, { method: "HEAD" })
          .then(res => {
            if (res.ok) a.href = html;
            else a.appendChild(el("span", "lesson-pdf", "PDF"));
          })
          .catch(() => {});

        grid.appendChild(a);
      });

      box.appendChild(grid);
    })
    .catch(err => console.error("Error loading lessons:", err));
}

// ------------------------------
// Init
// ------------------------------
document.addEventListener("DOMContentLoaded", () => {
  loadHeaderFooter();
  loadLessons();
});
