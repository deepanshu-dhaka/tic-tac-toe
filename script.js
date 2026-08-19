const Cell = (() => {
    let value = "";

    const getValue = () => value;

    const addMark = (playerMark) => value = playerMark;

    return { getValue, addMark }
});

const Gameboard = (() => {
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
        let isCellAlreadyTaken = false;

        if (board[row][column].getValue() === "") {
            board[row][column].addMark(playerMark)

        }
        else {
            isCellAlreadyTaken = true;
            return isCellAlreadyTaken;
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
})();





const GameController = (() => {
    const playerOneName = "Player One";
    const playerTwoName = "Player Two";

    // const game = Gameboard;
    const board = Gameboard.getBoard();

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

    const checkForTies = function (gameboard, activePlayer) {
        const board = gameboard;
        const activePlayerMark = activePlayer.mark;
        const activePlayerName = activePlayer.name;

        // arrs is the 2d array matrix of the gameboard of size 3 by 3
        const arrs = board.map(function (row) {
            return row.map((cell) => cell.getValue())
        })
        console.log("ties array", arrs)

        // check if there are cells within gamebaord with empty values
        // if there is not any empty values cell left then all the cells are filled
        // which means no has won and it is a tie. Because if somebody have won
        // then game would have terminated or ended.
        let isCellEmpty;
        console.log(isCellEmpty)
        // for (const arr of arrs) {
        //     console.log(arr)
        //     isCellEmpty = arr.some(v => v === "");
        // }
        let newarr = []

        for (let i = 0; i < 3; i++) {
            for (let j = 0; j < 3; j++) {
                newarr.push(arrs[i][j])
            }
        }
        isCellEmpty = newarr.some(v => v === "");
        console.log(isCellEmpty, "iscellempty")

        if (!isCellEmpty) {
            return true;
        }
    }

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
    const playRound = function (row, column) {
        const activePlayer = getActivePlayer();
        console.log(activePlayer.name + " Plays " + activePlayer.mark)
        let isCellAlreadyTaken = Gameboard.dropMark(row, column, activePlayer.mark);
        console.log("Gameboard after " + activePlayer.name + " move's")
        Gameboard.printBoard();
        //win conditions
        if (checkForWin(board, activePlayer)) {
            return true;
        }

        if (checkForTies(board, activePlayer)) {
            return "tie";
        }
        if (!isCellAlreadyTaken) {
            switchPlayer();
        }
    }
    return { playRound, getActivePlayer, Gameboard, players };
});


const screenController = (() => {
    const gc = GameController();
    const boardDiv = document.querySelector(".board");
    const playerTurnDiv = document.querySelector(".turn");
    const gameOverDiv = document.querySelector(".game-over");
    const containerDiv = document.querySelector(".container")
    let isGameOver = false;

    console.log(gc.Gameboard.getBoard())
    console.log(boardDiv)
    console.log(playerTurnDiv);

    const updateScreen = function () {
        boardDiv.textContent = ""
        let gameboard = gc.Gameboard.getBoard();

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
    function handleBoardClick(event) {
        if (!isEnterPlayerNamesBtnCalled()) {
            enterPlayerNamesBtn.remove();
        }
        if (isGameOver) {
            return;
        }
        const selectedRow = event.target.dataset.row;
        const selectedColumn = event.target.dataset.column;

        if (!selectedColumn || !selectedRow) return;

        isGameOver = gc.playRound(selectedRow, selectedColumn);
        updateScreen();
        if (isGameOver === true) {
            gameOverDiv.textContent = `${gc.getActivePlayer().name} won the game! Refresh to play again`;
            playerTurnDiv.textContent = "";
            makeRefreshButton();
        }
        if (isGameOver === "tie") {
            gameOverDiv.textContent = "Its a tie! Refresh to play again";
            playerTurnDiv.textContent = "";
            makeRefreshButton();
        }
    }
    function makeRefreshButton() {
        const refreshBtn = document.createElement("button");
        refreshBtn.classList.add("refreshBtn");
        refreshBtn.textContent = "Refresh"
        containerDiv.appendChild(refreshBtn);

        refreshBtn.addEventListener("click", () => window.location.reload())
    }

    boardDiv.addEventListener("click", handleBoardClick)
    updateScreen();

    function isEnterPlayerNamesBtnCalled() {
        let flag = false;
        return flag;
    }

    function setPlayerNames() {
        let playerOneName = prompt("Enter the name of Player One:");
        let playerTwoName = prompt("Enter the name of Player two:");
        if (playerOneName === null || playerOneName === "") {
            playerOneName = "Player One"
        }
        if (playerTwoName === null || playerTwoName === "") {
            playerTwoName = "Player Two"
        }
        gc.players[0].name = playerOneName;
        gc.players[1].name = playerTwoName;
        playerTurnDiv.textContent = `${playerOneName}'s turn`;
        enterPlayerNamesBtn.remove();
    }

    const enterPlayerNamesBtn = document.querySelector(".enter-player-name-btn");
    enterPlayerNamesBtn.addEventListener("click", handleClick)
    function handleClick() {
        let isEnterPlayerNamesBtnBtnClicked = isEnterPlayerNamesBtnCalled();
        isEnterPlayerNamesBtnBtnClicked = true;
        setPlayerNames();

    }
});

screenController()


