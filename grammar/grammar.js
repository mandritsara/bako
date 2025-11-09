// /grammar/grammar.js
// Works inside the /grammar/ subfolder of https://mandritsara.github.io/bako/

document.addEventListener("DOMContentLoaded", () => {
  loadHeaderFooter();
  loadLessonsIfPresent();
});

// ------------------------------
// Header + Footer from site root
// ------------------------------
function loadHeaderFooter() {
  const header = document.getElementById("header");
  const footer = document.getElementById("footer");

  // IMPORTANT: adjust BASE if this repo is hosted at /bako/
  const BASE = "/bako/";

  if (header) {
    fetch(BASE + "header.html")
      .then(r => { if (!r.ok) throw new Error("header"); return r.text(); })
      .then(html => { header.innerHTML = html; })
      .catch(err => console.error("Error loading header:", err));
  }

  if (footer) {
    fetch(BASE + "footer.html")
      .then(r => { if (!r.ok) throw new Error("footer"); return r.text(); })
      .then(html => { footer.innerHTML = html; })
      .catch(err => console.error("Error loading footer:", err));
  }
}

// ------------------------------
// Lessons list (only if needed)
// ------------------------------
function loadLessonsIfPresent() {
  const box = document.getElementById("lessons-container");
  if (!box) return; // No container → single lesson page, nothing to do

  const BASE = "/bako/";

  fetch(BASE + "lessons.json", { cache: "no-store" })
    .then(r => { if (!r.ok) throw new Error(`lessons.json ${r.status}`); return r.json(); })
    .then(data => {
      const cat = (data.lessons || []).find(c => c.category === "Grammar Lessons");
      if (!cat) return;

      const h3 = document.createElement("h3");
      h3.textContent = cat.category;
      box.appendChild(h3);

      const grid = document.createElement("div");
      grid.className = "lesson-container";

      // normalizer – makes URLs relative even if JSON contains full links
      const normalize = (url) => url.replace(/^https?:\/\/mandritsara\.github\.io\/bako\//, BASE);

      cat.links.forEach(item => {
        const a = document.createElement("a");
        a.className = "lesson-card";
        a.style.textDecoration = "none";

        const h4 = document.createElement("h4");
        h4.textContent = item.title;

        const pdf  = normalize(item.url);
        const html = pdf.replace(/\.pdf$/i, ".html");

        // prefer HTML if it exists
        fetch(html, { method: "HEAD" })
          .then(res => { a.href = res.ok ? html : pdf; })
          .catch(() => { a.href = pdf; });

        a.appendChild(h4);
        grid.appendChild(a);
      });

      box.appendChild(grid);
    })
    .catch(err => console.error("Error loading lessons:", err));
}

// ------------------------------
// Google Analytics (guarded)
// ------------------------------
(function () {
  if (window.__GA_INIT__) return;
  window.__GA_INIT__ = true;

  const s = document.createElement("script");
  s.src = "https://www.googletagmanager.com/gtag/js?id=G-DG828TL4V1";
  s.async = true;
  document.head.appendChild(s);

  window.dataLayer = window.dataLayer || [];
  function gtag(){ dataLayer.push(arguments); }
  gtag('js', new Date());
  gtag('config', 'G-DG828TL4V1');
})();
