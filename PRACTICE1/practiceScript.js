const QUESTIONS = [
{
id: 1,
type: 'radio', 
question: 'What is three-fifths of <span class="underlined">100</span>?',
options: [
{ text: '7', value: '0', isCorrect: false },
{ text: '60', value: '1', isCorrect: true },
{ text: '25', value: '0', isCorrect: false }
],
correctAnswer: '60'
},

{
id: 2,
type: 'radio',
question: 'If x<sup>2</sup>=169, what is the value of <span class="underlined">x</span>?',
options: [
{ text: '338', value: '0', isCorrect: false },
{ text: '169', value: '0', isCorrect: false },
{ text: '13', value: '1', isCorrect: true }
],
correctAnswer: '13'
},

{
id: 3,
type: 'radio',
question: 'What is <span class="underlined">7%</span> equal to?',
options: [
{ text: '0.07', value: '1', isCorrect: true },
{ text: '0.007', value: '0', isCorrect: false },
{ text: '0.7', value: '0', isCorrect: false }
],
correctAnswer: '0.07'
},

{
id: 4,
type: 'text',
question: 'Cameron took 4 tests, and his scores were as follows: 100, 60, 80, and 30. <br>Cameron took another test that was scored x. <br>The mean score of the 5 tests he took is 72. <br>What is the value of x?',
correctAnswer: '90'
}
];

const startButton = document.getElementById('startButton');
const testArea = document.getElementById('testArea');
const questionArea = document.getElementById('questionArea');
const optionsContainer = document.getElementById('optionsContainer');
const questionNumber = document.getElementById('questionNumber');
const submitAndCheckButton = document.getElementById('submitAndCheckButton');
const nextButton = document.getElementById('nextButton');
const restartButton = document.getElementById('restartButton');
const scoreDisplay = document.getElementById('scoreDisplay');
const resultElement = document.getElementById('result');
const finishButton = document.getElementById('finishButton');
const finalScore = document.getElementById('finalScore');
const finishArea = document.getElementById('finishContainer');

let score = 0;
let currentQuestionIndex = 0;

startButton.addEventListener('click', startTest);

submitAndCheckButton.addEventListener('click', checkAnswer);
nextButton.addEventListener('click', nextQuestion);
finishButton.addEventListener('click', finishTest);
restartButton.addEventListener('click', restartTest);

function startTest() {
    testArea.style.display = 'none';
    finishArea.style.display = 'none';
    questionArea.style.display = 'block';

    score = 0;
    currentQuestionIndex = 0;

    renderQuestions();
    showQuestion();
}

function renderQuestions() {
    optionsContainer.innerHTML = '';

    QUESTIONS.forEach((question) => {
        const questionElement = document.createElement('div');
        questionElement.id = `question` + question.id;
        questionElement.className = 'question';
        questionElement.style.display = 'none';

        if (question.type === 'radio') {
            let optionsHtml = '';

             question.options.forEach((option) => {
                optionsHtml += `
                    <label class="radio">
                        <input type="radio" name="q${question.id}" value="${option.isCorrect ? 1 : 0}">
                        ${option.text}
                    </label>
                `;
            });

            questionElement.innerHTML = `
                <h3 class="questionText">` + question.question + `</h3>
                <div class="optionsInner">` + optionsHtml +
                `</div>
            `;

        } else if (question.type === 'text') {
            questionElement.innerHTML = `
                <h3 class="questionText">` + question.question + `</h3>
                <div class="writtenAnswerQuestion">
                    <input type="text" class="answerBox">
                </div>
            `;
        }

        optionsContainer.appendChild(questionElement);
    });
}

function checkAnswer() {

    const question = QUESTIONS[currentQuestionIndex];
    const questionElement = document.getElementById(`question${question.id}`);

    let isCorrect = false;

    if (question.type === 'radio') {

        const checked = questionElement.querySelector('input[type="radio"]:checked');

        if (!checked) {
            showMessage('Please, answer the question', 'orange');
            return;
        }

        isCorrect = checked.value === '1';

        questionElement.querySelectorAll('input[type="radio"]').forEach(input => {
            input.disabled = true;
        });
    }

    if (question.type === 'text') {

        const input = questionElement.querySelector('.answerBox');

        if (!input.value.trim()) {
            showMessage('Please, answer the question', 'orange');
            return;
        }

        isCorrect = input.value.trim() === question.correctAnswer;

        input.disabled = true;
    }

    if (isCorrect) {
        score++;
        showMessage('Correct!', 'green');
    } else {
        showMessage('Wrong, please try again next time', 'red');
    }

    submitAndCheckButton.style.display = 'none';

    if (currentQuestionIndex < QUESTIONS.length - 1) {
        nextButton.style.display = 'block';
    } else {
        finishButton.style.display = 'block';
    }

}

function showQuestion() {

    document.querySelectorAll('.question').forEach(q => {
        q.style.display = 'none';
    });

    const currentQuestion = QUESTIONS[currentQuestionIndex];
    const questionElement = document.getElementById(`question` + currentQuestion.id);

    questionElement.style.display = 'flex';

    questionNumber.textContent = `Question ` + (currentQuestionIndex + 1);

    submitAndCheckButton.style.display = 'block';
    nextButton.style.display = 'none';
    finishButton.style.display = 'none';

    resultElement.textContent = '';

    const radios = questionElement.querySelectorAll('input[type="radio"]');
    radios.forEach(input => {
        input.disabled = false;
        input.checked = false;
    });

    const textInput = questionElement.querySelector('.answerBox');
    if (textInput) {
        textInput.disabled = false;
        textInput.value = '';
    }
}


function nextQuestion() {
    currentQuestionIndex++;
    showQuestion();
}

function finishTest() {
    questionArea.style.display = 'none';
    finishArea.style.display = 'flex';
    finalScore.textContent = `${score} / ${QUESTIONS.length}`;
    finalScore.style.fontSize = '30px';
}

function restartTest() {
    optionsContainer.innerHTML = '';

    score = 0;
    currentQuestionIndex = 0;

    testArea.style.display = 'flex';
    questionArea.style.display = 'none';
    finishArea.style.display = 'none';
}

function showMessage(text, color) {
    resultElement.textContent = text;
    resultElement.style.color = color;
    resultElement.style.fontWeight = '800';
}