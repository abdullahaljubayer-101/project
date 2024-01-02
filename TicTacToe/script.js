const playerDetails = document.getElementById("player-details");
const playerXNameInput = document.getElementById("player-X-nameInput");
const playerONameInput = document.getElementById("player-O-nameInput");
const scoreDetails = document.getElementById("score-details");
const playerXNameScore = document.getElementById("player-X-nameScore");
const playerONameScore = document.getElementById("player-O-nameScore");
const startButton = document.getElementById("start-button");
const endButton = document.getElementById("end-button");
const againButton = document.getElementById("again-button");
const turnDetails = document.getElementById("turn-details");
const rowContainer = document.getElementById("row-container");

let scoreDB = [];
let TicTacToeDB;

setDefaultDB();
setDefaultDetails();

function setDefaultDB() {
    getScore();

    if (scoreDB == null) {
        scoreDB = [];
        scoreDB.push({
            playerX: {
                name: "",
                score: 0,
            },
            playerO: {
                name: "",
                score: 0,
            },
            turn: 0,
        });

        scoreDB.at(0).turn = parseInt((Math.random() * 10) % 2);

        setScore();
    }

    getTicTacToeDB();

    if (TicTacToeDB == null) {
        TicTacToeDB = Array(9).fill(null);
        setTicTacToeDB();
    }
}

function setDefaultDetails() {
    if (scoreDB.at(0).playerX.name != "" && scoreDB.at(0).playerO.name != "") {
        playerDetails.style.display = "none";
        startButton.style.display = "none";
        scoreDetails.style.display = "flex";
        endButton.style.display = "flex";
        turnDetails.style.display = "flex";

        if (scoreDB.at(0).turn == 0) {
            turnDetails.innerHTML = "It's " + scoreDB.at(0).playerX.name + "'s Turn";
        } else {
            turnDetails.innerHTML = "It's " + scoreDB.at(0).playerO.name + "'s Turn";
        }

        playerXNameScore.innerHTML = scoreDB.at(0).playerX.name + "(X): " + scoreDB.at(0).playerX.score;
        playerONameScore.innerHTML = scoreDB.at(0).playerO.name + "(O): " + scoreDB.at(0).playerO.score;

        for (let i = 0; i < 9; i++) {
            document.getElementById(String(i)).innerHTML = TicTacToeDB[i];
        }
    }
}

function getScore() {
    scoreDB = JSON.parse(localStorage.getItem("score"));
}

function setScore() {
    localStorage.setItem("score", JSON.stringify(scoreDB));
}

function getTicTacToeDB() {
    TicTacToeDB = JSON.parse(localStorage.getItem("tictactoe"));
}

function setTicTacToeDB() {
    localStorage.setItem("tictactoe", JSON.stringify(TicTacToeDB));
}

function start() {
    let x = playerXNameInput.value;
    let o = playerONameInput.value;

    if (x == "" && o == "") alert("Input Player Names!");
    else if (x == "") alert("Input Player-X Name!");
    else if (o == "") alert("Input Player-O Name!");
    else {
        scoreDB.at(0).playerX.name = x;
        scoreDB.at(0).playerO.name = o;

        setScore();

        playerDetails.style.display = "none";
        startButton.style.display = "none";
        scoreDetails.style.display = "flex";
        endButton.style.display = "flex";
        turnDetails.style.display = "flex";

        playerXNameInput.value = "";
        playerONameInput.value = "";

        playerXNameScore.innerHTML = scoreDB.at(0).playerX.name + "(X): " + scoreDB.at(0).playerX.score;
        playerONameScore.innerHTML = scoreDB.at(0).playerO.name + "(O): " + scoreDB.at(0).playerO.score;

        if (scoreDB.at(0).turn == 0) {
            turnDetails.innerHTML = "It's " + scoreDB.at(0).playerX.name + "'s Turn";
        } else {
            turnDetails.innerHTML = "It's " + scoreDB.at(0).playerO.name + "'s Turn";
        }

        TicTacToeDB = Array(9).fill(null);
        setTicTacToeDB();

        for (let i = 0; i < 9; i++) {
            document.getElementById(String(i)).innerHTML = "";
        }
    }
}

function end() {
    localStorage.clear();
    setDefaultDB();

    playerDetails.style.display = "flex";
    startButton.style.display = "flex";
    scoreDetails.style.display = "none";
    endButton.style.display = "none";
    turnDetails.style.display = "none";
    againButton.style.display = "none";
    rowContainer.style.display = "block";

    for (let i = 0; i < 9; i++) {
        document.getElementById(String(i)).innerHTML = "";
    }
}

