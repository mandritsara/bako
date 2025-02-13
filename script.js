console.log("✅ script.js has loaded!");


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

    // Function to generate lesson cards dynamically while maintaining order
    function generateLessonCards(lessons, containerId) {
        const container = document.getElementById(containerId);
        if (!container) {
            console.error(`Error: Container #${containerId} not found!`);
            return;
        }

        container.innerHTML = ""; // Clear existing content before inserting new ones

        // Map lesson URLs to fetch HEAD requests
        const fetchPromises = lessons.map(lesson => {
            const pdfUrl = lesson.url;
            const htmlUrl = pdfUrl.replace(/\.pdf$/, ".html");
            return fetch(htmlUrl, { method: 'HEAD' })
                .then(response => response.ok ? htmlUrl : pdfUrl)
                .catch(() => pdfUrl); // Default to PDF if fetch fails
        });

        // Resolve all fetch requests before displaying content
        Promise.all(fetchPromises).then(resolvedUrls => {
            lessons.forEach((lesson, index) => {
                const preferredUrl = resolvedUrls[index];
                const card = document.createElement("div");
                card.classList.add("lesson-card");
                card.innerHTML = `
                    <a href="${preferredUrl}" target="_blank" style="text-decoration: none; color: inherit; display: block; padding: 15px;">
                        <h3>${lesson.title}</h3>
                    </a>
                `;
                container.appendChild(card);
                console.log("Added lesson card:", lesson.title);
            });
        });
    }
});

document.addEventListener("DOMContentLoaded", function () {
    console.log("✅ script.js has loaded!");
    
    fetch("header.html")
        .then(response => {
            console.log("🔄 Fetching header.html... Response:", response);
            if (!response.ok) throw new Error(`❌ HTTP Error ${response.status}`);
            return response.text();
        })
        .then(data => {
            document.getElementById("header").innerHTML = data;
            console.log("✅ Header loaded successfully!");
        })
        .catch(error => console.error("❌ Error loading header:", error));
});
