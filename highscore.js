var highScore = document.querySelector("#highScore");
var clear = document.querySelector("#clear");

// This will make the clear button work 
clear.addEventListener("click", function () {
    localStorage.clear();
    location.reload();
});
// This is how we get past scores and store them 
var scoreBoard = localStorage.getItem("scoreBoard");
scoreBoard = JSON.parse(scoreBoard);

if (scoreBoard !== null) {

    for (var i = 0; i < scoreBoard.length; i++) {

        var createLi = document.createElement("li");
        createLi.textContent = scoreBoard[i].initials+ " " + scoreBoard[i].score;
        highScore.append(createLi);

    }
}