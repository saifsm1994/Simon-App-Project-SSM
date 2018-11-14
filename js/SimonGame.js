$(document).ready(function() {
    $('[data-toggle="dropdown"]').dropdown();
});

//List of functions and features
//aIRun makes the ai add a new choice if running is set to 0 && flashes all current aiChoices
//aiSelect is how the ai flashes the choices 
//playsound plays the corresponding sound for each revertColor
//revert color runs at the end and removes the flash class
// doSetTimeout delays the ai flashes so they don't all occur at once   
// verifyNewChoices takes the player click as an input, adds it to a set of player choices, and makes sure it is the right selection else failure
//failure, - if strict resets everything and runs the ai, if not strict resets the player and runs ai
//isOn checks if the on switch is checked else nothing runs



//Global
let c = 1000; //Timing control - reduce number to speed up
let aiChoices = []; // holds the old ai choices
let playerChoices = []; // holds current player choices
let playerStepCount = 0; //tracks how many steps the player has taken
let stricter = 0; //strict mode or not, 0 = off
let running = 0; // prevents double running
let isAiRunning = 0;
let aiStepCounter = 0; // Used to track ai moves, reactivate board once finished
let hasGameStarted = 0; //stops board from working unless game started
//var isSimonOn = 0;



//Operational Functions
//Operational Functions
//Operational Functions
function isOn() {
    if (document.getElementById("onOffSwitch").checked) {
        return true;
    } else {
        return false;
    }
}

//Holds and plays all sounds
function playSound(a) {
    var green = new Audio("https://s3.amazonaws.com/freecodecamp/simonSound1.mp3");
    var red = new Audio('https://s3.amazonaws.com/freecodecamp/simonSound2.mp3');
    var yellow = new Audio("https://s3.amazonaws.com/freecodecamp/simonSound3.mp3");
    var blue = new Audio("https://s3.amazonaws.com/freecodecamp/simonSound4.mp3");
    var winner = new Audio("http://cd.textfiles.com/cdaction/cdaction05a/LORDS2/FILES/FF_CAPT.WAV");
    var loser = new Audio("http://www.acc.umu.se/~snow/ljud/trumpet.wav");

    if (a == "green") {
        green.play();
    }
    if (a == "red") {
        red.play();
    }
    if (a == "yellow") {
        yellow.play();
    }
    if (a == "blue") {
        blue.play();
    }
    if (a == "winner") {
        winner.play();
    }
    if (a == "loser") {
        loser.play();
    }


}



//used to trigger buttons and noise when the ai has selected a button
function aiSelect(a) {
    setTimeout(function() {
        if (a == 0) {
            var greenButton = document.getElementById("0");
            greenButton.classList.add("liteGreen");
            revertColor(greenButton, 'greenButton');
            playSound("green");
        }
        if (a == 1) {
            var redButton = document.getElementById("1");
            //        redButton.click();
            redButton.classList.add("liteRed");
            revertColor(redButton, 'redButton');
            playSound("red");
        }

        if (a == 2) {
            var yellowButton = document.getElementById("2");
            //        yellowButton.click();
            yellowButton.classList.add("liteYellow");
            revertColor(yellowButton, 'yellowButton');
            playSound("yellow");
        }

        if (a == 3) {
            var blueButton = document.getElementById("3");
            //        blueButton.click();
            blueButton.classList.add("liteBlue");
            revertColor(blueButton, 'blueButton');
            playSound("blue");
        }

    }, c+100);
    return;
}


//subFunction runs to undo the trigger from aiSelect
function revertColor(a, b) {
    //    console.log(a);
    setTimeout(function() {
        if (b == "greenButton") {
            a.classList.remove("liteGreen");
        }
        if (b == "redButton") {
            a.classList.remove("liteRed");
        }
        if (b == "yellowButton") {
            a.classList.remove("liteYellow");
        }
        if (b == "blueButton") {
            a.classList.remove("liteBlue");
        }
    }, c-100);

}

