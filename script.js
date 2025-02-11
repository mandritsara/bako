document.addEventListener("DOMContentLoaded", function () {
    // Load header and footer dynamically
    fetch("header.html")
        .then(response => response.text())
        .then(data => document.getElementById("header").innerHTML = data);

    fetch("footer.html")
        .then(response => response.text())
        .then(data => document.getElementById("footer").innerHTML = data);

    // Detect which page is currently loaded
    const page = window.location.pathname.split("/").pop(); // Get filename from URL

    // Define the mapping between pages and lesson categories
    const categoryMap = {
        "introduction.html": "Introductory Lessons",
        "grammar.html": "Grammar Lessons",
        "themes.html": "Thematic Lessons"
    };

    fetch("lessons.json")
        .then(response => {
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
            return response.json();
        })
        .then(lessonData => {
            console.log("Lessons loaded:", lessonData);

            const lessonCategory = categoryMap[page];
            if (!lessonCategory) {
                console.error("No matching category for this page:", page);
                return;
            }

            // Find the correct lesson section in the JSON
            const categoryData = lessonData.lessons.find(cat => cat.category === lessonCategory);
            if (!categoryData || !categoryData.links) {
                console.error("Category data not found for:", lessonCategory);
                return;
            }

            generateLessonCards(categoryData.links, "lessons-container");
        })
        .catch(error => console.error("Error loading lessons:", error));

    // Function to generate lesson cards dynamically
    function generateLessonCards(lessons, containerId) {
        const container = document.getElementById(containerId);
        if (!container) {
            console.error(`Error: Container #${containerId} not found!`);
            return;
        }

        container.innerHTML = ""; // Clear existing content before inserting new ones

        lessons.forEach(lesson => {
            const card = document.createElement("div");
            card.classList.add("card");
            card.innerHTML = `<a href="${lesson.url}" target="_blank">${lesson.title}</a>`;
            container.appendChild(card);
            console.log("Added lesson card:", lesson.title);
        });

        console.log("All lesson cards added.");
    }
});
