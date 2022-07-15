// Defining objects
const gameBoard = (() => {
    let newBoard = ['', '', '', '', '', '', '', '', ''];
    let player1Moves = true;
    return {
        board: newBoard,
        player1Moves: player1Moves
    }
})();

const Player = (name, order) => {
    const getName = () => name;
    const getOrder = () => order;
    return {getName, getOrder};
};  

const gameController = (() => {
    const addMove = function (player, pos, board) {
        if (!board[pos]) { 
        board[pos] = player.getToken();
        return board;
        };
    };
    const checkWinner = function() {
        let winners = [[0,1,2], [3,4,5], [6,7,8], [0,3,6], [1,4,7], [2,5,8], [0,4,8], [2,4,6]]
        let p1Wins = winners.filter(arr => arr.filter(i => gameBoard.board[i] === 'X').length === 3)
        let p2Wins = winners.filter(arr => arr.filter(i => gameBoard.board[i] === 'O').length === 3)
        if (p1Wins.length > 0) {
            return 1;
        };
        if (p2Wins.length > 0) {
            return 2
        };
    };
    return { addMove, checkWinner }
})();

//DOM manipulation;

const boardCont = document.querySelector('.board-container');

const makeBoard = function() {
    const tile = document.createElement('div');
    tile.classList.add('tile');
    while (boardCont.firstChild) {
        boardCont.removeChild(boardCont.lastChild);
    };
    for (let i = 0; i < gameBoard.board.length; i++) {
        const newTile = tile.cloneNode(tile)
        newTile.textContent = gameBoard.board[i];
        newTile.addEventListener('click', (e) => {
            if (gameBoard.board[i] === '') {
                if (gameBoard.player1Moves) {
                    gameBoard.board[i] = 'X'
                    gameBoard.player1Moves = false;
                } else {
                    gameBoard.board[i] = 'O';
                    gameBoard.player1Moves = true;
                }
                let winState = gameController.checkWinner();
                if (winState === 1) {
                    alert('Player 1 Wins!')
                } else if (winState === 2){
                    alert('Player 2 Wins!')
                }
            makeBoard(gameBoard)
    }});
        boardCont.appendChild(newTile);

    };
       
};

const playBtn = document.querySelector('#play-btn');

playBtn.addEventListener("click", () => {
    gameBoard.board = ['','','','','','','','','']
    gameBoard.player1Moves = true
    makeBoard(gameBoard)
});

