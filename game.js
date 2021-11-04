const ROCK = "rock",
    PAPER = "paper",
    SCISSORS = "scissors";
    ERROR = "error";
const ROUNDS = 5;

const BUTTONS = document.querySelectorAll(".butGame");
const PC_SELECT = document.querySelectorAll(".pcSelection");

const GAME_MAIN_DIV = document.querySelector(".gameMainDiv");

const SCORE_P = [
    document.querySelector("#playerScore"),
    document.querySelector("#pcScore")
];

const RESULT_DIV = document.querySelector(".resultDiv");
const RESULT_P = document.querySelector("#resultMsg");
const RESET_BUTTON = document.querySelector("#butReset");

let score = [0, 0];


BUTTONS.forEach(button => {
    button.addEventListener('click', (e) => {
        resetSelection();
        startRound(selectButton(button));
    });
});

RESET_BUTTON.addEventListener('click', (e) => resetGame());

function startRound(playerSelection) {
    let result = -1;

    console.log("Player select: " + playerSelection);
    result = findWinner(playerSelection, computerPlay());
    switch (result){
        case 1:
            score[0]++;
            break;
        case 2:
            score[1]++;
            break;
        case -1: 
        case 0:
        //Repeating round
            break;
        default: 
            break;
    }

    console.log(roundResult(result));
    RESULT_DIV.style.display = "flex";
    RESULT_P.style.display = "inline";
    RESET_BUTTON.style.display = "none";
    RESULT_P.textContent = roundResult(result);
    
    updateScore();

    if(checkScore()) {
        showWinner();
    }    
}

function findWinner(playerSelection, computerSelection) {
    console.log("Round starts");
    let result = -1;
    if (playerSelection === ERROR) {    
        result = -1;
    } else if (playerSelection === computerSelection) {
        result = 0;
    } else if (
        playerSelection === ROCK && computerSelection === SCISSORS ||
        playerSelection === PAPER && computerSelection === ROCK ||
        playerSelection === SCISSORS && computerSelection === PAPER
    ){
        result = 1;
    } else {
        result = 2;
    }
    
    return result;
}

function roundResult(result) {
    switch (result) {
        case 0:
            message = "It's a tie. Try again.";
            break;
        case 1:
            message = "You win!";
            break;
        case 2:
            message = "Oh, you missed that...";
            break;
        case -1:
            message = "You must choose rock paper or scissors. Try again."
            break;
        default:
            break;
        }

    return message;
}

function updateScore() {
    console.log(`PLAYER: ${score[0]}\nCOMPUTER: ${score[1]}`);
    SCORE_P[0].textContent = score[0];
    SCORE_P[1].textContent = score[1]; 
}

function showWinner() {
    if (score[0] > score [1]) {
        msg = "You have WON!!! Congratulations!!";
    } else {
        msg = "You have lost...";
    }

    RESULT_P.textContent = msg;
    
    GAME_MAIN_DIV.style.display = "none";  
    RESULT_DIV.style.display = "flex";
    /*RESULT_P.style.display = "flex";*/
    RESET_BUTTON.style.display = "inline";
}

function checkScore() {
    let ended = false;
    if (score[0] === 5 || score[1] === 5) {
        ended = true;
    }

    return ended;
}

function resetGame() {
    score[0] = 0;
    score[1] = 0;
    updateScore();
    GAME_MAIN_DIV.style.display = "flex";  
    RESULT_DIV.style.display = "none";
    /*RESULT_P.style.display = "none";
    RESET_BUTTON.style.display = "none";*/
    
}

function selectButton(button) {
    let selection = "ERROR";

    switch(button.id) {
        case 'butRock':
            selection = ROCK;
            break;
        case 'butPaper':
            selection = PAPER;
            break;
        case 'butScissors':
            selection = SCISSORS;
            break;
        default:break;
    }

    return selection;
}

function computerPlay() {
    let selection = "";
    
    switch (Math.floor(Math.random() * 3)) {
        case 0: 
            selection = ROCK;
            PC_SELECT[0].classList.add("selected");
            break;
        case 1:
            selection = PAPER;
            PC_SELECT[1].classList.add("selected");
            break;
        case 2:
            selection = SCISSORS;
            PC_SELECT[2].classList.add("selected");
            break;
        default:
            break;
    }
    console.log(`PC chooses: ${selection}`);
    
    return selection;
}

function resetSelection() {
    PC_SELECT.forEach(element => {
        console.log("reset");
        element.classList.remove("selected");
    });
}


/* NOT ON USE
function askInput(message) {
    return prompt(message).toLowerCase();
}

function checkInput(input) {
    let check = false;
    if (input === ROCK || input === PAPER || input === SCISSORS) {
        check = true;
    }

    return check;
}
*/
