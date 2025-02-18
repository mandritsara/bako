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
