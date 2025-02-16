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
    if (!categoryToLoad) return;

    fetch("lessons.json")
        .then(response => response.json())
        .then(data => {
            const lessonsContainer = document.getElementById("lessons-container");
            if (!lessonsContainer) {
                console.error("Error: #lessons-container not found.");
                return;
            }

            let category = data.lessons.find(cat => cat.category === categoryToLoad);
            if (!category) return;

            category.links.forEach(lesson => {
                let lessonCard = document.createElement("div");
                lessonCard.className = "card";
                
                let lessonTitle = document.createElement("h4");
                lessonTitle.textContent = lesson.title;
                lessonTitle.style.color = "#3a6f6a";
                
                let lessonLink = document.createElement("a");
                lessonLink.textContent = "View Lesson";
                lessonLink.href = lesson.url;
                lessonLink.target = "_blank";
                lessonLink.className = "btn btn-primary";
                
                lessonCard.appendChild(lessonTitle);
                lessonCard.appendChild(lessonLink);
                lessonsContainer.appendChild(lessonCard);
            });
        })
        .catch(error => console.error("Error loading lessons:", error));
});
