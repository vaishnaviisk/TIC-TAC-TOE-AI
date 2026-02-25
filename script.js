let currentPlayer = 'X';
let arr = Array(9).fill(null);
let gameOver = false;
let vsAI = false;

const human = 'X';
const ai = 'O';

// Toggle Mode
function toggleMode() {
    vsAI = document.getElementById("modeSwitch").checked;

    resetGame();

    if (vsAI) {
        document.getElementById("status").innerText =
            "You (X) vs AI (O)";
    } else {
        document.getElementById("status").innerText =
            "Current Player: X";
    }
}

// Handle Click
function handleClick(el) {
    const id = el.id;

    if (arr[id] !== null || gameOver) return;

    makeMove(id, currentPlayer);

    if (!gameOver) {
        if (vsAI) {
            if (currentPlayer === human) {
                currentPlayer = ai;
                setTimeout(aiMove, 500);
            }
        } else {
            currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
            updateStatus();
        }
    }
}

// Make Move
function makeMove(index, player) {
    arr[index] = player;
    document.getElementById(index).innerText = player;

    checkWinner(player);
}

// AI Move
function aiMove() {
    if (gameOver) return;

    let move = findBestMove(ai);

    if (move === null) {
        move = findBestMove(human);
    }

    if (move === null) {
        let empty = arr
            .map((val, idx) => val === null ? idx : null)
            .filter(val => val !== null);

        move = empty[Math.floor(Math.random() * empty.length)];
    }

    makeMove(move, ai);

    if (!gameOver) {
        currentPlayer = human;
        updateStatus();
    }
}

// Find Winning/Blocking Move
function findBestMove(player) {
    const winPatterns = [
        [0,1,2], [3,4,5], [6,7,8],
        [0,3,6], [1,4,7], [2,5,8],
        [0,4,8], [2,4,6]
    ];

    for (let pattern of winPatterns) {
        const [a, b, c] = pattern;
        const values = [arr[a], arr[b], arr[c]];

        if (values.filter(v => v === player).length === 2 &&
            values.includes(null)) {
            return pattern[values.indexOf(null)];
        }
    }

    return null;
}

// Check Winner
function checkWinner(player) {
    const winPatterns = [
        [0,1,2], [3,4,5], [6,7,8],
        [0,3,6], [1,4,7], [2,5,8],
        [0,4,8], [2,4,6]
    ];

    for (let pattern of winPatterns) {
        const [a, b, c] = pattern;

        if (arr[a] && arr[a] === arr[b] && arr[a] === arr[c]) {
            showResult(`PLAYER ${player} WINS! 🎉`);
            return;
        }
    }

    if (!arr.includes(null)) {
        showResult("IT'S A DRAW 🤝");
    }
}

// Show Result Overlay
function showResult(message) {
    document.getElementById("resultText").innerText = message;
    document.getElementById("resultOverlay").classList.add("active");
    gameOver = true;
}

// Update Status (Two Player Mode)
function updateStatus() {
    if (!vsAI) {
        document.getElementById("status").innerText =
            `Current Player: ${currentPlayer}`;
    }
}

// Reset Game
function resetGame() {
    arr = Array(9).fill(null);
    currentPlayer = 'X';
    gameOver = false;

    document.querySelectorAll(".col").forEach(cell => {
        cell.innerText = "";
    });

    document.getElementById("resultOverlay").classList.remove("active");

    if (vsAI) {
        document.getElementById("status").innerText = "You (X) vs AI (O)";
    } else {
        document.getElementById("status").innerText = "Current Player: X";
    }
}