function playerClick(a) {
    if (isOn()) {
        //    if(hasGameStarted){
        if (isAiRunning === 0) {
            if (a == 0) {
                var greenButton = document.getElementById("0");
                greenButton.classList.add("liteGreen");
                revertColor(greenButton, 'greenButton');
                playSound("green");
            }
            if (a == 1) {
                var redButton = document.getElementById("1");
                redButton.classList.add("liteRed");
                revertColor(redButton, 'redButton');
                playSound("red");
            }
            if (a == 2) {
                var yellowButton = document.getElementById("2");
                yellowButton.classList.add("liteYellow");
                revertColor(yellowButton, 'yellowButton');
                playSound("yellow");
            }
            if (a == 3) {
                var blueButton = document.getElementById("3");
                blueButton.classList.add("liteBlue");
                revertColor(blueButton, 'blueButton');
                playSound("blue");
            }



        }else{
            alert("please wait your turn")
        }
    }
}
//}



//AI Running functions


//runs all old choices and one new one
function aIRun() {
    if (isOn()) {
        hasGameStarted = 1;
        if (isAiRunning === 0) {
            isAiRunning = 1;
            aiStepCounter = 0;
            //starts if not running
            if (running == 0) {
                var newEntry = Math.floor(Math.random() * 4);
                aiChoices.push(newEntry);
                running = 1;
            }

            var i = 0;


            doSetTimeout(i);

            if (aiStepCounter == aiChoices.length) {
                console.log("player reactivated");
                isAiRunning = 0;
            } else {
                //    console.log(aiStepCounter);
            }


            //    }


            if (aiStepCounter == aiChoices.length) {
                //        console.log("player reactivated");
                isAiRunning = 0;
            }
        }
    }
}

function doSetTimeout(i) {

    setTimeout(function(x) {
        return function() {
            aiSelect(aiChoices[i]);
            aiStepCounter = aiStepCounter + 1;
            if (i < aiChoices.length) {
                i = i + 1;
                doSetTimeout(i);
            }
            if (aiStepCounter == aiChoices.length) {
                //        console.log(c*i);
                isAiRunning = 0;
            }
        };
    }(i), c);


}

//Player Running Functions
function verifyNewChoice(a) {
    if (isOn()) {
        if (hasGameStarted) {
            if (isAiRunning === 0) {
                checkLengthRecord();

                playerChoices.push(a);
                // new choice is added to the list.
                var currentPos = playerChoices.length;
                // this now equals 1 + the legnth of the set.
                currentPos = currentPos - 1;

                //Note only checks the latest value

                if (playerChoices[currentPos] !== aiChoices[currentPos]) {

                    //forces the player to restart from the start
                    failure();
                } else {

                    if (playerChoices.length == aiChoices.length) {
                        playerChoices = [];
                        //if the latest value is equal to the corresponding value in the ai choice set
                        running = 0;
                        // allows for new points to be picked
                        aIRun();
                        //picks a new point
                        checkLengthRecord();
                    }
                }
            } else {}
        }
    }
}

////Unneeded function, rendered moot. Will be removed later //
function checkLengthRecord() {
    updateCounter();
}

function updateCounter() {

    var countValue = document.getElementById('counterDisplayer').placeholder;
    if (playerChoices.length >= countValue) {
        countValueUpdate = aiChoices.length;
        document.getElementById('counterDisplayer').placeholder = countValueUpdate;
        console.log("Highest number of rounds " + countValueUpdate);
    }
    //    console.log(countValue);
    if (countValue >= 4) {
        c = 800;
    }
    if (countValue >= 6) {
        c = 700;
    }
    if (countValue >= 12) {
        c = 600;
    }
    if (countValue >= 15) {
        c = 500;
    }
    if (countValue == 20) {
        playSound("winner");
    }
}

function enablestricter() {
    if (stricter == 0) {
        stricter = 1;
        document.getElementById('lightDisplay').classList.add('greenLight');
    } else {
        stricter = 0;
        document.getElementById('lightDisplay').classList.remove('greenLight');
    }
}

function failure() {
    //    alert("Failure");
    playSound("loser");
    setTimeout(function() {
        if (stricter) {
            aiChoices = [];
            playerChoices = [];
            playerStepCount = [];
            running = 0;
            aIRun();
            var countValue = document.getElementById('counterDisplayer').innerHTML;
            document.getElementById('counterDisplayer').placeholder = 00;
        }

        if (!stricter) {
            playerChoices = [];
            playerStepCount = [];
            aIRun();

        }

    }, 4000)

}

//failure without the noise
function resetter() {
    aiChoices = [];
    playerChoices = [];
    playerStepCount = [];
    running = 0;
    setTimeout(function() {
    var countValue = document.getElementById('counterDisplayer').innerHTML;
    document.getElementById('counterDisplayer').placeholder = "00";
    c = 1000;
    }, c+100)
}