data.getData().then(function (question) {
    let uniqueCat = [];
    for (let i = 0; i < question.length; i++) {
        if (uniqueCat.indexOf(question[i].category) === -1) {
            uniqueCat.push(question[i].category);

        }
    }
    //    let uniqueCat = Array.from(new Set(question.map(e => e.category)));
    //    let uniqueCat = [...new Set(question.map(e => e.category))];
    displayButtons(uniqueCat);
});


function displayButtons(cats) {
    let startDiv = document.querySelector('.start');
    let all = document.createElement('button');
    all.innerHTML = "all";
    all.style.backgroundColor = "red";
    all.onclick = selectCategory;
    startDiv.appendChild(all);
    cats.forEach(cat => {
        let newButton = document.createElement('button');
        newButton.innerHTML = cat;
        newButton.onclick = selectCategory;
        startDiv.appendChild(newButton);

    })
}

function selectCategory() {
    let cat = this.innerHTML;
    data.selectCategory(cat).then(questions => {
        let quiz = new Quiz(questions);

        myQuiz(quiz);
    })
}

function myQuiz(quiz) {
    let mainH = document.querySelector('h1');
    let optionDiv = document.querySelector('.options');
    let options = document.querySelectorAll('.option');
    let footer = document.querySelector('footer p');
    let startDiv = document.querySelector('.start');
    let quizDiv = document.querySelector('.quiz');
    startDiv.style.display = "none";
    quizDiv.style.display = "block";

    function askQuestion() {
        let currentQuestions = quiz.getQuestion();
        let counter = quiz.currentIndex;
        footer.innerHTML = `Question ${counter + 1} od ${quiz.questions.length}`;
        mainH.innerHTML = currentQuestions.text;


        quiz.getRandomOptions().forEach((element, i) => {
            options[i].innerHTML = element;
            options[i].onclick = function () {
                checkAnswer(this.innerHTML);
            }
           
        });
    }
    function checkAnswer(answer) {
        quiz.checkAnswer(answer);
        if (!quiz.isEnd()) {
            askQuestion();
        } else {
            optionDiv.innerHTML = quiz.score;

        }
    }
    askQuestion();


};