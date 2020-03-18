let currentPlayer = "";
let canChooseSide = true;
let gameStatus = "choosing";
let currentSteps = 0;

let table = [];
let score_X = 0;
let score_O = 0;


function setPlayers(player) {
    console.log("Chosen");
    if(canChooseSide && gameStatus == "choosing") {
        currentPlayer = player.value;
        canChooseSide = false;
        gameStatus = "chosen";
    }
    else {
        alert("Side is already chosen.");
    }
}

function start_game() {
    if(gameStatus == "chosen") {
        document.getElementById("turn").innerHTML = "Turn: " + currentPlayer;
        document.getElementById("gameArena").classList.remove("opac");
        document.getElementById("gameArena").classList.add("visib");
        gameStatus = "running";
        console.log(gameStatus);
    }
    else if(gameStatus == "running") {
        alert("Side already chosen.");
    }
    else {
        alert("Please choose a side first.");
    }
}

function putValue(cell) {
    if(gameStatus == "running" && gameStatus != "finished") {
        table[cell.id] = currentPlayer;
        cell.innerHTML = currentPlayer;
        currentSteps++;
        if(currentSteps > 4) {
            check_game();
        }
        if(currentPlayer == "X") {
            currentPlayer = "O";
        }
        else {
            currentPlayer = "X";
        }
       
        document.getElementById("turn").innerHTML = "Turn: " + currentPlayer;
    }
}

function check_game() {
    if(table[1] == "X" && table[2] == "X" && table[3] == "X") {
        alert("X Won!!");
        score_X++;
        setScores("X");
        gameStatus = "finished";
        new_game();
    }
    else if(table[4] == "X" && table[5] == "X" && table[6] == "X") {
        alert("X Won!!");
        score_X++;
        setScores("X");
        gameStatus = "finished";
        new_game();
    }
    else if(table[7] == "X" && table[8] == "X" && table[9] == "X") {
        alert("X Won!!");
        score_X++;
        setScores("X");
        gameStatus = "finished";
        new_game();
    }
    else if(table[1] == "X" && table[4] == "X" && table[7] == "X") {
        alert("X Won!!");
        score_X++;
        setScores("X");
        gameStatus = "finished";
        new_game();
    }
    else if(table[2] == "X" && table[5] == "X" && table[8] == "X") {
        alert("X Won!!");
        score_X++;
        setScores("X");
        gameStatus = "finished";
        new_game();
    }
    else if(table[3] == "X" && table[6] == "X" && table[9] == "X") {
        alert("X Won!!");
        score_X++;
        setScores("X");
        gameStatus = "finished";
        new_game();
    }
    else if(table[1] == "X" && table[5] == "X" && table[9] == "X") {
        alert("X Won!!");
        score_X++;
        setScores("X");
        gameStatus = "finished";
        new_game();
    }
    else if(table[3] == "X" && table[5] == "X" && table[7] == "X") {
        alert("X Won!!");
        score_X++;
        setScores("X");
        gameStatus = "finished";
        new_game();
    }
    if(table[1] == "O" && table[2] == "O" && table[3] == "O") {
        alert("O Won!!");
        score_O++;
        setScores("O");
        gameStatus = "finished";
        new_game();
    }
    else if(table[4] == "O" && table[5] == "O" && table[6] == "O") {
        alert("O Won!!");
        score_O++;
        setScores("O");
        gameStatus = "finished";
        new_game();
    }
    else if(table[7] == "O" && table[8] == "O"  && table[9] == "O") {
        alert("O Won!!");
        score_O++;
        setScores("O");gameStatus = "finished";
        new_game();
    }
    else if(table[1] == "O" && table[4] =="O" && table[7] == "O") {
        alert("O Won!!");
        score_O++;
        setScores("O");gameStatus = "finished";
        new_game();
    }
    else if(table[2] == "O" && table[5] == "O" && table[8] == "O") {
        alert("O Won!!");
        score_O++;
        setScores("O");gameStatus = "finished";
        new_game();
    }
    else if(table[3] == "O" && table[6] == "O" && table[9] == "O") {
        alert("O Won!!");
        score_O++;
        setScores("O");gameStatus = "finished";
        new_game();
    }
    else if(table[1] == "O" && table[5] == "O" && table[9] == "O") {
        alert("O Won!!");
        score_O++;
        setScores("O");gameStatus = "finished";new_game();

    }
    else if(table[3] == "O" && table[5] == "O" && table[7] == "O") {
        alert("O Won!!");
        score_O++;
        setScores("O");gameStatus = "finished";
        new_game();
    }
    else if(currentSteps == 9) {
       alert("Game is Draw.");gameStatus = "finished";
       new_game();
    }
}

function setScores(playaa) {
    if(playaa == "X") {
        
       // document.getElementById("scoreX").style.textDecoration = "none";
        document.getElementById("scoreX").innerHTML = score_X;
       
    }
    else if(playaa == "O") {
      //  document.getElementById("scoreO").style.textDecoration = "none";
        document.getElementById("scoreO").innerHTML = score_O;
    }
}

function new_game() {
    let cells = document.getElementsByClassName("cell");
    for(let i = 0; i < 9; ++i) {
        cells[i].innerHTML = "";
        gameStatus = "choosing";
        canChooseSide = true;
        table = [];
        currentPlayer = "";
        currentSteps = 0;
        document.getElementById("gameArena").classList.add("opac");
        document.getElementById("gameArena").classList.remove("visib");
        document.getElementById("turn").innerHTML = "Turn: ";
    }
    alert("Choose Players again and start game.");
}