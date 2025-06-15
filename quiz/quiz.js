document.addEventListener("DOMContentLoaded", function () {
  function loadHeaderFooter() {
    const header = document.getElementById("header");
    const footer = document.getElementById("footer");

    const depth = window.location.pathname.includes("/quizzes/") ? "../" : ""; // adjust depth

    if (header) {
      fetch(`${depth}header.html`)
        .then(res => res.ok ? res.text() : Promise.reject("Header load failed"))
        .then(html => header.innerHTML = html)
        .catch(err => console.error(err));
    }

    if (footer) {
      fetch(`${depth}footer.html`)
        .then(res => res.ok ? res.text() : Promise.reject("Footer load failed"))
        .then(html => footer.innerHTML = html)
        .catch(err => console.error(err));
    }
  }

  loadHeaderFooter();
});
