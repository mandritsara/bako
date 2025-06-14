const quizData = [
  { english: "RICE", malagasy: "VARY", tsimihety: "", image: "https://tse1.mm.bing.net/th?id=OIP.aPbTB2QWnzwcgJy6nbPsGgHaHa&r=0&pid=Api" },
  { english: "OIL", malagasy: "MENAKA", tsimihety: "", image: "https://tse1.mm.bing.net/th?id=OIP.D0Il-pmpYOgWaQBC83YgPgHaKj&pid=Api" },
  { english: "GARLIC", malagasy: "TONGOLO GASY", tsimihety: "TONGOLO GASY", image: "https://tse1.mm.bing.net/th?id=OIP.8nmUsZczFccyi2fD5EtR6AHaLH&pid=Api" },
  { english: "WHITE BEANS", malagasy: "TSARAMASO", tsimihety: "", image: "https://tse3.mm.bing.net/th?id=OIP.pf25rwT97aG2lXTqKrrPyAHaE8&pid=Api" },
  { english: "BREAD", malagasy: "MOFO", tsimihety: "MOFO", image: "https://tse4.mm.bing.net/th?id=OIP.vSqJen_DYm0rMbwKLX1BvgHaHa&r=0&pid=Api" },
  { english: "BANANA", malagasy: "AKONDRO", tsimihety: "FONTSY", image: "https://tse1.mm.bing.net/th?id=OIP.VeN7wZxKTV0IOUay06cNGQHaE8&pid=Api" },
  { english: "FLOUR", malagasy: "LAFARINA", tsimihety: "", image: "https://tse2.mm.bing.net/th?id=OIP.gk0YJ-Ll1LO4QJr4N5ZyNAHaLH&pid=Api" },
  { english: "MEAT", malagasy: "HENA", tsimihety: "", image: "https://tse1.mm.bing.net/th?id=OIP.LtHIDQ6qPUcHaX_6HFqfOQHaE8&pid=Api" }
];

function formatLabel(malagasy, tsimihety) {
  return tsimihety && tsimihety !== malagasy
    ? \`\${malagasy} / \${tsimihety}\`
    : malagasy;
}

function shuffle(a) {
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
}

function buildQuiz() {
  const container = document.getElementById('quiz-area');
  container.innerHTML = '';
  const shuffled = [...quizData]; shuffle(shuffled);
  const wordBank = shuffled.map(item => ({
    label: formatLabel(item.malagasy, item.tsimihety),
    answer: item.malagasy
  }));
  shuffle(wordBank);

  shuffled.forEach(item => {
    const col = document.createElement('div');
    col.className = 'col-md-4';
    const card = document.createElement('div');
    card.className = 'match-card';
    card.innerHTML = \`
      <img src="\${item.image}" alt="\${item.english}" class="img-fluid rounded">
      <h5 class="mt-2">\${item.english}</h5>
      <div class="droppable" data-answer="\${item.malagasy}"></div>
    \`;
    col.appendChild(card);
    container.appendChild(col);
  });

  const bankDiv = document.createElement('div');
  bankDiv.className = 'col-md-12 text-center';
  wordBank.forEach(w => {
    const span = document.createElement('span');
    span.className = 'malagasy-word';
    span.textContent = w.label;
    span.draggable = true;
    span.addEventListener('dragstart', e => e.dataTransfer.setData('text/plain', w.answer));
    bankDiv.appendChild(span);
  });
  container.appendChild(bankDiv);

  document.querySelectorAll('.droppable').forEach(drop => {
    drop.addEventListener('dragover', e => e.preventDefault());
    drop.addEventListener('drop', e => {
      e.preventDefault();
      const dragged = e.dataTransfer.getData('text/plain');
      const dropAns = drop.getAttribute('data-answer');
      drop.textContent = dragged;
      drop.classList.toggle('correct', dragged === dropAns);
      drop.classList.toggle('incorrect', dragged !== dropAns);
    });
  });
}

buildQuiz();
