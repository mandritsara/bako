document.addEventListener("DOMContentLoaded", function () {
    function loadHeaderFooter() {
        let headerContainer = document.getElementById("header");
        let footerContainer = document.getElementById("footer");

        if (headerContainer) {
            fetch("header.html")
                .then(response => response.text())
                .then(data => headerContainer.innerHTML = data)
                .catch(error => console.error("Error loading header:", error));
        }

        if (footerContainer) {
            fetch("footer.html")
                .then(response => response.text())
                .then(data => footerContainer.innerHTML = data)
                .catch(error => console.error("Error loading footer:", error));
        }
    }

    loadHeaderFooter();

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

                let categoryTitle = document.createElement("h3");
                categoryTitle.textContent = category.category;
                lessonsContainer.appendChild(categoryTitle);

                category.links.forEach(lesson => {
                    let lessonCard = document.createElement("a");
                    lessonCard.className = "lesson-card";
                    lessonCard.style.display = "block";
                    lessonCard.style.textDecoration = "none";

                    let lessonTitle = document.createElement("h4");
                    lessonTitle.textContent = lesson.title;
                    lessonTitle.style.color = "#3a6f6a";

                    let htmlUrl = lesson.url.replace(".pdf", ".html");

                    fetch(htmlUrl, { method: "HEAD" })
                        .then(response => {
                            if (response.ok) {
                                lessonCard.href = htmlUrl;
                            } else {
                                lessonCard.href = lesson.url;
                            }
                        })
                        .catch(() => {
                            lessonCard.href = lesson.url;
                        });

                    lessonCard.appendChild(lessonTitle);
                    lessonsContainer.appendChild(lessonCard);
                });
            })
            .catch(error => console.error("Error loading lessons:", error));
    }
});
