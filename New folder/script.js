// Array with 30 quiz questions
const questions = [
    { question: "What is the capital of France?", answers: ["Berlin", "Madrid", "Paris", "Lisbon"], correct: 2 },
    { question: "Which planet is known as the Red Planet?", answers: ["Earth", "Mars", "Jupiter", "Saturn"], correct: 1 },
    { question: "What is 2 + 2?", answers: ["3", "4", "5", "6"], correct: 1 },
    { question: "Who wrote 'To Kill a Mockingbird'?", answers: ["Harper Lee", "Mark Twain", "Ernest Hemingway", "F. Scott Fitzgerald"], correct: 0 },
    { question: "What is the boiling point of water?", answers: ["90°C", "100°C", "110°C", "120°C"], correct: 1 },
    { question: "What is the largest ocean on Earth?", answers: ["Atlantic", "Indian", "Arctic", "Pacific"], correct: 3 },
    { question: "Who wrote 'Pride and Prejudice'?", answers: ["Jane Austen", "Charles Dickens", "Emily Brontë", "Mark Twain"], correct: 0 }
    // Add more questions to reach 30 total
];

let currentQuestion = 0;
let score = 0;

const heroSection = document.getElementById("hero-section");
const quizContainer = document.getElementById("quiz-container");
const questionContainer = document.getElementById("question-container");
const questionText = document.getElementById("question-text");
const answerOptions = document.getElementById("answer-options");
const nextBtn = document.getElementById("next-btn");
const scoreContainer = document.getElementById("score-container");
const scoreText = document.getElementById("score");
const progress = document.getElementById("progress");

function startQuiz() {
    heroSection.style.display = "none";
    quizContainer.style.display = "block";
    loadQuestion();
}

function loadQuestion() {
    const current = questions[currentQuestion];
    questionText.textContent = current.question;
    answerOptions.innerHTML = "";
    current.answers.forEach((answer, index) => {
        const button = document.createElement("button");
        button.textContent = answer;
        button.addEventListener("click", () => checkAnswer(index, button));
        answerOptions.appendChild(button);
    });
    nextBtn.style.display = "none";
    updateProgress();
}

function checkAnswer(selectedIndex, selectedButton) {
    const correctIndex = questions[currentQuestion].correct;
    if (selectedIndex === correctIndex) {
        score++;
        selectedButton.classList.add("correct");
    } else {
        selectedButton.classList.add("incorrect");
        answerOptions.children[correctIndex].classList.add("correct");
    }
    Array.from(answerOptions.children).forEach(button => button.disabled = true);
    nextBtn.style.display = "block";
}

function nextQuestion() {
    currentQuestion++;
    if (currentQuestion < questions.length) {
        loadQuestion();
    } else {
        showScore();
    }
}

function updateProgress() {
    progress.style.width = `${((currentQuestion + 1) / questions.length) * 100}%`;
}

function showScore() {
    quizContainer.style.display = "none";
    scoreContainer.style.display = "block";
    scoreText.textContent = `You scored ${score} out of ${questions.length}`;
}

function restartQuiz() {
    currentQuestion = 0;
    score = 0;
    scoreContainer.style.display = "none";
    quizContainer.style.display = "block";
    loadQuestion();
}

// Event Listeners
nextBtn.addEventListener("click", nextQuestion);

// Initialize by hiding quiz and showing hero section
quizContainer.style.display = "none";
