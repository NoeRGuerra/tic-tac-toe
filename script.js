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
        const isAvailable = board[row][column] === ' ' ? true : false;
        if (!isAvailable) {
            return false;
        }
        board[row][column].addSymbol(symbol);
    }

    const printBoard = () => {
        const boardWithValues = board.map((row) => row.map((cell) => cell.getSymbol()));
        console.log(boardWithValues);
    };
    return {
        getBoard,
        drawSymbol,
        printBoard
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
        
        transpose = m => m[0].map((x,i) => m.map(x => x[i]))
        const checkRows = () => {
            let symbolsInARow = 0;
            for (let row of board.getBoard()){
                for (let cell of row){
                    if (cell.getSymbol() == getActivePlayer().getSymbol())
                        symbolsInARow += 1;
                    else
                        symbolsInARow = 0;
                }
                if (symbolsInARow === 3)
                    return true;
                return false;
            }
        }

        const checkColumns = () => {
            // Transpose, then call checkRows on it
            return checkRows(transpose(board.getBoard()));
        }

        const checkDiagonals = () => {
            let diagonal = [];
            let currentBoard = board.getBoard();
            let winningArray = Array.from({ length: 3 }, () => getActivePlayer().getSymbol());

            // Check diagonal
            for (let i = 0; i<currentBoard.length; i++){
                diagonal.push(currentBoard[i][i]);
            }
            if (diagonal === winningArray)
                return true;

            // Check reverse diagonal
            diagonal = [];
            for (let i = 2; i>=0; i--){
                diagonal.push(currentBoard[i][i]);
            }
            if (diagonal === winningArray)
                return true;

            return false;
        }

        if (checkRows() || checkColumns() || checkDiagonals()){
            console.log(`${checkRows()} || ${checkColumns()} || ${checkDiagonals()}`);
            console.log(`${getActivePlayer().getName()} is the winner!`);
            return true;
        }

        switchActivePlayer();
        printNewBoard();
    };

    return {
        playRound,
        getActivePlayer,
    };
}

const game = GameController();
game.playRound(0, 0);
game.playRound(1, 0);
game.playRound(0, 1);
game.playRound(1, 1);
game.playRound(0, 2);