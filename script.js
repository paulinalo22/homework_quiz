var questions = [
    {
        exam: "In the movie Trainspotting 💉, what is Sick Boy obsessed with (besides heroin 💀)?",
        answers: ["James Bond", "The Man from U.N.C.L.E", "The Bourne Identity", "bicycles"],
        correctAnswer: "James Bond"
    },

    {
        exam: "In the movie 2001: A Space Odyssey 🚀, what is HAL 9000 🔴?",
        answers: ["an android", "a cyborg", "an A.I computer", "a chimp"],
        correctAnswer: "an A.I computer"
    },

    {
        exam: "In the movie What We Do in the Shadows 🧛🏻‍♂️, what is the basgetti made of 🍝?",
        answers: ["worms", "human blood", "pasta", "sweet delicious carrots"],
        correctAnswer: "worms"
    },

    {
        exam: "In the movie Roman Holiday 🇮🇹, which actor is Audrey Hepburn's romantic interest 🥰?",
        answers: ["Marlon Brando", "Kirk Douglas", "Henry Fonda", "Gregory Peck"],
        correctAnswer: "Gregory Peck"
    },

    {
        exam: "In the TV show Arrested Development 🍌, where is there always money 🤑?",
        answers: ["in the bank", "in the banana stand", "in the model home", "in the banana restaurant"],
        correctAnswer: "in the banana stand"
    },

    {
        exam: "In the TV show F.R.I.E.N.D.S 🦞, who is going to write everyday to 15 Yemen Road, Yemen 📝?",
        answers: ["Janice", "Kathy", "Monica", "Muriel"],
        correctAnswer: "Janice"
    },

    {
        exam: "In the TV show The Office 📞, who is Kelly Kapoor 🛍️?",
        answers: ["the gabagool", "the bushiest beaver", "the business b*tch", "prison Mike's girlfriend"],
        correctAnswer: "the business b*tch"
    }
];

var quizScore = 0;
var questionIndex = 0;

var startBtn = document.querySelector('#start-btn');
var questionDiv = document.querySelector("#questionsDiv");
var wrapper = document.querySelector("#wrapper");
var currentTime = document.querySelector("#currentTime");

var timeRemaining = 60;
var wrong = 10;
var interval = 0;

var ulCreate = document.createElement("ul");

//This will hopefully get the timer to work 
startBtn.addEventListener("click", function () {
    if (interval === 0) {
        interval = setInterval(function () {
            timeRemaining--;
            currentTime.textContent = "Time: " + timeRemaining;

            if (timeRemaining <= 0) {
                clearInterval(interval);
                fin();
                newDiv.textContent = "PUT DOWN YOUR MICE!"
            }
        }, 1000);
    }
    showQuestion(questionIndex);
})

function showQuestion(questionIndex) {
    questionDiv.innerHTML = "";
    ulCreate.innerHTML = "";

    for (var i = 0; i < questions.length; i++) {
        var userQuestion = questions[questionIndex].exam;
        var userAnswers = questions[questionIndex].answers;
        questionDiv.textContent = userQuestion;
    }

    userAnswers.forEach(function (newEl) {
        var showAnswers = document.createElement("li");
        showAnswers.textContent = newEl;
        questionDiv.appendChild(ulCreate);
        ulCreate.appendChild(showAnswers);
        showAnswers.addEventListener("click", (tracking));
    })
}
//This is how we dirrentiate between right and wrong answers. 
function tracking(event) {
    var choice = event.target;

    if (choice.matches("li")) {
        
        var newDiv = document.createElement("div");
        newDiv.setAttribute("id", "newDiv");

//This is how the user can see if the question is right or wrong
        if (choice.textContent === questions[questionIndex].correctAnswer) {
            quizScore++;
            newDiv.textContent = "Correct!"
        } else {
            timeRemaining = timeRemaining - wrong;
            newDiv.textContent = "Wrong! -10 seconds"
        }
    }

    questionIndex++;
    if (questionIndex >= questions.length) {
        fin();
        newDiv.textContent = "The quiz has ended!";
    } else {
        showQuestion(questionIndex);
    }
    questionDiv.appendChild(newDiv);
}
//Here you can save your high score
function fin() {
    questionDiv.innerHTML = "";
    currentTime.style.display = "none";
    var endGameH1 = document.createElement("h1");
    endGameH1.setAttribute("id", "endGameH1");
    endGameH1.textContent = "Fact: this quiz has terminated"

    questionDiv.appendChild(endGameH1);

//Here you'll be able to see your high score 
    var endGameP = document.createElement("p");
    endGameP.setAttribute("id", "endGameP");
    endGameP.textContent = "Your final score is " + quizScore;

    questionDiv.appendChild(endGameP);
    
//Here you can put your initials
    var newLabel = document.createElement("label");
    newLabel.setAttribute("id", "newLabel");
    newLabel.textContent = "Enter your initials: ";

    questionsDiv.appendChild(newLabel);

    var newInput = document.createElement("input");
    newInput.setAttribute("type", "text");
    newInput.setAttribute("id", "tag");
    newInput.textContent = "";

    questionsDiv.appendChild(newInput);

//Here you can send score to scoreboard and it will hopefully store it 
    newSubmit
    var newSubmit = document.createElement("button");
    newSubmit.setAttribute("type", "submit");
    newSubmit.setAttribute("id", "submit");
    newSubmit.textContent = "Submit";

    questionsDiv.appendChild(newSubmit);
    newSubmit.addEventListener("click", function () {
        var initials = newInput.value;

        if (initials === null) {

            console.log("Invalid Response");

        } else {
            var finalScore = {
                initials: initials,
                score: quizScore,
            }
            console.log(finalScore);
            var scoreBoard = localStorage.getItem("scoreBoard");
            if (scoreBoard === null) {
                scoreBoard = [];
            } else {
                scoreBoard = JSON.parse(scoreBoard);
            }
            scoreBoard.push(finalScore);
            var newScore = JSON.stringify(scoreBoard);
            localStorage.setItem("scoreBoard", newScore);
            window.location.replace("highscores.html");
        }
    });

}