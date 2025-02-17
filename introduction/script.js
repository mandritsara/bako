document.addEventListener("DOMContentLoaded", function () {
    function loadHeaderFooter() {
        const headerContainer = document.getElementById("header");
        const footerContainer = document.getElementById("footer");

        // Relative paths to go UP one directory
        const headerPath = "header.html"; 
        const footerPath = "footer.html"; 

        //... (rest of the fetch logic for header and footer remains the same)
    }

    //... (rest of your script.js, including loadLessons() if needed)

    loadHeaderFooter();
    //... other functions
});
