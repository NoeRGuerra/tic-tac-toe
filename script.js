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