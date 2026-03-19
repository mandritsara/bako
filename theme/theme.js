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
