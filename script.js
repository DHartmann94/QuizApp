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
        loadNextQuestion();
    }
}

function gameIsOver() {
    return currentQuestion >= questions.length;
}

function calculatorProgressbar() {
    let percent = (currentQuestion) / questions.length * 100;
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
    blockMultiAnswer();
}

function blockMultiAnswer() {
    for (let i = 1; i < questions.length; i++) {
        document.getElementById(`click_${i}`).classList.add('block-card');
    }
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
    for (let i = 1; i < questions.length; i++) {
        document.getElementById(`answer_${i}`).parentNode.classList.remove('bg-danger');
        document.getElementById(`answer_${i}`).parentNode.classList.remove('bg-success');
        document.getElementById(`click_${i}`).classList.remove('block-card')
    }
}

function showEndscreen() {
    content = document.getElementById('card-content');
    content.innerHTML = endscreenTemplate();
    completeGameAudio.play();
}

function loadNextQuestion() {
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