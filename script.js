function Gameboard() {
    const rows = 3;
    const columns = 3;
    const board = [];

    for (let i = 0; i < rows; i++) {
        board[i] = [];
        for (let j = 0; j < columns; j++) {
            board[i].push(Cell());
        }
    }

    const getBoard = () => board;

    console.log(getBoard())

    return { getBoard };
}

function Cell() {
    let value = 0;

    const getValue = () => value;

    const addMark = (playerMark) => value = playerMark;

    return { getValue, addMark }
}

Gameboard();

function GameController() {
    const playerOneName = "Player One";
    const playerTwoName = "Player Two";

    const game = Gameboard();

    const players = [
        {
            name: playerOneName,
            token: 1,
        },
        {
            name: playerTwoName,
            token: 2,
        },
    ];

    let activePlayer = players[0];

    const switchPlayer = function () {
        if (activePlayer == players[0]) {
            activePlayer = players[1];
        } else activePlayer = players[0];
    }

    const getActivePlayer = () => activePlayer;



    const playRound = function () {

    }
}