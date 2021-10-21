const ROCK = "rock",
    PAPER = "paper",
    SCISSORS = "scissors";
    ERROR = "error";
const ROUNDS = 5;

game();

function computerPlay() {
    let selection = "";

    switch (Math.floor(Math.random() * 3)) {
        case 0: 
            selection = ROCK;
            break;
        case 1:
            selection = PAPER;
            break;
        case 2:
            selection = SCISSORS;
            break;
        default:
            break;
    }
    console.log(`PC chooses: ${selection}`);
    return selection;
}

function playRound(playerSelection, computerSelection) {
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
            message = "You win! Congratulations!!";
            break;
        case 2:
            message = "Oh, you missed that...";
            break;
        case -1:
            message = "You need to choose rock paper or scissors. Try again."
            break;
        default:
            break;
        }

    return message;
}

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

function showScore(score) {
    console.log(`PLAYER: ${score[0]}\nCOMPUTER: ${score[1]}`);
}

function showWinner(score) {
    if (score[0] > score [1]) {
        console.log("You WIN!!!")
    } else {
        console.log("You loose...")
    }
}

function game() {
    let input = "";
    let result = -1;
    let score = [0, 0];
    console.log("Game starts");
    for (let i = 0; i < ROUNDS; i++) {
        input = askInput("What do you choose? Rock, paper or scissors?");
        if (!checkInput(input)) {
            input = "error";
        }

        result = playRound(input, computerPlay());
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
                i--;
                break;
            default: 
                break;
        }

        console.log(roundResult(result));
        showScore(score);
    }

    showWinner(score);
    
}