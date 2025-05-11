document.addEventListener("DOMContentLoaded", function () {
    function loadHeaderFooter() {
        const headerContainer = document.getElementById("header");
        const footerContainer = document.getElementById("footer");

        // ✅ Fetch from the same `/bako/introduction/` folder
        const headerPath = "header.html";  
        const footerPath = "footer.html";  

        console.log(`Fetching Header from: ${headerPath}`);
        console.log(`Fetching Footer from: ${footerPath}`);

        if (headerContainer) {
            fetch(headerPath)
                .then(response => {
                    if (!response.ok) throw new Error(`Failed to load ${headerPath}`);
                    return response.text();
                })
                .then(data => {
                    console.log("Header loaded successfully!");
                    headerContainer.innerHTML = data;
                })
                .catch(error => console.error("Error loading header:", error));
        }

     

        if (footerContainer) {
            fetch(footerPath)
                .then(response => {
                    if (!response.ok) throw new Error(`Failed to load ${footerPath}`);
                    return response.text();
                })
                .then(data => {
                    console.log("Footer loaded successfully!");
                    footerContainer.innerHTML = data;
                })
                .catch(error => console.error("Error loading footer:", error));
        }
    }

    loadHeaderFooter();
});

// Dynamically inject Google Analytics tag globally
(function () {
  const ga = document.createElement("script");
  ga.src = "https://www.googletagmanager.com/gtag/js?id=G-DG828TL4V1";
  ga.async = true;
  document.head.appendChild(ga);

  window.dataLayer = window.dataLayer || [];
  function gtag() { dataLayer.push(arguments); }
  gtag('js', new Date());
  gtag('config', 'G-DG828TL4V1');
})();

