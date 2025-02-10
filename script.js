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

    // Fetch lessons from JSON and populate relevant section
    fetch("lessons.json")
        .then(response => response.json())
        .then(lessonData => {
            let lessonCategory = "";  // Will store the correct key from JSON

            // Determine which category to load based on the page name
            if (page === "introduction.html") {
                lessonCategory = "introduction";
            } else if (page === "grammar.html") {
                lessonCategory = "grammar";
            } else if (page === "themes.html") {
                lessonCategory = "thematic";
            }

            // Load the correct lessons into the page
            if (lessonCategory && lessonData[lessonCategory]) {
                generateLessonCards(lessonData[lessonCategory], "lessons-container");
            }
        })
        .catch(error => console.error("Error loading lessons:", error));

    // Function to generate lesson cards dynamically
    function generateLessonCards(lessons, containerId) {
        const container = document.getElementById(containerId);
        if (container) {
            container.innerHTML = ""; // Clear existing content before inserting new ones
            lessons.forEach(lesson => {
                const card = document.createElement("div");
                card.classList.add("card");
                card.innerHTML = `<a href="${lesson.url}" target="_blank">${lesson.title}</a>`;
                container.appendChild(card);
            });
        }
    }
});
