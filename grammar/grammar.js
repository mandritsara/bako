function loadHeaderFooter() {
  const header = document.getElementById("header");
  const footer = document.getElementById("footer");

  if (header) {
    fetch("header.html")
      .then(r => r.text())
      .then(html => header.innerHTML = html)
      .catch(console.error);
  }

  if (footer) {
    fetch("footer.html")
      .then(r => r.text())
      .then(html => footer.innerHTML = html)
      .catch(console.error);
  }
}
