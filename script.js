document.addEventListener("DOMContentLoaded", function () {
    function loadHeaderFooter() {
        let headerContainer = document.getElementById("header");
        let footerContainer = document.getElementById("footer");

        // ✅ Dynamically detect how deep the page is in the directory structure
        let depth = window.location.pathname.split("/").length - 2;
        let basePath = depth === 0 ? "./" : "../".repeat(depth);

        if (headerContainer) {
            fetch(basePath + "header.html")
                .then(response => response.text())
                .then(data => headerContainer.innerHTML = data)
                .catch(error => console.error("Error loading header:", error));
        }

        if (footerContainer) {
            fetch(basePath + "footer.html")
                .then(response => response.text())
                .then(data => footerContainer.innerHTML = data)
                .catch(error => console.error("Error loading footer:", error));
        }
    }

    loadHeaderFooter();
});

    function getPageCategory() {
        let path = window.location.pathname;
        if (path.includes("introduction")) return "Introductory Lessons";
        if (path.includes("grammar")) return "Grammar Lessons";
        if (path.includes("theme")) return "Thematic Lessons";
        return null;
    }

    let categoryToLoad = getPageCategory();

    if (categoryToLoad) {
        fetch("lessons.json")
            .then(response => response.json())
            .then(data => {
                const lessonsContainer = document.getElementById("lessons-container");
                if (!lessonsContainer) return;

                let category = data.lessons.find(cat => cat.category === categoryToLoad);
                if (!category) return;

                // ✅ Create a wrapper for the grid layout
                let lessonGrid = document.createElement("div");
                lessonGrid.className = "lesson-container";

                // ✅ Add category title
                let categoryTitle = document.createElement("h3");
                categoryTitle.textContent = category.category;
                lessonsContainer.appendChild(categoryTitle);

                category.links.forEach(lesson => {
                    let lessonCard = document.createElement("a");
                    lessonCard.className = "lesson-card";
                    lessonCard.style.textDecoration = "none";

                    let lessonTitle = document.createElement("h4");
                    lessonTitle.textContent = lesson.title;

                    let htmlUrl = lesson.url.replace(".pdf", ".html");

                    // ✅ Dynamically assign correct URL
                    fetch(htmlUrl, { method: "HEAD" })
                        .then(response => {
                            lessonCard.href = response.ok ? htmlUrl : lesson.url;
                        })
                        .catch(() => {
                            lessonCard.href = lesson.url;
                        });

                    lessonCard.appendChild(lessonTitle);
                    lessonGrid.appendChild(lessonCard); // ✅ Append to grid
                });

                lessonsContainer.appendChild(lessonGrid); // ✅ Append grid to page
            })
            .catch(error => console.error("Error loading lessons:", error));
    }
});
