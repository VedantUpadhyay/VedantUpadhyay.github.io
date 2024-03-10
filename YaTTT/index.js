"use strict";

//globals
let board = [
    [undefined, undefined, undefined],
    [undefined, undefined, undefined],
    [undefined, undefined, undefined]
];

let currentPlayer = "X";

let diffultyLevels = {
    ez: 2,
    med: 4,
    hd: 6
};

let difficultyChosen = undefined;

async function showMessage(message) {
    var messageBox = document.getElementById("message");
    messageBox.textContent = message;
    messageBox.classList.toggle("hidden");
    setTimeout(() => {
        messageBox.classList.toggle("hidden");
    }, 1500);
}

async function isGameOver(OnlyCheckState = false) {
    let filled = 0;

    //check rows & cols
    for(var i = 0; i < 3; ++i) {
        if(board[i][0] !== undefined && board[i][0] == board[i][1] && board[i][1] == board[i][2]) {
            if(!OnlyCheckState) {
                //alert(board[i][0] + " won!!");
                await showMessage(board[i][0] + " won!!");
            }
            
            return board[i][0];
        }
        if(board[0][i] !== undefined && board[0][i] === board[1][i] && board[1][i] === board[2][i]) {
            if(!OnlyCheckState) {
                // alert(board[0][i] + " won!!");
                await showMessage(board[0][i] + " won!!");
            }
            return board[0][i];
        }

        if(board[i][0] !== undefined) filled++;
        if(board[i][1] !== undefined) filled++;
        if(board[i][2] !== undefined) filled++;
    }

    //check diag
    if(board[0][0] !== undefined && board[0][0] == board[1][1] && board[1][1] == board[2][2]) {
        if(!OnlyCheckState) {
            // alert(board[0][0] + " won!!");
            await showMessage(board[0][0] + " won!!");
        }
        return board[0][0];
    }

    if(board[0][2] !== undefined && board[0][2] == board[1][1] && board[1][1] == board[2][0]) {
        if(!OnlyCheckState) {
            // alert(board[0][2] + " won!!");
            await showMessage(board[0][2] + " won!!");
        }
        return board[0][2];
    }
    
    if(filled === 9) {
        if(!OnlyCheckState) {
            // alert("Match drawn!");
            await showMessage("Match drawn!");
        }
        return 0; 
    }

}

async function startNewGame() {
    for(var i = 0; i < 3; ++i) {
        for(var j = 0; j < 3; ++j) {
            board[i][j] = undefined;
            await updateMove(undefined, undefined, i, j);
        }
    }
    currentPlayer = "X";
}

async function updateMove(player, cellId, ROW = undefined, COL = undefined) { 
    let row = ROW === undefined ? Math.floor((cellId - 1) / 3) : ROW;
    let col = COL === undefined ? (cellId - 1) % 3 : COL;

    if(board[row][col] !== undefined) {
        return false;
    }

    board[row][col] = player;
    if(cellId === undefined) {
        cellId = row * 3 + col + 1;
    }
    var update = async () => {
        document.getElementById(cellId).textContent = player;
    };

    await update();
    return true;
}

async function minimax(player, isMaximizing, depth) {
    //check if game is over
    let winner = await isGameOver(true);
    if(winner === 0 || diffultyLevels[difficultyChosen] === depth) return 0;
    if(winner === "O") return 1 / depth;
    if(winner === "X") return -1 / depth;

    if(isMaximizing) {
        let maxScore = -Infinity;
        for(var i = 0; i < 3; ++i) {
            for(var j = 0 ;j < 3; ++j) {
                if(board[i][j] === undefined) {
                    board[i][j] = player;
                    maxScore = Math.max(maxScore,await minimax(player === "X" ? "O" : "X", false, depth + 1));
                    board[i][j] = undefined;
                }
            }
        }
        return maxScore;
    }
    else {
        let minScore = Infinity;
        for(var i = 0; i < 3; ++i) {
            for(var j = 0; j < 3; ++j) {
                if(board[i][j] === undefined) {
                    board[i][j] = player;
                    minScore = Math.min(minScore,await minimax(player === "X" ? "O" : "X", true, depth + 1));
                    board[i][j] = undefined;
                }
            }
        }

        return minScore;
    }
}

async function pickNextMove(player) {
    //look over all empty places and check if it is the best
    let maxScore = -Infinity;
    let move = [-1, -1];

    for(var i = 0; i < 3; ++i) {
        for(var j = 0 ;j < 3; ++j) {
            if(board[i][j] === undefined) {
                board[i][j] = player;
                let score = await minimax(player === "X" ? "O" : "X", false, 1);
                if(score > maxScore) {
                    maxScore = score;
                    move[0] = i;
                    move[1] = j;
                }
                board[i][j] = undefined;
            }
        }
    }

    if(move[0] > -1 && move[1] > -1) {
        await updateMove(player, undefined, move[0], move[1]);
    }
    let winner = await isGameOver();
    if(winner === 0 || winner === "X" || winner === "O") {
        currentPlayer = undefined;
        await setTimeout(async () => {
            await startNewGame();
        }, 1500);
    }
}

document.addEventListener("DOMContentLoaded", function() {
    document.querySelectorAll(".cell").forEach((x) => x.addEventListener("click", async function () {
        if(currentPlayer !== "X" && currentPlayer !== "O") return;
        if(difficultyChosen === undefined) {
            await showMessage("Please select a difficulty to start a game");
            return;
        }

        if(await updateMove(currentPlayer, this.id)) {
            let winner = await isGameOver();

            if (winner !== 0 && winner !== "X" && winner !== "O") {
                await pickNextMove(currentPlayer === "X" ? "O" : "X");
            }
            else {
                currentPlayer = undefined;
                setTimeout(async () => {
                    await startNewGame();
                }, 1000);
            }
        }
    }))

    document.getElementById("new-game-btn").addEventListener("click", async function () { 
        await startNewGame();
    });

    document.querySelectorAll("#difficulties .btn").forEach((x) => {
        x.addEventListener("click", async function(){
            var difficulty = this.id;
            if(diffultyLevels[difficulty] === undefined) return;

            if(difficultyChosen !== undefined) {
                document.getElementById(difficultyChosen).classList.remove("btn-selected");
            }

            difficultyChosen = difficulty;
            document.getElementById(difficultyChosen).classList.add("btn-selected");
            await startNewGame();
        });
    })
});