document.addEventListener("DOMContentLoaded", function () {
    // Load header and footer dynamically
    function loadHeaderFooter() {
        let headerContainer = document.getElementById("header");
        let footerContainer = document.getElementById("footer");

        if (headerContainer) {
            fetch("header.html")
                .then(response => response.text())
                .then(data => headerContainer.innerHTML = data)
                .catch(error => console.error("Error loading header:", error));
        } else {
            console.warn("No header container found!");
        }

        if (footerContainer) {
            fetch("footer.html")
                .then(response => response.text())
                .then(data => footerContainer.innerHTML = data)
                .catch(error => console.error("Error loading footer:", error));
        } else {
            console.warn("No footer container found!");
        }
    }

    loadHeaderFooter(); // Ensure header & footer load on all pages

    // Load lesson data
    fetch("lessons.json")
        .then(response => response.json())
        .then(data => {
            const lessonsContainer = document.getElementById("lessons-container");
            if (!lessonsContainer) {
                console.error("Error: lessons-container not found!");
                return;
            }

            data.lessons.forEach(category => {
                let categoryTitle = document.createElement("h3");
                categoryTitle.textContent = category.category;
                lessonsContainer.appendChild(categoryTitle);

                category.links.forEach(lesson => {
                    let lessonCard = document.createElement("a"); // Entire card is a clickable link
                    lessonCard.className = "lesson-card";
                    lessonCard.style.display = "block"; // Makes it behave like a block-level button
                    lessonCard.style.textDecoration = "none"; // Remove default link styles

                    let lessonTitle = document.createElement("h4");
                    lessonTitle.textContent = lesson.title;
                    lessonTitle.style.color = "#3a6f6a"; // Matches your current styles

                    let htmlUrl = lesson.url.replace(".pdf", ".html");

                    // Check if HTML exists first
                    fetch(htmlUrl, { method: "HEAD" })
                        .then(response => {
                            if (response.ok) {
                                lessonCard.href = htmlUrl; // Use HTML if available
                            } else {
                                console.warn(`HTML version not available for: ${lesson.title}`);
                                lessonCard.href = lesson.url; // Fall back to PDF
                            }
                        })
                        .catch(() => {
                            console.warn(`HTML version not found for: ${lesson.title}`);
                            lessonCard.href = lesson.url; // Fall back to PDF
                        });

                    lessonCard.appendChild(lessonTitle);
                    lessonsContainer.appendChild(lessonCard);
                });
            });
        })
        .catch(error => console.error("Error loading lessons:", error));
});
