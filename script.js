let questions = [
    {
        "question": "Wer hat HTML erfunden?",
        "answer_1": "Robbie Williams",
        "answer_2": "Lady Gaga",
        "answer_3": "Tim Berners Lee",
        "answer_4": "Justin Bieber",
        "right_answer": 3
    },
    {
        "question": "Was bedeutet das HTML Tag a?",
        "answer_1": "Text fett",
        "answer_2": "Container",
        "answer_3": "Ein Link",
        "answer_4": "Text kursiv",
        "right_answer": 3
    },
    {
        "question": "Wie bindet man eine Website in eine Website ein?",
        "answer_1": "a",
        "answer_2": "iframe",
        "answer_3": "div",
        "answer_4": "b",
        "right_answer": 2
    },
    {
        "question": "Wie wählst du alle Elemente vom Typ a mit dem attribut title aus?",
        "answer_1": "a[title]{...}",
        "answer_2": "a > title{...}",
        "answer_3": "a.title{...}",
        "answer_4": "a=title{...}",
        "right_answer": 1
    },
    {
        "question": "Wie definiert man in Javascript eine Variable?",
        "answer_1": "let 100 = rate;",
        "answer_2": "100 = let rate;",
        "answer_3": "rate = 100;",
        "answer_4": "let rate = 100;",
        "right_answer": 4
    }
];

let currentQuestion = 0;
let rightQuestions = 0;
let completeGameAudio = new Audio('audio/gameComplete.mp3')

function init() {
    content = document.getElementById('card-content');
    content.innerHTML = quizWelcomeTemplate();
}

function initQuestions() {
    content = document.getElementById('card-content');
    content.innerHTML = quizCardTemplate();
    document.getElementById('all-questions').innerHTML = questions.length;
    showQuestion()
}

function showQuestion() {
    if (gameIsOver()) {
        showEndscreen();
    } else {
        calculatorProgressbar();
        updateToNextQuestion();
    }
}

function gameIsOver() {
    return currentQuestion >= questions.length;
}

function calculatorProgressbar() {
    let percent = (currentQuestion+1) / questions.length * 100;
    document.getElementById('progress-bar').innerHTML = `${percent}%`;
    document.getElementById('progress-bar').style.width = `${percent}%`;
}

function answer(selection) {
    let question = questions[currentQuestion];
    let selectionQuestionNumber = selection.slice(-1);
    let showRightAnswer = `answer_${question['right_answer']}`;

    if (rightAnswerSelected(selectionQuestionNumber, question)) { //Test right answer
        document.getElementById(selection).parentNode.classList.add('bg-success');
        rightQuestions++;
    } else {
        document.getElementById(selection).parentNode.classList.add('bg-danger');
        document.getElementById(showRightAnswer).parentNode.classList.add('bg-success');
    }

    document.getElementById('next-button').disabled = false;
}

function rightAnswerSelected(selectionQuestionNumber, question) {
    return selectionQuestionNumber == question['right_answer'];
}

function nextQuestion() {
    currentQuestion++;
    document.getElementById('next-button').disabled = true;
    resetAnswerButtons();
    showQuestion();
}

function resetAnswerButtons() {
    document.getElementById('answer_1').parentNode.classList.remove('bg-success');
    document.getElementById('answer_2').parentNode.classList.remove('bg-success');
    document.getElementById('answer_3').parentNode.classList.remove('bg-success');
    document.getElementById('answer_4').parentNode.classList.remove('bg-success');
    document.getElementById('answer_1').parentNode.classList.remove('bg-danger');
    document.getElementById('answer_2').parentNode.classList.remove('bg-danger');
    document.getElementById('answer_3').parentNode.classList.remove('bg-danger');
    document.getElementById('answer_4').parentNode.classList.remove('bg-danger');
}

function showEndscreen() {
    content = document.getElementById('card-content');
    content.innerHTML = endscreenTemplate();
    completeGameAudio.play();
}

function updateToNextQuestion() {
    let question = questions[currentQuestion];
    document.getElementById('active-question').innerHTML = currentQuestion + 1;
    document.getElementById('quenstionText').innerHTML = question['question'];
    document.getElementById('answer_1').innerHTML = question['answer_1'];
    document.getElementById('answer_2').innerHTML = question['answer_2'];
    document.getElementById('answer_3').innerHTML = question['answer_3'];
    document.getElementById('answer_4').innerHTML = question['answer_4'];
}

function restartGame() {
    currentQuestion = 0;
    rightQuestions = 0;
    initQuestions();
}


/* --- Templates --- */
function quizWelcomeTemplate() {
    return /*html*/`
    <div class="card-body welcome-text">
        <span>Welcome to</span>
        <span>The Awesome HTML Quiz</span>
        <button class="button-start mt-4" onclick="initQuestions()">Start</button>
    </div>
    `;
}

function endscreenTemplate() {
    let amountQuestions = questions.length;
    let rightQuestion = rightQuestions;
    return /*html*/`
    <div class="progress">
        <div class="progress-bar" role="progressbar" style="width: 100%;" aria-valuenow="25" aria-valuemin="0" aria-valuemax="100">100%</div>
    </div>
    <div class="card-body">
        <div class="endscreen">
            <img class="img-endscreen" src="img/Group-5.png">
            <div class="complete-text">
                <span><b>Complete</b></span>
                <span><b>HTML Quiz</b></span>
            </div>
            <div class="score-text">
                <span class="your-score"><b>Your Score</b></span>
                <span><b>${rightQuestion}</b>/<b>${amountQuestions}</b><span>
            </div>
            <div class="button-container"><button class="button-share">SHARE</button><div>
            <div class="button-container"><button class="button-replay" onclick="restartGame()">REPLAY</button><div>
        <div>
    </div>
    `;
}

function quizCardTemplate() {
    return /*html*/`
    <div class="progress">
        <div class="progress-bar" id="progress-bar" role="progressbar" style="width: 0%;" aria-valuenow="25" aria-valuemin="0" aria-valuemax="100">0%</div>
    </div>
    <div class="card-body">
        <h5 class="card-title text-center" id="quenstionText">Frage</h5>
        <div class="card quiz-answer-card mb-2" onclick="answer('answer_1')">
            <div class="card-body">
                <span class="card-letter"><b>A</b></span>
                <span id="answer_1">Antwort</span>
            </div>
        </div>

        <div class="card quiz-answer-card mb-2" onclick="answer('answer_2')">
            <div class="card-body">
                <span class="card-letter"><b>B</b></span>
                <span id="answer_2">Antwort</span>
            </div>
        </div>

        <div class="card quiz-answer-card mb-2" onclick="answer('answer_3')">
            <div class="card-body">
                <span class="card-letter"><b>C</b></span>
                <span id="answer_3">Antwort</span>
            </div>
        </div>

        <div class="card quiz-answer-card mb-2" onclick="answer('answer_4')">
            <div class="card-body">
                <span class="card-letter"><b>D</b></span>
                <span id="answer_4">Antwort</span>
            </div>
        </div>

        <div class="card-footer">
            <button class="button-arrow"><img class="img-arrow" src="img/arrow-88-128.png"
                alt="left-arrow"></button>
            <span class="text-center"><b id="active-question">1</b> von <b id="all-questions">5</b></span>
            <button class="button-arrow" id="next-button" onclick="nextQuestion()" disabled><img class="img-arrow"
                src="img/arrow-24-128.png" alt="right-arrow"></button>
        </div>
    </div>
    `;
}