document.addEventListener("DOMContentLoaded", function () {
    // Load header and footer dynamically
    fetch("header.html")
        .then(response => response.text())
        .then(data => document.getElementById("header").innerHTML = data);

    fetch("footer.html")
        .then(response => response.text())
        .then(data => document.getElementById("footer").innerHTML = data);

    fetch("lessons.json")
        .then(response => response.json())
        .then(data => {
            const lessonsList = document.getElementById("lessons-list");
            if (!lessonsList) {
                console.error("Error: lessons-list container not found!");
                return;
            }

            data.lessons.forEach(category => {
                let categoryTitle = document.createElement("h3");
                categoryTitle.textContent = category.category;
                lessonsList.appendChild(categoryTitle);

                category.links.forEach(lesson => {
                    let lessonCard = document.createElement("div");
                    lessonCard.className = "lesson-card";

                    let lessonTitle = document.createElement("h4");
                    lessonTitle.textContent = lesson.title;

                    let pdfLink = document.createElement("a");
                    pdfLink.href = lesson.url;
                    pdfLink.target = "_blank";
                    pdfLink.textContent = "Download PDF";
                    pdfLink.style.marginRight = "10px";

                    let htmlUrl = lesson.url.replace(".pdf", ".html");
                    let htmlLink = document.createElement("a");
                    htmlLink.href = htmlUrl;
                    htmlLink.target = "_blank";
                    htmlLink.textContent = "View Lesson (HTML)";

                    // Check if the HTML file exists before displaying the link
                    fetch(htmlUrl, { method: "HEAD" })
                        .then(response => {
                            if (response.ok) {
                                lessonCard.appendChild(htmlLink);
                            } else {
                                console.warn(`HTML version not available for: ${lesson.title}`);
                            }
                        })
                        .catch(() => {
                            console.warn(`HTML version not found for: ${lesson.title}`);
                        });

                    // Always add the PDF link
                    lessonCard.appendChild(lessonTitle);
                    lessonCard.appendChild(pdfLink);
                    lessonsList.appendChild(lessonCard);
                });
            });
        })
        .catch(error => console.error("Error loading lessons:", error));
});
