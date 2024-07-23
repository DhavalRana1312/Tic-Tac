let gameBoard = [];
let currentPlayer = 'X';
let gameOver = false;
let gameMode = 'singlePlayer'; // or 'multiPlayer'

// Initialize game board
for (let i = 0; i < 9; i++) {
    gameBoard.push('');
    document.getElementById(`cell-${i}`).addEventListener('click', handleCellClick);
}

// Handle cell click
function handleCellClick(event) {
    if (gameOver) return;
    const cellIndex = event.target.id.replace('cell-', '');
    if (gameBoard[cellIndex] === '') {
        gameBoard[cellIndex] = currentPlayer;
        event.target.textContent = currentPlayer;
        checkGameStatus();
        if (gameMode === 'singlePlayer') {
            makeComputerMove();
        } else {
            currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
        }
    }
}

// Make computer move (single player mode)
function makeComputerMove() {
    let bestMove = -1;
    let bestScore = -Infinity;
    for (let i = 0; i < 9; i++) {
        if (gameBoard[i] === '') {
            gameBoard[i] = 'O';
            const score = minimax(gameBoard, 0, false);
            gameBoard[i] = '';
            if (score > bestScore) {
                bestScore = score;
                bestMove = i;
            }
        }
    }
    gameBoard[bestMove] = 'O';
    document.getElementById(`cell-${bestMove}`).textContent = 'O';
    checkGameStatus();
currentPlayer = 'X';
}

// Minimax algorithm for AI
function minimax(board, depth, isMaximizing) {
    const winningCombinations = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6]
    ];

    for (let i = 0; i < winningCombinations.length; i++) {
        const combination = winningCombinations[i];
        if (board[combination[0]] !== '' && board[combination[0]] === board[combination[1]] && board[combination[1]] === board[combination[2]]) {
            if (board[combination[0]] === 'X') {
                return -1;
            } else if (board[combination[0]] === 'O') {
                return 1;
            }
        }
    }

    if (!isMaximizing) {
        let bestScore = -Infinity;
        for (let i = 0; i < 9; i++) {
            if (board[i] === '') {
                board[i] = 'O';
                const score = minimax(board, depth + 1, true);
                board[i] = '';
                bestScore = Math.max(score, bestScore);
            }
        }
        return bestScore;
    } else {
        let bestScore = Infinity;
        for (let i = 0; i < 9; i++) {
            if (board[i] === '') {
                board[i] = 'X';
                const score = minimax(board, depth + 1, false);
                board[i] = '';
                bestScore = Math.min(score, bestScore);
            }
        }
        return bestScore;
    }
}

// Check game status
function checkGameStatus() {
    const winningCombinations = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6]
    ];

    for (let i = 0; i < winningCombinations.length; i++) {
        const combination = winningCombinations[i];
        if (gameBoard[combination[0]] === gameBoard[combination[1]] && gameBoard[combination[1]] === gameBoard[combination[2]] && gameBoard[combination[0]] !== '') {
            gameOver = true;
            document.getElementById('game-status').textContent = `Player ${gameBoard[combination[0]]} wins!`;
            return;
        }
    }

    if (!gameBoard.includes('')) {
        gameOver = true;
        document.getElementById('game-status').textContent = 'It\'s a draw!';
    }
}

// Reset game
document.getElementById('reset-button').addEventListener('click', resetGame);

function resetGame() {
    gameBoard = [];
    currentPlayer = 'X';
    gameOver = false;
    for (let i = 0; i < 9; i++) {
        gameBoard.push('');
        document.getElementById(`cell-${i}`).textContent = '';
    }
    document.getElementById('game-status').textContent = 'Game in progress...';
}

// New game
document.getElementById('new-game-button').addEventListener('click', newGame);

function newGame() {
    gameBoard = [];
    currentPlayer = 'X';
    gameOver = false;
    gameMode = prompt('Choose game mode: singlePlayer or multiPlayer');
    if (gameMode !== 'singlePlayer' && gameMode !== 'multiPlayer') {
        gameMode = 'singlePlayer';
    }
    for (let i = 0; i < 9; i++) {
gameBoard.push('');
        document.getElementById(`cell-${i}`).textContent = '';
    }
    document.getElementById('game-status').textContent = 'Game in progress...';
}