var buttonColours = ["red", "blue", "green", "yellow"];
var gamePattern = [];
var userPattern = [];
var level = null;

// Event Listener for clicks

$(".btn").on("click", function (){
    pressAnimation(this.id);
    if(level !== null){
        userPattern.push(this.id);
        checkPattern();
    }else{
        gameOver();
    }
})

$(document).on("keypress", function(){
    if(level === null){
        gameStart();
    }
})

// Game Logic

function gameStart(){
    level = 0;
    gamePattern = [];
    userPattern = [];
    $("body").removeClass("game-over")
    nextLevel();
}

function nextLevel(){
    level++
    userPattern = [];
    $('h1').text("Level "+level);
    var selectedColour = buttonColours[randomNumber()];
    gamePattern.push(selectedColour);
    pressAnimation(selectedColour);
}

function checkPattern(){
    var index = userPattern.length-1;
    if(userPattern[index] === gamePattern[index]){
        if(userPattern.length === gamePattern.length){
            setTimeout(nextLevel, 1000);
        }
    }else{
        gameOver();
    }
}

// Random number generator between 0-3

function randomNumber(){
    var num = Math.floor(Math.random() * 4);
    return num
}

// Sound & flash animation

function pressAnimation(color){
    $("#"+color).toggleClass("pressed")
    setTimeout(function(){
        $("#"+color).toggleClass("pressed")
    },100);
    var audio = new Audio('sounds/'+color+'.mp3');
    audio.volume = 0.3;
    audio.play();
}

function gameOver(){
    level = null
    $("body").addClass("game-over")
    setTimeout(function(){
        $("body").removeClass("game-over");
    }, 200)
    $("h1").text("You lost, press any key to begin");
    var audio = new Audio('sounds/wrong.mp3');
    audio.volume = 0.3;
    audio.play();
}