const Cell = () => {
    let value = '·';

    const addSymbol = (symbol) => {
        value = symbol;
    }

    const getSymbol = () => value;

    return {
        addSymbol,
        getSymbol
    };
}

const Gameboard = (function () {
    const board = [];


    for (let i = 0; i < 3; i++) {
        board[i] = [];
        for (let j = 0; j < 3; j++) {
            board[i].push(Cell())
        }
    }

    const getBoard = () => board;

    const drawSymbol = (row, column, symbol) => {
        const isAvailable = board[row][column].getSymbol() === '·' ? true : false;
        if (!isAvailable) {
            return false;
        }
        board[row][column].addSymbol(symbol);
    }

    const printBoard = () => {
        const boardWithValues = board.map((row) => row.map((cell) => cell.getSymbol()).join(' ')).join('\n');
        console.log(boardWithValues);
    };

    const isFull = () => {
        for (let row of board){
            for (let cell of row){
                if (cell.getSymbol() == '·')
                    return false;
            }
        }
        return true;
    }

    return {
        getBoard,
        drawSymbol,
        printBoard,
        isFull,
    };
})();

const Player = () => {
    let name = "";
    let symbol = "";
    const getName = () => name;
    const setName = (playerName) => name = playerName;
    const setSymbol = (playerSymbol) => symbol = playerSymbol;
    const getSymbol = () => symbol;

    return {
        getName,
        setName,
        setSymbol,
        getSymbol,
    }
}

const GameController = (playerOneName = "Player One", playerTwoName = "Player Two") => {
    const board = Gameboard;
    const players = [Player(), Player()];
    players[0].setName(playerOneName);
    players[0].setSymbol("X");
    players[1].setName(playerTwoName);
    players[1].setSymbol("O");

    let activePlayer = players[0];
    const switchActivePlayer = () => activePlayer = activePlayer === players[0] ? players[1] : players[0];
    const getActivePlayer = () => activePlayer;

    const printNewBoard = () => {
        board.printBoard();
        console.log(`${getActivePlayer().getName()}'s turn`);
    }

    const playRound = (row, column) => {
        board.drawSymbol(row, column, getActivePlayer().getSymbol());

        transposed = m => m[0].map((x, i) => m.map(x => x[i]));
        const checkRows = (column) => {
            let rows;
            if (column)
                rows = transposed(board.getBoard());
            else
                rows = board.getBoard();
            let symbolsInARow = 0;
            for (let row of rows) {
                for (let cell of row) {
                    if (cell.getSymbol() == getActivePlayer().getSymbol())
                        symbolsInARow += 1;
                    else {
                        symbolsInARow = 0;
                        break;
                    }
                }
                if (symbolsInARow === 3)
                    return true;
            }
            return false;
        }

        const checkColumns = () => checkRows(true);

        const checkDiagonals = () => {
            let diagonal = [];
            let currentBoard = board.getBoard();
            let winningArray = Array.from({ length: 3 }, () => getActivePlayer().getSymbol());

            // Check diagonal
            for (let i = 0; i < currentBoard.length; i++) {
                diagonal.push(currentBoard[i][i].getSymbol());
            }
            if (diagonal.length === winningArray.length && diagonal.every((value, index) => value === winningArray[index]))
                return true;
            // Check reverse diagonal
            diagonal = [];
            for (let i = 0; i < currentBoard.length; i++) {
                diagonal.push(currentBoard[(i - (currentBoard.length - 1)) * -1][i].getSymbol());
            }
            if (diagonal.length === winningArray.length && diagonal.every((value, index) => value === winningArray[index]))
                return true;

            return false;
        }

        if (checkRows() || checkColumns() || checkDiagonals()) {
            console.log(`${getActivePlayer().getName()} is the winner!`);
            board.printBoard();
            return true;
        }
        
        switchActivePlayer();
        printNewBoard();
        if (board.isFull()){
            console.log("Game is tied!");
            return true;
        }
    };

    return {
        playRound,
        getActivePlayer,
    };
}

const game = GameController();