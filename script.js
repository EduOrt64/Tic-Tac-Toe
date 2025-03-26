const btnStart = document.querySelector(".btn-start");
const btnReset = document.querySelector(".btn-reset");
const player1Name = document.querySelector("#player1");
const player2Name = document.querySelector("#player2");
const gameboardContainer = document.querySelector(".gameboard");
const textScreen = document.querySelector(".screen-text");

function Gameboard() {
  let gameboard = ["", "", "", "", "", "", "", "", ""];
  let currentPlayer = "x";
  let gameOver = false; // Flag to check if the game is over

  const startGame = () => {
    textScreen.textContent = "Please add player's name";
    btnStart.addEventListener("click", gameboardReady);
  };

  const gameboardReady = () => {
    if (player1Name.value !== "" && player2Name.value !== "") {
      gameboardContainer.innerHTML = "";
      gameOver = false;  // Reset gameOver flag when a new game starts

      gameboard.forEach((_cell, index) => {
        const newSquare = document.createElement("div");
        newSquare.classList.add("square");
        newSquare.id = index;
        gameboardContainer.appendChild(newSquare);
      });

      textScreen.textContent = `Ready for the game, "X" goes first`;

      const squareElements = document.querySelectorAll(".square");
      squareElements.forEach((el) => {
        el.addEventListener("click", createSymbol);
      });
    } else {
      textScreen.textContent = "Please add player's name";
    }
  };

  const resetGame = () => {
    btnReset.addEventListener("click", () => {
      gameboard = ["", "", "", "", "", "", "", "", ""];
      gameboardContainer.innerHTML = "";
      player1Name.value = "";
      player2Name.value = "";
      textScreen.textContent = "New Game, Enter new player's name";
      gameOver = false; // Reset game over flag

      // Remove event listeners after resetting
      const squareElements = document.querySelectorAll(".square");
      squareElements.forEach((el) => {
        el.removeEventListener("click", createSymbol);
      });
    });
  };

  const createSymbol = (e) => {
    if (gameOver) return;  // Prevent any actions after the game is over

    const square = e.target;
    const index = square.id;

    // Check if the square is already filled with X or O
    if (!square.querySelector(".x") && !square.querySelector(".o")) {
      const drawSymbol = document.createElement("div");
      square.appendChild(drawSymbol);
      drawSymbol.classList.add(currentPlayer);

      gameboard[index] = currentPlayer;

      checkWinner();
      currentPlayer = currentPlayer === "x" ? "o" : "x";
    }
  };

  const checkWinner = () => {
    const winningCombinations = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8], // Rows
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8], // Columns
      [0, 4, 8],
      [2, 4, 6], // Diagonals
    ];

    for (let combination of winningCombinations) {
      const [a, b, c] = combination;
      if (
        gameboard[a] &&
        gameboard[a] === gameboard[b] &&
        gameboard[a] === gameboard[c]
      ) {
        textScreen.textContent = `${gameboard[a]} wins!`;
        gameOver = true; 
        return;
      }
    }

   
    if (!gameboard.includes("")) {
      textScreen.textContent = "It's a draw!";
      gameOver = true; 
    }
  };

  return {
    startGame,
    gameboardReady,
    resetGame,
  };
}

const renderBoard = Gameboard();
renderBoard.startGame();
renderBoard.resetGame();
