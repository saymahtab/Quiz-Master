let Questions = [];
let currentQuestion = 0;
let score = 0;

let quesTag = document.getElementById("ques");

async function fetchQuestions(){
    try {
        const resp = await fetch("https://opentdb.com/api.php?amount=10");
        if(!resp.ok){
            throw new Error("Couldn't Fetch questions!")
        }
        const data = await resp.json();
        Questions = data.results;   
        loadQues();  // Load the first question after fetching
    }
    catch(err){
        console.error(err);
        quesTag.innerHTML = `<h">${err}</h5>`;
    }
}

if(Questions.length === 0){
    quesTag.innerHTML = `<h5>Please Wait, Questions are loading....</h5>`;
}

function loadQues() {
    if (Questions.length === 0) {
        return;
    }

    const opt = document.getElementById('opt');

    let currQuesText = Questions[currentQuestion].question;

    quesTag.innerText = currQuesText;

    opt.innerHTML = "";
    const correctAnswer = Questions[currentQuestion].correct_answer;
    const incorrectAnswers = Questions[currentQuestion].incorrect_answers;

    const options = [correctAnswer, ...incorrectAnswers];

    options.sort(() => Math.random() - 0.5);

    options.forEach((option) => {
        const optDiv = document.createElement('div');
        const optionTag = document.createElement('input');
        const labelTag = document.createElement('label');

        optionTag.type = 'radio';
        optionTag.name = "answer";
        optionTag.value = option;

        labelTag.textContent = option;

        optDiv.appendChild(optionTag);
        optDiv.appendChild(labelTag);

        opt.appendChild(optDiv);
    });
}

function checkAnswer(){
    const selectedAns = document.querySelector(`input[name="answer"]:checked`);
    if (!selectedAns) {
        alert("Please select an answer!");
        return;
    }

    const selectAnsValue = selectedAns.value;
    if(selectAnsValue === Questions[currentQuestion].correct_answer){
        score++;
    }
    nextQuestion();
}

function nextQuestion(){
    if(currentQuestion < Questions.length - 1){
        currentQuestion++;
        loadQues();
    } else{
        document.getElementById("opt").remove();
        document.getElementById("ques").remove();
        document.getElementById("btn").remove();
        showTotal();
    }  
}

function showTotal(){
    const totalScore = document.querySelector('#score');
    totalScore.innerHTML = `<h3>Your Score: ${score}/10</h3>`;
    Questions.forEach((ques, indx) => {
        totalScore.innerHTML += `<p>${indx + 1}: ${ques.correct_answer}</p>`;
    });
}

fetchQuestions();