function TicTacToe(element) {
    if (scoreDB.at(0).turn == 0) {
        element.innerHTML = "X";
        scoreDB.at(0).turn = 1;

        if (scoreDB.at(0).turn == 0) {
            turnDetails.innerHTML = "It's " + scoreDB.at(0).playerX.name + "'s Turn";
        } else {
            turnDetails.innerHTML = "It's " + scoreDB.at(0).playerO.name + "'s Turn";
        }

        TicTacToeDB[Number(element.id)] = "X";

        setScore();
        setTicTacToeDB();
    } else {
        element.innerHTML = "O";
        scoreDB.at(0).turn = 0;

        if (scoreDB.at(0).turn == 0) {
            turnDetails.innerHTML = "It's " + scoreDB.at(0).playerX.name + "'s Turn";
        } else {
            turnDetails.innerHTML = "It's " + scoreDB.at(0).playerO.name + "'s Turn";
        }

        TicTacToeDB[Number(element.id)] = "O";

        setScore();
        setTicTacToeDB();
    }

    check();
}

function again() {
    rowContainer.style.display = "block";
    againButton.style.display = "none";

    if (scoreDB.at(0).turn == 0) {
        turnDetails.innerHTML = "It's " + scoreDB.at(0).playerX.name + "'s Turn";
    } else {
        turnDetails.innerHTML = "It's " + scoreDB.at(0).playerO.name + "'s Turn";
    }

    TicTacToeDB = Array(9).fill(null);
    setTicTacToeDB();

    for (let i = 0; i < 9; i++) {
        document.getElementById(String(i)).innerHTML = "";
    }
}

function check() {
    if (TicTacToeDB[0] != null) {
        if (TicTacToeDB[0] == TicTacToeDB[1] && TicTacToeDB[1] == TicTacToeDB[2]) {
            if (TicTacToeDB[0] == "X") {
                winPlayerX();
            } else {
                winPlayerO();
            }
        } else if (TicTacToeDB[0] == TicTacToeDB[3] && TicTacToeDB[3] == TicTacToeDB[6]) {
            if (TicTacToeDB[0] == "X") {
                winPlayerX();
            } else {
                winPlayerO();
            }
        } else if (TicTacToeDB[0] == TicTacToeDB[4] && TicTacToeDB[4] == TicTacToeDB[8]) {
            if (TicTacToeDB[0] == "X") {
                winPlayerX();
            } else {
                winPlayerO();
            }
        }
    }
    if (TicTacToeDB[3] != null) {
        if (TicTacToeDB[3] == TicTacToeDB[4] && TicTacToeDB[4] == TicTacToeDB[5]) {
            if (TicTacToeDB[3] == "X") {
                winPlayerX();
            } else {
                winPlayerO();
            }
        }
    }
    if (TicTacToeDB[6] != null) {
        if (TicTacToeDB[6] == TicTacToeDB[7] && TicTacToeDB[7] == TicTacToeDB[8]) {
            if (TicTacToeDB[6] == "X") {
                winPlayerX();
            } else {
                winPlayerO();
            }
        }
    }
    if (TicTacToeDB[1] != null) {
        if (TicTacToeDB[1] == TicTacToeDB[4] && TicTacToeDB[4] == TicTacToeDB[7]) {
            if (TicTacToeDB[1] == "X") {
                winPlayerX();
            } else {
                winPlayerO();
            }
        }
    }
    if (TicTacToeDB[2] != null) {
        if (TicTacToeDB[2] == TicTacToeDB[5] && TicTacToeDB[5] == TicTacToeDB[8]) {
            if (TicTacToeDB[2] == "X") {
                winPlayerX();
            } else {
                winPlayerO();
            }
        } else if (TicTacToeDB[2] == TicTacToeDB[4] && TicTacToeDB[4] == TicTacToeDB[6]) {
            if (TicTacToeDB[2] == "X") {
                winPlayerX();
            } else {
                winPlayerO();
            }
        }
    }

    let flag = true;
    for (let i = 0; i < 9; i++) {
        if (TicTacToeDB[i] == null) {
            flag = false;
            break;
        }
    }
    if (flag) {
        rowContainer.style.display = "none";
        againButton.style.display = "flex";
        turnDetails.innerHTML = "Draw!";
    }
}

function winPlayerX() {
    scoreDB.at(0).playerX.score = Number(scoreDB.at(0).playerX.score) + 1;
    setScore();
    rowContainer.style.display = "none";
    againButton.style.display = "flex";
    turnDetails.innerHTML = scoreDB.at(0).playerX.name + " Wins!";
    playerXNameScore.innerHTML = scoreDB.at(0).playerX.name + "(X): " + scoreDB.at(0).playerX.score;
    playerONameScore.innerHTML = scoreDB.at(0).playerO.name + "(O): " + scoreDB.at(0).playerO.score;
}

function winPlayerO() {
    scoreDB.at(0).playerO.score = Number(scoreDB.at(0).playerO.score) + 1;
    setScore();
    rowContainer.style.display = "none";
    againButton.style.display = "flex";
    turnDetails.innerHTML = scoreDB.at(0).playerO.name + " Wins!";
    playerXNameScore.innerHTML = scoreDB.at(0).playerX.name + "(X): " + scoreDB.at(0).playerX.score;
    playerONameScore.innerHTML = scoreDB.at(0).playerO.name + "(O): " + scoreDB.at(0).playerO.score;
}
