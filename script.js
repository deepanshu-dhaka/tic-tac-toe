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

    const dropMark = function (row, column, playerMark) {

        if (board[row][column].getValue() === 0) {
            board[row][column].addMark(playerMark)
        }
    }

    const printBoard = () => {
        const boardWithCellValues = board.map((row) =>
            row.map((cell) => cell.getValue())
        );
        console.log(boardWithCellValues);
    };

    return { getBoard, dropMark, printBoard };
}

function Cell() {
    let value = 0;

    const getValue = () => value;

    const addMark = (playerMark) => value = playerMark;

    return { getValue, addMark, value }
}

const game = Gameboard();


function GameController() {
    const playerOneName = "Player One";
    const playerTwoName = "Player Two";

    const game = Gameboard();

    const players = [
        {
            name: playerOneName,
            mark: 1,
        },
        {
            name: playerTwoName,
            mark: 2,
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