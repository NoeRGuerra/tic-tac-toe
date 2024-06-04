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

const Player = () => {
    let name = "";
    let symbol = "";
    const setName = (playerName) => name = playerName;
    const setSymbol = (playerSymbol) => symbol = playerSymbol;
    const getSymbol = () => symbol;

    return {
        setName,
        setSymbol,
        getSymbol,
    }
}

const GameController = (playerOneName = "Player One", playerTwoName = "Player Two") => {
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
        console.log(`${getActivePlayer().name}'s turn`);
    }

    const playRound = (row, column) => {
        board.drawSymbol(row, column, getActivePlayer().getSymbol());
        
        switchActivePlayer();
        printNewBoard();
    };

    return {
        playRound,
        getActivePlayer,
    };
}

const game = GameController();