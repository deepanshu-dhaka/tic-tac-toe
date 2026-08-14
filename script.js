function Gameboard() {
    const rows = 3;
    const columns = 3;
    const board = [];

    //Make the board
    for (let i = 0; i < rows; i++) {
        board[i] = [];
        for (let j = 0; j < columns; j++) {
            board[i].push(Cell());
        }
    }

    const getBoard = () => board;

    // console.log(getBoard())

    //it changes the value of the board
    const dropMark = function (row, column, playerMark) {

        if (board[row][column].getValue() === 0) {
            board[row][column].addMark(playerMark)
        }
    }

    //Print the board in console
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

    return { getValue, addMark }
}



function GameController() {
    const playerOneName = "Player One";
    const playerTwoName = "Player Two";

    const game = Gameboard();
    const board = game.getBoard();

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

    const playRound = function (row, column) {
        const activePlayer = getActivePlayer();
        game.dropMark(row, column, activePlayer.mark);
        //win conditions
        switchPlayer();

    }
    return { playRound, getActivePlayer, board };
}


//check every row and getValue of each cell and compare them
// if all the values in a single row are equal then its a win
const horizontalWinConditon = function (gameboard) {
    const board = gameboard;

    const arrs = board.map(function (row) {
        return row.map((cell) => cell.getValue())
    })

    for (const arr of arrs) {
        const allEqual = arr => arr.every(v => v === "X");

        // if (allEqual(arr)) {
        //     console.log("win");
        //     break;
        // }
        console.log(allEqual(arr));
    }
    console.log("arr", arrs);
}


//manually playing the game

const gb = Gameboard();

//dropping mark manually
gb.dropMark(1, 0, "X")
gb.dropMark(1, 1, "X")
gb.dropMark(1, 2, "X")
console.log("print board")
gb.printBoard();


const gameboard = gb.getBoard();
horizontalWinConditon(gameboard)