const quizData = [
  { question: "What is 1 in Malagasy?", answer: "iray" },
  { question: "What is 2 in Malagasy?", answer: "roa" },
  { question: "What is 3 in Malagasy?", answer: "telo" },
  { question: "What is 4 in Malagasy?", answer: "efatra" },
  { question: "What is 5 in Malagasy?", answer: "dimy" },
  { question: "What is 6 in Malagasy?", answer: "enina" },
  { question: "What is 7 in Malagasy?", answer: "fito" },
  { question: "What is 8 in Malagasy?", answer: "valo" },
  { question: "What is 9 in Malagasy?", answer: "sivy" },
  { question: "What is 10 in Malagasy?", answer: "folo" },
  { question: "What is 11 in Malagasy?", answer: "iraika ambin'ny folo" },
  { question: "What is 12 in Malagasy?", answer: "roa ambin'ny folo" },
  { question: "What is 13 in Malagasy?", answer: "telo ambin'ny folo" },
  { question: "What is 14 in Malagasy?", answer: "efatra ambin'ny folo" },
  { question: "What is 15 in Malagasy?", answer: "dimy ambin'ny folo" },
  { question: "What is 16 in Malagasy?", answer: "enina ambin'ny folo" },
  { question: "What is 17 in Malagasy?", answer: "fito ambin'ny folo" },
  { question: "What is 18 in Malagasy?", answer: "valo ambin'ny folo" },
  { question: "What is 19 in Malagasy?", answer: "sivy ambin'ny folo" },
  { question: "What is 20 in Malagasy?", answer: "roapolo" },
  { question: "What is 21 in Malagasy?", answer: "iray amby roapolo" },
  { question: "What is 22 in Malagasy?", answer: "roa amby roapolo" },
  { question: "What is 23 in Malagasy?", answer: "telo amby roapolo" },
  { question: "What is 24 in Malagasy?", answer: "efatra amby roapolo" },
  { question: "What is 25 in Malagasy?", answer: "dimy amby roapolo" },
  { question: "What is 26 in Malagasy?", answer: "enina amby roapolo" },
  { question: "What is 27 in Malagasy?", answer: "fito amby roapolo" },
  { question: "What is 28 in Malagasy?", answer: "valo amby roapolo" },
  { question: "What is 29 in Malagasy?", answer: "sivy amby roapolo" },
  { question: "What is 30 in Malagasy?", answer: "telopolo" },
  { question: "What is 31 in Malagasy?", answer: "iray amby telopolo" },
  { question: "What is 32 in Malagasy?", answer: "roa amby telopolo" },
  { question: "What is 33 in Malagasy?", answer: "telo amby telopolo" },
  { question: "What is 34 in Malagasy?", answer: "efatra amby telopolo" },
  { question: "What is 35 in Malagasy?", answer: "dimy amby telopolo" },
  { question: "What is 36 in Malagasy?", answer: "enina amby telopolo" },
  { question: "What is 37 in Malagasy?", answer: "fito amby telopolo" },
  { question: "What is 38 in Malagasy?", answer: "valo amby telopolo" },
  { question: "What is 39 in Malagasy?", answer: "sivy amby telopolo" },
  { question: "What is 40 in Malagasy?", answer: "efapolo" },
  { question: "What is 41 in Malagasy?", answer: "iray amby efapolo" },
  { question: "What is 42 in Malagasy?", answer: "roa amby efapolo" },
  { question: "What is 43 in Malagasy?", answer: "telo amby efapolo" },
  { question: "What is 44 in Malagasy?", answer: "efatra amby efapolo" },
  { question: "What is 45 in Malagasy?", answer: "dimy amby efapolo" },
  { question: "What is 46 in Malagasy?", answer: "enina amby efapolo" },
  { question: "What is 47 in Malagasy?", answer: "fito amby efapolo" },
  { question: "What is 48 in Malagasy?", answer: "valo amby efapolo" },
  { question: "What is 49 in Malagasy?", answer: "sivy amby efapolo" },
  { question: "What is 50 in Malagasy?", answer: "dimampolo" },
  { question: "What is 51 in Malagasy?", answer: "iray amby dimampolo" },
  { question: "What is 52 in Malagasy?", answer: "roa amby dimampolo" },
  { question: "What is 53 in Malagasy?", answer: "telo amby dimampolo" },
  { question: "What is 54 in Malagasy?", answer: "efatra amby dimampolo" },
  { question: "What is 55 in Malagasy?", answer: "dimy amby dimampolo" },
  { question: "What is 56 in Malagasy?", answer: "enina amby dimampolo" },
  { question: "What is 57 in Malagasy?", answer: "fito amby dimampolo" },
  { question: "What is 58 in Malagasy?", answer: "valo amby dimampolo" },
  { question: "What is 59 in Malagasy?", answer: "sivy amby dimampolo" },
  { question: "What is 60 in Malagasy?", answer: "enimpolo" },
  { question: "What is 61 in Malagasy?", answer: "iray amby enimpolo" },
  { question: "What is 62 in Malagasy?", answer: "roa amby enimpolo" },
  { question: "What is 63 in Malagasy?", answer: "telo amby enimpolo" },
  { question: "What is 64 in Malagasy?", answer: "efatra amby enimpolo" },
  { question: "What is 65 in Malagasy?", answer: "dimy amby enimpolo" },
  { question: "What is 66 in Malagasy?", answer: "enina amby enimpolo" },
  { question: "What is 67 in Malagasy?", answer: "fito amby enimpolo" },
  { question: "What is 68 in Malagasy?", answer: "valo amby enimpolo" },
  { question: "What is 69 in Malagasy?", answer: "sivy amby enimpolo" },
  { question: "What is 70 in Malagasy?", answer: "fitopolo" },
  { question: "What is 71 in Malagasy?", answer: "iray amby fitopolo" },
  { question: "What is 72 in Malagasy?", answer: "roa amby fitopolo" },
  { question: "What is 73 in Malagasy?", answer: "telo amby fitopolo" },
  { question: "What is 74 in Malagasy?", answer: "efatra amby fitopolo" },
  { question: "What is 75 in Malagasy?", answer: "dimy amby fitopolo" },
  { question: "What is 76 in Malagasy?", answer: "enina amby fitopolo" },
  { question: "What is 77 in Malagasy?", answer: "fito amby fitopolo" },
  { question: "What is 78 in Malagasy?", answer: "valo amby fitopolo" },
  { question: "What is 79 in Malagasy?", answer: "sivy amby fitopolo" },
  { question: "What is 80 in Malagasy?", answer: "valopolo" },
  { question: "What is 81 in Malagasy?", answer: "iray amby valopolo" },
  { question: "What is 82 in Malagasy?", answer: "roa amby valopolo" },
  { question: "What is 83 in Malagasy?", answer: "telo amby valopolo" },
  { question: "What is 84 in Malagasy?", answer: "efatra amby valopolo" },
  { question: "What is 85 in Malagasy?", answer: "dimy amby valopolo" },
  { question: "What is 86 in Malagasy?", answer: "enina amby valopolo" },
  { question: "What is 87 in Malagasy?", answer: "fito amby valopolo" },
  { question: "What is 88 in Malagasy?", answer: "valo amby valopolo" },
  { question: "What is 89 in Malagasy?", answer: "sivy amby valopolo" },
  { question: "What is 90 in Malagasy?", answer: "sivifolo" },
  { question: "What is 91 in Malagasy?", answer: "iray amby sivifolo" },
  { question: "What is 92 in Malagasy?", answer: "roa amby sivifolo" },
  { question: "What is 93 in Malagasy?", answer: "telo amby sivifolo" },
  { question: "What is 94 in Malagasy?", answer: "efatra amby sivifolo" },
  { question: "What is 95 in Malagasy?", answer: "dimy amby sivifolo" },
  { question: "What is 96 in Malagasy?", answer: "enina amby sivifolo" },
  { question: "What is 97 in Malagasy?", answer: "fito amby sivifolo" },
  { question: "What is 98 in Malagasy?", answer: "valo amby sivifolo" },
  { question: "What is 99 in Malagasy?", answer: "sivy amby sivifolo" },
  { question: "What is 100 in Malagasy?", answer: "zato" },
  

function startQuiz(data) {
  let current = null;
  const questionEl = document.getElementById('quiz-question');
  const resultEl = document.getElementById('quiz-result');
  const inputEl = document.getElementById('quiz-answer');

  window.newQuiz = function() {
    current = data[Math.floor(Math.random() * data.length)];
    questionEl.textContent = current.question;
    resultEl.textContent = "";
    inputEl.value = "";
  }

  window.checkAnswer = function() {
    const userAns = inputEl.value.trim().toLowerCase();
    const correctAns = current.answer.toLowerCase();
    resultEl.textContent = userAns === correctAns
      ? "Correct!"
      : `Wrong! The correct answer is: "${current.answer}"`;
  }

  newQuiz();
}

document.addEventListener("DOMContentLoaded", function () {
    function loadHeaderFooter() {
        const headerContainer = document.getElementById("header");
        const footerContainer = document.getElementById("footer");

        // ✅ Fetch from the same `/bako/introduction/` folder
        const headerPath = "header.html";  
        const footerPath = "footer.html";  

        console.log(`Fetching Header from: ${headerPath}`);
        console.log(`Fetching Footer from: ${footerPath}`);

        if (headerContainer) {
            fetch(headerPath)
                .then(response => {
                    if (!response.ok) throw new Error(`Failed to load ${headerPath}`);
                    return response.text();
                })
                .then(data => {
                    console.log("Header loaded successfully!");
                    headerContainer.innerHTML = data;
                })
                .catch(error => console.error("Error loading header:", error));
        }

     

        if (footerContainer) {
            fetch(footerPath)
                .then(response => {
                    if (!response.ok) throw new Error(`Failed to load ${footerPath}`);
                    return response.text();
                })
                .then(data => {
                    console.log("Footer loaded successfully!");
                    footerContainer.innerHTML = data;
                })
                .catch(error => console.error("Error loading footer:", error));
        }
    }

    loadHeaderFooter();
});

// Dynamically inject Google Analytics tag globally
(function () {
  const ga = document.createElement("script");
  ga.src = "https://www.googletagmanager.com/gtag/js?id=G-DG828TL4V1";
  ga.async = true;
  document.head.appendChild(ga);

  window.dataLayer = window.dataLayer || [];
  function gtag() { dataLayer.push(arguments); }
  gtag('js', new Date());
  gtag('config', 'G-DG828TL4V1');
})();
