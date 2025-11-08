// Subfolder script (works in /introduction/, /grammar/, /theme/)

document.addEventListener("DOMContentLoaded", () => {
  loadHeaderFooter();
  loadLessonsIfPresent(); // runs only if a #lessons-container exists
});

// ------------------------------
// Header + Footer from site root
// ------------------------------
function loadHeaderFooter() {
  const header = document.getElementById("header");
  const footer = document.getElementById("footer");

  if (header) {
    fetch("/header.html")
      .then(r => { if (!r.ok) throw new Error("header"); return r.text(); })
      .then(html => { header.innerHTML = html; })
      .catch(err => console.error("Error loading header:", err));
  }

  if (footer) {
    fetch("/footer.html")
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
  if (!box) return; // This is a single-lesson page, nothing to do

  // Work out which category this subfolder is
  const path = location.pathname.toLowerCase();
  let category = null;
  if (path.includes("/introduction/")) category = "Introductory Lessons";
  else if (path.includes("/grammar/")) category = "Grammar Lessons";
  else if (path.includes("/theme/")) category = "Thematic Lessons";
  if (!category) return;

  fetch("/lessons.json", { cache: "no-store" })
    .then(r => { if (!r.ok) throw new Error(`lessons.json ${r.status}`); return r.json(); })
    .then(data => {
      const cat = (data.lessons || []).find(c => c.category === category);
      if (!cat) return;

      const h3 = document.createElement("h3");
      h3.textContent = cat.category;
      box.appendChild(h3);

      const grid = document.createElement("div");
      grid.className = "lesson-container";

      // JSON is root-relative; this normalizer is a safety net if any old links slipped through
      const normalize = (url) => url.replace(/^https?:\/\/mandritsara\.github\.io\/bako\//, "/");

      cat.links.forEach(item => {
        const a = document.createElement("a");
        a.className = "lesson-card";
        a.style.textDecoration = "none";

        const h4 = document.createElement("h4");
        h4.textContent = item.title;

        const pdf  = normalize(item.url);
        const html = pdf.replace(/\.pdf$/i, ".html");

        // Prefer HTML if available
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
