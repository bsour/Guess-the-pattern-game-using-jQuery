var buttonColours = ["red", "blue", "green", "yellow"];
// empty array 
var gamePattern = [];
// empty array
var userClickedPattern = [];

var started = false;

var level = 0;


// detect when a key is pressed and call nextSequence()
$(document).keypress(function() {
    if (!started) {
        $("#level-title").text("Level " + level)
        nextSequence();
        started = true;
    }
});

// function to detect if any buttoms are clicked and trigger the handler function.
$(".btn").click(function() {
    // store the id of the button clicked
    var userChosenColour = $(this).attr("id");
    // add contents from userChosenColour to end of userClickedPattern
    userClickedPattern.push(userChosenColour);

    //play sound when user clicks a button
    playSound(userChosenColour);
    animatePress(userChosenColour);

    checkAnswer(userClickedPattern.length-1);
});

// random number generator
function nextSequence() {
    // empty array ready for next level 
    userClickedPattern = [];
    // increase the level everytime nextSequence() is called 
    level++;
    $("#level-title").text("Level " + level);

    var randomNumber = Math.floor(Math.random() * 4);
    // random color generator
    var randomChosenColour = buttonColours[randomNumber];
    console.log(randomNumber);
    // add random color to game pattern array 
    gamePattern.push(randomChosenColour);

    //  Use jQuery to select the button with the same id as the randomChosenColour
    $("#" + randomChosenColour ).fadeIn(100).fadeOut(100).fadeIn(100);

    // play audio effect for both playing next sequence and when buttons are clicked
    playSound(randomChosenColour);
   

}

function playSound(name) {
     // play audio effect 
     var audio = new Audio("sounds/" + name + ".mp3");
     audio.play();
}

// pressed effects for buttons
function animatePress(currentColour) {
    $("#" + currentColour).addClass("pressed");

    // remoove class 
    setTimeout(function() {
        $("#" + currentColour).removeClass("pressed");
    }, 100);
}

// function to check user input
function checkAnswer(currentLevel) {
    if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {
        console.log("success!");

        if (userClickedPattern.length === gamePattern.length) {
            setTimeout(function () {
                nextSequence();
            }, 1000);
        }
    } else {
        console.log("wrong")
        playSound("wrong");

        // game over 
        $("body").addClass("game-over");
        setTimeout(function () {
            $("body").removeClass("game-over");
        }, 200);

        // chnage the title to game over 
        $("#level-title").text("Game Over, Press any key to resstart");

        // if the user gets sequence wrong then call startOver 
        startOver();
    }
}

// restart the game 
function startOver() {
    
    level = 0;
    gamePattern = [];
    started = false;

}
