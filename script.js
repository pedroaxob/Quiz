const questions = [
  {
    question: "Contra qual seleção o Brasil perdeu por 7x1 em 2014?",
    options: ["Alemanha", "Argentina", "França", "Itália"],
    answer: "Alemanha"
  },
  {
    question: "Quem é conhecido como o Rei do Futebol?",
    options: ["Pelé", "Neymar", "Ronaldo", "Romário"],
    answer: "Pelé"
  },
  {
    question: "Qual seleção venceu o Brasil nos pênaltis em 2022?",
    options: ["Croácia", "Chile", "Bélgica", "Uruguai"],
    answer: "Croácia"
  },
  {
    question: "Em que ano o Brasil ganhou a Copa do Mundo pela última vez?",
    options: ["1994", "2002", "2010", "2014"],
    answer: "2002"
  },
  {
    question: "Qual jogador marcou gol na final de 2002 contra a Alemanha?",
    options: ["Ronaldo", "Neymar", "Cafu", "Kaká"],
    answer: "Ronaldo"
  }
];

const fixedLogins = ["Aluno1", "Aluno2", "Aluno3", "Torcedor"];
const storageKey = "quizBrasilRanking";

const homeScreen = document.getElementById("homeScreen");
const quizScreen = document.getElementById("quizScreen");
const loginList = document.getElementById("loginList");
const customLogin = document.getElementById("customLogin");
const startBtn = document.getElementById("startBtn");
const scoreboardBody = document.getElementById("scoreboardBody");

const playerTitle = document.getElementById("playerTitle");
const questionCount = document.getElementById("questionCount");
const scoreEl = document.getElementById("score");
const questionText = document.getElementById("questionText");
const optionsEl = document.getElementById("options");
const feedbackEl = document.getElementById("feedback");
const nextBtn = document.getElementById("nextBtn");

let selectedLogin = fixedLogins[0];
let currentQuestion = 0;
let score = 0;
let answered = false;
let currentPlayer = "";

function loadRanking() {
  return JSON.parse(localStorage.getItem(storageKey) || "[]");
}

function saveRanking(ranking) {
  localStorage.setItem(storageKey, JSON.stringify(ranking));
}

function renderLogins() {
  loginList.innerHTML = "";
  fixedLogins.forEach((name, index) => {
    const button = document.createElement("button");
    button.textContent = name;
    button.classList.toggle("active", index === 0);

    button.addEventListener("click", () => {
      selectedLogin = name;
      customLogin.value = name;
      document.querySelectorAll(".login-list button").forEach(btn => btn.classList.remove("active"));
      button.classList.add("active");
    });

    loginList.appendChild(button);
  });

  customLogin.value = fixedLogins[0];
}

function renderRanking() {
  const ranking = loadRanking().sort((a, b) => b.best - a.best);
  if (ranking.length === 0) {
    scoreboardBody.innerHTML = `<tr><td colspan="3">Ainda não há pontuações.</td></tr>`;
    return;
  }

  scoreboardBody.innerHTML = ranking.map(item => `
    <tr>
      <td>${item.name}</td>
      <td>${item.best}/${questions.length}</td>
      <td>${item.attempts}</td>
    </tr>
  `).join("");
}

function updateRanking(name, newScore) {
  const ranking = loadRanking();
  const item = ranking.find(player => player.name.toLowerCase() === name.toLowerCase());

  if (item) {
    item.attempts += 1;
    item.best = Math.max(item.best, newScore);
  } else {
    ranking.push({ name, best: newScore, attempts: 1 });
  }

  saveRanking(ranking);
  renderRanking();
}

function startGame() {
  const typed = customLogin.value.trim();
  currentPlayer = typed || selectedLogin;

  homeScreen.classList.add("hidden");
  quizScreen.classList.remove("hidden");

  currentQuestion = 0;
  score = 0;
  showQuestion();
}

function showQuestion() {
  answered = false;
  const q = questions[currentQuestion];

  playerTitle.textContent = `Jogador: ${currentPlayer}`;
  questionCount.textContent = `Pergunta ${currentQuestion + 1} de ${questions.length}`;
  scoreEl.textContent = score;
  questionText.textContent = q.question;
  feedbackEl.textContent = "";
  nextBtn.classList.add("hidden");
  optionsEl.innerHTML = "";

  q.options.forEach(option => {
    const btn = document.createElement("button");
    btn.className = "option-btn";
    btn.textContent = option;

    btn.addEventListener("click", () => checkAnswer(btn, option));
    optionsEl.appendChild(btn);
  });
}

function checkAnswer(button, chosen) {
  if (answered) return;
  answered = true;

  const q = questions[currentQuestion];
  const allButtons = document.querySelectorAll(".option-btn");
  allButtons.forEach(btn => btn.disabled = true);

  if (chosen === q.answer) {
    score += 1;
    button.classList.add("correct");
    feedbackEl.textContent = "Acertou!";
  } else {
    button.classList.add("wrong");
    allButtons.forEach(btn => {
      if (btn.textContent === q.answer) btn.classList.add("correct");
    });
    feedbackEl.textContent = `Resposta certa: ${q.answer}`;
  }

  scoreEl.textContent = score;
  nextBtn.classList.remove("hidden");
}

function finishGame() {
  updateRanking(currentPlayer, score);
  quizScreen.innerHTML = `
    <h1>Fim do quiz</h1>
    <p>${currentPlayer}, você fez ${score} pontos.</p>
    <button id="backHomeBtn">Voltar para a home</button>
  `;

  document.getElementById("backHomeBtn").addEventListener("click", () => {
    location.reload();
  });
}

nextBtn.addEventListener("click", () => {
  currentQuestion += 1;

  if (currentQuestion < questions.length) {
    showQuestion();
  } else {
    finishGame();
  }
});

startBtn.addEventListener("click", startGame);

renderLogins();
renderRanking();
