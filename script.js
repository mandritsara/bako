document.addEventListener("DOMContentLoaded", function () {
    function loadHeaderFooter() {
        let headerContainer = document.getElementById("header");
        let footerContainer = document.getElementById("footer");

        // ✅ Automatically detect how deep the page is
        let depth = window.location.pathname.split("/").length - 2;
        let basePath = depth === 0 ? "./" : "../".repeat(depth);

        console.log("Current path:", window.location.pathname);
        console.log("Base path detected:", basePath);

        if (headerContainer) {
            let headerPath = basePath + "header.html";
            console.log("Fetching header from:", headerPath);
            fetch(headerPath)
                .then(response => {
                    if (!response.ok) throw new Error(`Failed to load ${headerPath}`);
                    return response.text();
                })
                .then(data => headerContainer.innerHTML = data)
                .catch(error => console.error("Error loading header:", error));
        }

        if (footerContainer) {
            let footerPath = basePath + "footer.html";
            console.log("Fetching footer from:", footerPath);
            fetch(footerPath)
                .then(response => {
                    if (!response.ok) throw new Error(`Failed to load ${footerPath}`);
                    return response.text();
                })
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
