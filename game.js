var buttonColor = ["red", "blue", "green", "yellow"];
var gamePattern = [];
var userClickedPattern = [];

var start = false;
var level = 0;

$(document).keydown(function(){
    if(!start){
        $("#level-title").text("Level "+ level);
        nextSequence();
        start = true;
    }
})


function nextSequence() {
    userClickedPattern = [];

    level++;
    $("#level-title").text("Level "+ level);

    var randomNumber = Math.random();
    randomNumber = randomNumber * 4;
    randomNumber = Math.floor(randomNumber);
    
    var randomChosenColor = buttonColor[randomNumber];
    gamePattern.push(randomChosenColor);
    
    playSound(randomChosenColor);
};



$(".btn").click(function() {
    var userChosenColour = $(this).attr("id");
    userClickedPattern.push(userChosenColour);
    playSound(userChosenColour);
    animatePress(userChosenColour);

    checkAnswer(userClickedPattern.length-1);
});

function playSound(name) {
    $("#" + name).fadeOut(100).fadeIn(100);
    var audio = new Audio("sounds/" + name + ".mp3");
    audio.play();
}

function animatePress(currentColor) {
    $("#"+ currentColor).addClass("pressed");
    setTimeout(function(){
        $("#"+ currentColor).removeClass("pressed");
    }, 100);
}
   
function checkAnswer(currentLevel){
    if(userClickedPattern[currentLevel] === gamePattern[currentLevel]){
        if(userClickedPattern.length === gamePattern.length){
            setTimeout(function(){
                nextSequence();
            }, 1000);
        }
    }
    else {
        var wrong = new Audio("sounds/wrong.mp3");
        wrong.play();
        $("body").addClass("game-over");
        setTimeout(function(){
            $("body").removeClass("game-over");
        }, 200);
        $("h1").text("Game Over, press any key to Restart");
        startOver();
    }
}

function startOver(){
    level = 0;
    start = false;
    gamePattern = [];
}