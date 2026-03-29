document.addEventListener("DOMContentLoaded", () => {
  loadHeaderFooter();
});

// ------------------------------------------------------
// Load header.html and footer.html from the SAME folder
// as the current grammar page
// ------------------------------------------------------
function loadHeaderFooter() {
  const header = document.getElementById("header");
  const footer = document.getElementById("footer");

  // Load header
  if (header) {
    fetch("./header.html")
      .then(response => {
        if (!response.ok) throw new Error("Header not found");
        return response.text();
      })
      .then(html => {
        header.innerHTML = html;
      })
      .catch(err => console.error("HEADER LOAD ERROR:", err));
  }

  // Load footer
  if (footer) {
    fetch("./footer.html")
      .then(response => {
        if (!response.ok) throw new Error("Footer not found");
        return response.text();
      })
      .then(html => {
        footer.innerHTML = html;
      })
      .catch(err => console.error("FOOTER LOAD ERROR:", err));
  }
}

// ------------------------------------------------------
// Google Analytics — injected here so every grammar
// lesson page automatically gets tracking, including
// any future lessons added to this folder.
// ------------------------------------------------------
(function injectGA() {
  if (window.__GA_INIT__) return;
  window.__GA_INIT__ = true;
  const s = document.createElement("script");
  s.src = "https://www.googletagmanager.com/gtag/js?id=G-DG828TL4V1";
  s.async = true;
  document.head.appendChild(s);
  window.dataLayer = window.dataLayer || [];
  function gtag() { dataLayer.push(arguments); }
  gtag("js", new Date());
  gtag("config", "G-DG828TL4V1");
})();
