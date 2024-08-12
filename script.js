let Questions = [];
let currentQuestion = 0;
let score = 0;

let quesTag = document.getElementById("ques");

async function fetchQuestions(){
    try {
        const resp = await fetch("https://opentdb.com/api.php?amount=10");
        if(!resp.ok){
            throw new Error("Could'nt Fetch qstions!");
        }
        const data = await resp.json();
        Questions = data.results;   
    }
    catch(err){
        console.error(err);
        ques.innerHTML = `<h5 style="background-color:"red">${err}</h5>`;
    }
}

if(Questions.length == 0){
    ques.innerHTML = ` <h5 style="background-color:"red"">Please Wait Questions are loading....</h5>`;
}

function loadQues() {

    const opt = document.getElementById('opt');

    let currQuesText = Questions[currentQuestion].question;

    quesTag.innerText = currQuesText;

    opt.innerHTML = "";
    const correctAnswer = Questions[currentQuestion].correct_answer;
    const incorrectAnswers = Questions[currentQuestion].incorrect_answers;

    const options = [correctAnswer, ...incorrectAnswers];

    options.sort(() => Math.random() - 0.5);

    options.forEach((option ) => {
        const optDiv = document.createElement('div');
        const optionTag = document.createElement('input');
        const labelTag = document.createElement('label');

        optionTag.type = 'radio';
        // optionTag.name = option${idx};
        optionTag.name = "answer";
        optionTag.value = option;

        labelTag.textContent = option;
        // labelTag.htmlFor = option${idx};

        optDiv.appendChild(optionTag);
        optDiv.appendChild(labelTag);

        opt.appendChild(optDiv);
    });
}


setTimeout(() => {
    loadQues();
    if(Questions.length == 0){
        ques.innerHTML = ` <h5 style="background-color:"yellow"">Wait for the content to load / Please try  Again!!</h5>`
    }
} ,2000);



function checkAnswer(){
   const selectAns = document.querySelector(
    `input[name="answer"]:checked`
   ).value;
   if(selectAns === Questions[currentQuestion].correct_answer){
    score++;
   }
   nextQuestion();

}
function nextQuestion(){
    if(currentQuestion < Questions.length -1){
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
    totalScore.innerHTML = `<h3>Your Score :${score}/10</h3>`;
    Questions.forEach(( ques , indx ) => {
       totalScore.innerHTML +=`
       <p>
       ${indx+1 }: ${ ques.correct_answer}
       </p>
       `;
    });
}

fetchQuestions();