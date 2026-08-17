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
        // default value of the cells are zero
        // if value of the cell in which player is trying to put their marker is not zero
        // then it means its already filled, so we tell user to place their marker elsewhere
        let flag = true;
        count = 0
        while (flag) {
            count = count + 1;
            if (board[row][column].getValue() === 0) {
                board[row][column].addMark(playerMark)
                flag = false;
            }
            else {
                console.log("This cell is already filled, please choose another cell");
            }
            if (count > 10) {
                break;
            }

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
            mark: "X",
        },
        {
            name: playerTwoName,
            mark: "O",
        },
    ];

    let activePlayer = players[0];

    const switchPlayer = function () {
        if (activePlayer == players[0]) {
            activePlayer = players[1];
        } else activePlayer = players[0];
    }

    const getActivePlayer = () => activePlayer;

    const checkForWin = function (gameboard, activePlayer) {
        const board = gameboard;
        const activePlayerMark = activePlayer.mark;
        const activePlayerName = activePlayer.name;

        // arrs is the 2d array matrix of the gameboard of size 3 by 3
        const arrs = board.map(function (row) {
            return row.map((cell) => cell.getValue())
        })

        // if either of three functions return true then one of the player have won the match and this func will return true
        if (horizontalWinConditon(board, activePlayerMark, arrs, activePlayerName) || verticalWinCondition(board, activePlayerMark, arrs, activePlayerName) || diagonalWinCondition(board, activePlayerMark, arrs, activePlayerName)) {
            console.log("checking complete");
            return true;
        }


    }

    //check every row and getValue of each cell and compare them
    // if all the values in a single row are equal then its a win
    const horizontalWinConditon = function (board, activePlayerMark, arrs, activePlayerName) {


        for (const arr of arrs) {
            const allEqual = arr => arr.every(v => v === activePlayerMark);

            if (allEqual(arr)) {
                console.log(activePlayerName + " horizontal win");
                return true;
            }
        }

    }

    const verticalWinCondition = function (board, activePlayerMark, arrs, activePlayerName) {
        let columnsAsRows = [];
        firstColumn = arrs.map(function (arr) {
            return arr[0]
        })

        let secondColumn = arrs.map(function (arr) {
            return arr[1]
        })

        let thirdColumn = arrs.map(function (arr) {
            return arr[2]
        })
        columnsAsRows.push(firstColumn, secondColumn, thirdColumn);

        for (const arr of columnsAsRows) {
            const allEqual = arr => arr.every(v => v === activePlayerMark);

            if (allEqual(arr)) {
                console.log(activePlayerName + " vertical win");
                return true;
            }
        }
        console.log("vertical", columnsAsRows)
    }

    const diagonalWinCondition = function (board, activePlayerMark, arrs, activePlayerName) {
        let diagonal1 = [];
        let diagonal2 = [];
        for (let i = 0; i < 3; i++) {
            for (let j = 0; j < 3; j++) {
                if (i == j) {
                    diagonal1.push(arrs[i][j])
                }
                if (i + j == 2) {
                    diagonal2.push(arrs[i][j])
                }
            }
        }

        let diagonals = [];
        diagonals.push(diagonal1, diagonal2)
        console.log("diagonals", diagonals);

        for (const diagonal of diagonals) {
            const allEqual = diagonal => diagonal.every(v => v === activePlayerMark);

            if (allEqual(diagonal)) {
                console.log(activePlayerName + " diagonal win");
                return true;
            }
        }
    }
    let count = 0;
    const playRound = function (row, column) {
        count += 1;
        console.log(count)
        const activePlayer = getActivePlayer();
        console.log(activePlayer.name + " Plays " + activePlayer.mark)
        game.dropMark(row, column, activePlayer.mark);
        console.log("Gameboard after " + activePlayer.name + " move's")
        game.printBoard();
        //win conditions
        if (checkForWin(board, activePlayer)) {
            console.log("Game over!")
            return true;
        }
        switchPlayer();
        if (count === 9) {
            console.log("Game Over! It's a tie, no one won");
            return;
        }

    }
    return { playRound, getActivePlayer, game };
}


function screenController() {
    const gc = GameController();
    const boardDiv = document.querySelector(".board");
    const playerTurnDiv = document.querySelector(".turn");
    const gameOverDiv = document.querySelector(".game-over");
    let isGameOver = false;

    console.log(gc.game.getBoard())
    console.log(boardDiv)
    console.log(playerTurnDiv);

    const updateScreen = function () {
        boardDiv.textContent = ""
        let gameboard = gc.game.getBoard();

        const activePlayer = gc.getActivePlayer();

        playerTurnDiv.textContent = `${activePlayer.name}'s turn`;

        gameboard.forEach((row, rowIndex) => {
            row.forEach((cell, columnIndex) => {
                const cellBtn = document.createElement("button");
                cellBtn.classList.add("cell");

                cellBtn.textContent = cell.getValue();
                cellBtn.dataset.row = rowIndex;
                cellBtn.dataset.column = columnIndex;
                boardDiv.appendChild(cellBtn);
            })
        })

    }
    function handleClick(event) {
        if (isGameOver) {
            gameOverDiv.textContent = "Game Over! Refresh to play again"
            return;
        }
        const selectedRow = event.target.dataset.row;
        const selectedColumn = event.target.dataset.column;

        if (!selectedColumn || !selectedRow) return;

        isGameOver = gc.playRound(selectedRow, selectedColumn);
        if (isGameOver) {
            gameOverDiv.textContent = "Game Over! Refresh to play again"

        }
        updateScreen();
    }

    boardDiv.addEventListener("click", handleClick)
    updateScreen();
}

screenController()

//manually playing the game

// const gc = GameController();
// gc.playRound(0, 0);
// gc.playRound(0, 0);
// gc.playRound(1, 0);
// gc.playRound(0, 1);
// gc.playRound(1, 1);
// gc.playRound(2, 2);
// gc.playRound(1, 2);
// gc.playRound(2, 1);


// const gameboard = gb.getBoard();
