document.addEventListener("DOMContentLoaded", function () {
    function loadHeaderFooter() {
        const headerContainer = document.getElementById("header");
        const footerContainer = document.getElementById("footer");

        const headerPath = "header.html";
        const footerPath = "footer.html";

        if (headerContainer) {
            fetch(headerPath)
                .then(response => {
                    if (!response.ok) throw new Error(`Failed to load ${headerPath}`);
                    return response.text();
                })
                .then(data => headerContainer.innerHTML = data)
                .catch(error => console.error("Error loading header:", error));
        }

        if (footerContainer) {
            fetch(footerPath)
                .then(response => {
                    if (!response.ok) throw new Error(`Failed to load ${footerPath}`);
                    return response.text();
                })
                .then(data => footerContainer.innerHTML = data)
                .catch(error => console.error("Error loading footer:", error));
        }
    }

    function loadLessons() {
        function getPageCategory() {
            let path = window.location.pathname;
            if (path.includes("introduction")) return "Introductory Lessons";
            if (path.includes("grammar")) return "Grammar Lessons";
            if (path.includes("theme")) return "Thematic Lessons";
            return null;
        }

        let categoryToLoad = getPageCategory();

        if (categoryToLoad) {
            fetch("/bako/lessons.json")
                .then(response => response.json())
                .then(data => {
                    const lessonsContainer = document.getElementById("lessons-container");
                    if (!lessonsContainer) return;

                    let category = data.lessons.find(cat => cat.category === categoryToLoad);
                    if (!category) return;

                    let lessonGrid = document.createElement("div");
                    lessonGrid.className = "lesson-container";

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

                        fetch(htmlUrl, { method: "HEAD" })
                            .then(response => {
                                lessonCard.href = response.ok ? htmlUrl : lesson.url;
                            })
                            .catch(() => {
                                lessonCard.href = lesson.url;
                            });

                        lessonCard.appendChild(lessonTitle);
                        lessonGrid.appendChild(lessonCard);
                    });

                    lessonsContainer.appendChild(lessonGrid);
                })
                .catch(error => console.error("Error loading lessons:", error));
        }
    }

    loadHeaderFooter(); // Call only *once*, inside the DOMContentLoaded
    loadLessons();      // Call only *once*, inside the DOMContentLoaded
}); // Correctly closed

document.addEventListener("DOMContentLoaded", function () {
    const captions = [
        "Children enjoying a moment together",
        "Traditional Malagasy cooking",
        "A warm family gathering",
        "A view of my hometown",
        "A typical Malagasy house",
        "Another home in the village",
        "My parents in our village",
        "Swimming in the river",
        "Walking through nature"
    ];

    const carouselItems = document.querySelectorAll(".carousel-item");

    carouselItems.forEach((item, index) => {
        if (captions[index]) {
            const captionDiv = document.createElement("div");
            captionDiv.classList.add("carousel-caption", "d-none", "d-md-block");
            captionDiv.innerHTML = `<p>${captions[index]}</p>`;
            item.appendChild(captionDiv);
        }
    });
});

