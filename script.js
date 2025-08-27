// ------------------------------
// Header + Footer (root-relative)
// ------------------------------
function loadHeaderFooter() {
  const header = document.getElementById("header");
  const footer = document.getElementById("footer");

  if (header) {
    fetch("/header.html")
      .then(r => { if (!r.ok) throw new Error("header"); return r.text(); })
      .then(html => header.innerHTML = html)
      .catch(err => console.error("Error loading header:", err));
  }

  if (footer) {
    fetch("/footer.html")
      .then(r => { if (!r.ok) throw new Error("footer"); return r.text(); })
      .then(html => footer.innerHTML = html)
      .catch(err => console.error("Error loading footer:", err));
  }
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

      const h3 = document.createElement("h3");
      h3.textContent = cat.category;
      box.appendChild(h3);

      const grid = document.createElement("div");
      grid.className = "lesson-container";

      // If lessons.json still has old github.io links, normalize them to root paths
      const normalize = (url) => url.replace(/^https?:\/\/mandritsara\.github\.io\/bako\//, "/");

      cat.links.forEach(lesson => {
        const a = document.createElement("a");
        a.className = "lesson-card";
        a.style.textDecoration = "none";

        const h4 = document.createElement("h4");
        h4.textContent = lesson.title;

        const pdf  = normalize(lesson.url);
        const html = pdf.replace(/\.pdf$/i, ".html");

        // Prefer HTML if present, otherwise PDF
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
// Carousel captions (guarded)
// ------------------------------
function initCarouselCaptions() {
  const captions = [
    "My nephews and I on vacation in our home village.",
    "My sister and I pounding cassava leaves ('ravitoto') for lunch, with rice.",
    "Family dinner by candlelight, with visitors (not often) from Tana, in the village.",
    "Our lake, called \"Amparihibe,\" 1 km from the village—our water source. A lake for bathing, fishing, hunting birds, but also our source of drinking water.",
    "HVMM Laboratory Technician (2005–2010)",
    "In our home village, 'Amparihibe.'",
    "Our village—the bamboo behind our house, decades old, along with fruit trees and fields.",
    "My parents and the three youngest siblings (L to R). My father. My mother. My little sister, me, my brother.",
    "Return to our home village for the holidays—swimming in the nearby lake.",
    "Walking back from the Thursday market, about ten kilometers away.",
    "Our vegetable gardens near the lake, with different kinds of vegetables.",
    "Waiting for the taxi-brousse to return to the center of the island, hundreds of kilometers away.",
    "Rice harvest. Omby (Malagasy cows) trampling the rice.",
    "Harvest.",
    "Our rice fields. July–August."
  ];

  const carousel = document.getElementById("galleryCarousel");
  const captionEl = document.getElementById("carousel-caption-below");
  const items = document.querySelectorAll(".carousel-item");
  if (!carousel || !captionEl || !items.length) return;

  function update() {
    const i = Array.from(items).findIndex(x => x.classList.contains("active"));
    if (i !== -1) captionEl.innerHTML = `<p>${captions[i] || ""}</p>`;
  }
  update();
  carousel.addEventListener("slid.bs.carousel", update);
}

// ------------------------------
// Google Analytics (adblockers may block)
// ------------------------------
(function injectGATag() {
  const s = document.createElement("script");
  s.src = "https://www.googletagmanager.com/gtag/js?id=G-DG828TL4V1";
  s.async = true;
  document.head.appendChild(s);
  window.dataLayer = window.dataLayer || [];
  function gtag(){ dataLayer.push(arguments); }
  gtag('js', new Date());
  gtag('config', 'G-DG828TL4V1');
})();

// ------------------------------
// Init
// ------------------------------
document.addEventListener("DOMContentLoaded", () => {
  loadHeaderFooter();
  loadLessons();
  initCarouselCaptions();
});
