document.addEventListener("DOMContentLoaded", function () {
    console.log("Script loaded!"); // Debugging

    // Load header and footer dynamically
    fetch("header.html")
        .then(response => response.text())
        .then(data => document.getElementById("header").innerHTML = data)
        .catch(error => console.error("Error loading header:", error));

    fetch("footer.html")
        .then(response => response.text())
        .then(data => document.getElementById("footer").innerHTML = data)
        .catch(error => console.error("Error loading footer:", error));

    // Detect which page is currently loaded
    const page = window.location.pathname.split("/").pop(); // Get filename from URL
    console.log("Current page:", page);

    // Define the mapping between pages and lesson categories
    const categoryMap = {
        "introduction.html": "Introductory Lessons",
        "grammar.html": "Grammar Lessons",
        "themes.html": "Thematic Lessons"
    };

    // Fetch lessons from JSON and load the appropriate category
    fetch("lessons.json")
        .then(response => response.json())
        .then(lessonData => {
            console.log("Lessons loaded:", lessonData);

            const lessonCategory = categoryMap[page];
            if (!lessonCategory) {
                console.error("No matching category for this page:", page);
                return;
            }

            // Find the correct category by searching the array
            const categoryData = lessonData.lessons.find(cat => cat.category === lessonCategory);
            if (!categoryData || !categoryData.links) {
                console.error("Category data not found for:", lessonCategory);
                return;
            }

            console.log("Category found:", lessonCategory);
            console.log("Lessons in category:", categoryData.links);

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
            const pdfUrl = lesson.url;
            const htmlUrl = pdfUrl.replace(/\.pdf$/, ".html"); // Assuming HTML files follow the same name pattern

            // Check if the HTML file exists
            fetch(htmlUrl, { method: 'HEAD' })
                .then(response => {
                    const preferredUrl = response.ok ? htmlUrl : pdfUrl;
                    const card = document.createElement("div");
                    card.classList.add("lesson-card");
                    card.innerHTML = `
                        <h3>${lesson.title}</h3>
                        <a href="${preferredUrl}" target="_blank">Open Lesson</a>
                        <p><a href="${pdfUrl}" download>Download PDF</a></p>
                    `;
                    container.appendChild(card);
                    console.log("Added lesson card:", lesson.title);
                })
                .catch(() => {
                    console.error("Failed to check HTML file existence:", htmlUrl);
                });
        });

        console.log("All lesson cards added.");
    }
});
