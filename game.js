var buttonColours = ["green", "red", "yellow", "blue"];
var userClickedPattern = [];
var gamePattern = [];
var gameStarted = 0;
var level = 0;
var keyPressLeft;

$("h1").on("click", function (event) {
    if (gameStarted == 0) {
        gameStarted = 1;
        nextSequence();
    }
});


$(".btn").on("click", function (event) {
    if (gameStarted === 1) {
        keyPressLeft--;
        var userChosenColour = event.target.id; //get color

        playSound(userChosenColour);
        animatePress(userChosenColour);

        userClickedPattern.push(userChosenColour);

        if (checkAnswer(userClickedPattern.length - 1)) {
            if (keyPressLeft === 0) {
                userClickedPattern = [];
                setTimeout(function () {
                    nextSequence();
                }, 1000);
            }
        }
        else {
            $("h1").text("Game Over: Press Any Key to Restart");

            reset();
            setTimeout(function () {
                var wrong = new Audio("sounds/wrong.mp3");
                wrong.play();
            }, 1000);

        }

    }
});

function checkAnswer(currentLevel) {
    if (userClickedPattern[currentLevel] === gamePattern[currentLevel]) {
        return 1;
    }
    else {
        return 0;
    }
}

function nextSequence() {
    var randomNumber = Math.floor(Math.random() * 4);
    var generatedColor = buttonColours[randomNumber];

    animatePress(generatedColor);
    playSound(generatedColor);

    gamePattern.push(generatedColor);
    level++;
    keyPressLeft = level;

    $("h1").text("Level " + level);
}


function playSound(name) {
    var audio = new Audio("sounds/" + name + ".mp3");
    audio.play();
}

function animatePress(currentColor) {
    $("#" + currentColor).fadeOut(100).fadeIn(100).fadeOut(100).fadeIn(100);
}

function reset() {
    level = 0;
    gameStarted = 0;
    gamePattern = [];
    userClickedPattern = [];
}