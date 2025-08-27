// ------------------------------
// Constants
// ------------------------------
const IS_GH = location.hostname.endsWith('github.io');
const BASE  = IS_GH ? '/bako/' : '/';
const ABS   = `${location.origin}${BASE}`;   // absolute base, avoids relative-path 404s

// ------------------------------
// Header + Footer loader
// ------------------------------
function loadHeaderFooter() {
  const headerContainer = document.getElementById("header");
  const footerContainer = document.getElementById("footer");

  const headerPath = `${ABS}header.html`;
  const footerPath = `${ABS}footer.html`;

  if (headerContainer) {
    fetch(headerPath)
      .then(r => { if (!r.ok) throw new Error(`Failed to load ${headerPath}`); return r.text(); })
      .then(html => { headerContainer.innerHTML = html; })
      .catch(err => console.error("Error loading header:", err));
  }

  if (footerContainer) {
    fetch(footerPath)
      .then(r => { if (!r.ok) throw new Error(`Failed to load ${footerPath}`); return r.text(); })
      .then(html => { footerContainer.innerHTML = html; })
      .catch(err => console.error("Error loading footer:", err));
  }
}

// ------------------------------
// Lessons loader
// ------------------------------
function loadLessons() {
  function getPageCategory() {
    const path = window.location.pathname.toLowerCase();
    if (path.includes("introduction")) return "Introductory Lessons";
    if (path.includes("grammar"))      return "Grammar Lessons";
    if (path.includes("theme"))        return "Thematic Lessons";
    return null;
  }

  const categoryToLoad = getPageCategory();
  if (!categoryToLoad) return;

  const jsonUrl = `${ABS}lessons.json`;
  console.log("Fetching lessons JSON:", jsonUrl);

  fetch(jsonUrl)
    .then(res => {
      if (!res.ok) throw new Error(`Failed to load lessons.json (${res.status})`);
      return res.json();
    })
    .then(data => {
      const lessonsContainer = document.getElementById("lessons-container");
      if (!lessonsContainer) return;

      const category = (data.lessons || []).find(cat => cat.category === categoryToLoad);
      if (!category) return;

      // Title
      const categoryTitle = document.createElement("h3");
      categoryTitle.textContent = category.category;
      lessonsContainer.appendChild(categoryTitle);

      // Grid container
      const lessonGrid = document.createElement("div");
      lessonGrid.className = "lesson-container";

      // Convert hard-coded GitHub URLs to site-relative when on bako.blog
      const normalize = (url) => {
        if (IS_GH) return url; // keep as-is on github.io
        return url.replace(/^https?:\/\/mandritsara\.github\.io\/bako\//, '/');
      };

      // Cards
      category.links.forEach(lesson => {
        const lessonCard = document.createElement("a");
        lessonCard.className = "lesson-card";
        lessonCard.style.textDecoration = "none";

        const lessonTitle = document.createElement("h4");
        lessonTitle.textContent = lesson.title;

        const pdfUrl  = normalize(lesson.url);
        const htmlUrl = pdfUrl.replace(/\.pdf$/i, ".html");

        // Prefer HTML if it exists, else fall back to PDF
        fetch(htmlUrl, { method: "HEAD" })
          .then(r => { lessonCard.href = r.ok ? htmlUrl : pdfUrl; })
          .catch(() => { lessonCard.href = pdfUrl; });

        lessonCard.appendChild(lessonTitle);
        lessonGrid.appendChild(lessonCard);
      });

      lessonsContainer.appendChild(lessonGrid);
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
  const captionContainer = document.getElementById("carousel-caption-below");
  const carouselItems = document.querySelectorAll(".carousel-item");

  if (!carousel || !captionContainer || !carouselItems.length) return;

  function updateCaption() {
    const activeIndex = Array.from(carouselItems).findIndex(item => item.classList.contains("active"));
    if (activeIndex !== -1) captionContainer.innerHTML = `<p>${captions[activeIndex] || ""}</p>`;
  }

  updateCaption();
  carousel.addEventListener("slid.bs.carousel", updateCaption);
}

// ------------------------------
// Google Analytics injection
// ------------------------------
(function injectGATag() {
  const ga = document.createElement("script");
  ga.src = "https://www.googletagmanager.com/gtag/js?id=G-DG828TL4V1";
  ga.async = true;
  document.head.appendChild(ga);

  window.dataLayer = window.dataLayer || [];
  function gtag(){ dataLayer.push(arguments); }
  gtag('js', new Date());
  gtag('config', 'G-DG828TL4V1');
})();

// ------------------------------
// Init on DOM ready
// ------------------------------
document.addEventListener("DOMContentLoaded", function () {
  loadHeaderFooter();
  loadLessons();
  initCarouselCaptions();
});
