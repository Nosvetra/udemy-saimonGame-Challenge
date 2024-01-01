let userClickedPatern = [];
let gamePattern = [];
let buttonColors =["red","blue","green","yellow"] ;
let started = false ;
let level = 0;

function nextSequence(){
    let randomNumber = Math.floor(Math.random()*4);
    playSound(buttonColors[randomNumber]);
    let randomChooseColor = buttonColors[randomNumber];
    gamePattern.push(randomChooseColor);
    $("#"+randomChooseColor).fadeOut(50).fadeIn(50);
    level++;
    $("#level-title").text("Level " + level);
}

function playSound(name){
    switch (name){
        case "red":
            let redMusic = new Audio("./sounds/red.mp3");
            redMusic.play();
            break;
        case "blue":
            let blueMusic = new Audio("./sounds/blue.mp3");
            blueMusic.play();
            break;
        case "green":
            let greenMusic = new Audio("./sounds/green.mp3");
            greenMusic.play();
            break;
        case "yellow":
            let yellowMusic = new Audio("./sounds/yellow.mp3");
            yellowMusic.play();
            break;
        default:
            break;
    }
}
    // animation func
function animatePress(currentColor){
    $("#"+currentColor).addClass("pressed");
    setTimeout(function(){
        $("#"+currentColor).removeClass("pressed");
    },100);
}


    // When user click 
$(".btn").click(function(event){
    let userChosenId = event.target.id;
    userClickedPatern.push(userChosenId);
    playSound(event.target.id);
    animatePress(userChosenId);
    checkAnswer(userClickedPatern.length - 1);
});


//  Start GAme
$(document).keydown(function(keypress){
    if (!started){
        // $("#level-title").text("Level " + level);
        console.log(keypress);
        nextSequence();
        started = true;
    }

});

function checkAnswer(currentLevel){
    if (userClickedPatern[currentLevel] === gamePattern[currentLevel]){
        if(userClickedPatern.length === gamePattern.length){
            console.log("success");
            setTimeout(function(){
                nextSequence();
                userClickedPatern = [];
            },1000);
        }
        
    }else{
        startOver();
        let wrongMusic = new Audio("./sounds/wrong.mp3");
        wrongMusic.play();
        $("body").addClass("game-over");
        setTimeout(function(){
            $("body").removeClass("game-over");
        },200); 
        $("#level-title").text("Game Over, Press Any Key to Restart");
    }
} 


function startOver(){
    level = 0;
    gamePattern = [];
    started = false;
}
