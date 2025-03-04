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

    loadHeaderFooter(); // Load header and footer
    loadLessons();      // Load lessons

    // FIX: Ensure Bootstrap Carousel loops continuously and allows backward navigation
    const galleryCarousel = document.getElementById("galleryCarousel");
    const carousel = new bootstrap.Carousel(galleryCarousel, {
        interval: 3000, // Auto-slide every 3 seconds
        wrap: true, // Ensure it loops back to the first slide
        ride: "carousel"
    });

    // Fix previous and next buttons
    document.querySelector(".carousel-control-prev").addEventListener("click", function () {
        carousel.prev(); // Move to the previous slide
    });

    document.querySelector(".carousel-control-next").addEventListener("click", function () {
        carousel.next(); // Move to the next slide
    });

    // Captions for each image
    const captions = [
        "My sister and I pounding cassava leaves ('ravitoto') for lunch, with rice.", // cooking
        "Family dinner by candlelight, with visitors (not often) from Tana, in the village.", // cooking
        "My parents and the three youngest siblings (G = D). My father. My mother. My little sister, me, my brother.", // family
        "In our home village, 'Amparihibe.'", // hometown
        "HVMM Laboratory Technician (2005–2010)", // lab
        "Our childhood home, the family village of Amparihibe, Amparafaravola.", // house
        "Our village—the bamboo behind our house, decades old, along with fruit trees and fields.", // house 2
        "My parents and the three youngest siblings (G = D).", // parents
        "Return to our home village for the holidays—swimming in the nearby lake.", // swimming
        "Walking back from the Thursday market, about ten kilometers away.", // walking
        "Rice harvest. Zebus trampling the rice.", // rice
        "Waiting for the taxi-brousse to return to the center of the island, hundreds of kilometers away.", // road
        "Our rice fields. July–August.", // ombi 1
        "Harvest." // ombi 2
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
