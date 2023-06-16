const tiles = document.querySelectorAll(".tile"); // hiervoor heb ik alle tiles van index gepakt
const PLAYER_X = "X"; // Letter voor het spel
const PLAYER_O = "O"; // letter voor het spel
let turn = PLAYER_X;

const boardState = Array(tiles.length);
boardState.fill(null);

//Elements
const strike = document.getElementById("strike"); // element gepakt om in js te verwerken
const gameOverArea = document.getElementById("game-over-area"); // element gepakt om in js te verwerken
const gameOverText = document.getElementById("game-over-text"); // element gepakt om in js te verwerken
const playAgain = document.getElementById("play-again"); // element gepakt om in js te verwerken
playAgain.addEventListener("click", startNewGame); // element gepakt om in js te verwerken

tiles.forEach((tile) => tile.addEventListener("click", tileClick)); // zorgt ervoor dat als je op een plek geklikt wordt X of O getoond 

function setText() {} 
function tileClick(event) {
  if (gameOverArea.classList.contains("visible")) {
    return;
  }

  const tile = event.target;
  const tileNumber = tile.dataset.index;
  if (tile.innerText != "") {
    return; // zorgt ervoor dat je niet kan hacken of niet goed spelen
  }

  if (turn === PLAYER_X) {
    tile.innerText = PLAYER_X;
    boardState[tileNumber - 1] = PLAYER_X;
    turn = PLAYER_O;
  } else {
    tile.innerText = PLAYER_O;
    boardState[tileNumber - 1] = PLAYER_O;
    turn = PLAYER_X;
  }

  setText();
  checkWinner();
}

function checkWinner() {

  for (const winningCombination of winningCombinations) {
    //Object Destructuring
    const { combo, strikeClass } = winningCombination; //combinaties en strikeclass
    const tileValue1 = boardState[combo[0] - 1]; // dat ze van de eerste geklikte blokje gtoond
    const tileValue2 = boardState[combo[1] - 1]; // dat ze van de tweede geklikte blokje gtoond
    const tileValue3 = boardState[combo[2] - 1]; // dat ze van de deerde geklikte blokje gtoond

    if (
      tileValue1 != null &&
      tileValue1 === tileValue2 &&
      tileValue1 === tileValue3
    ) {
      strike.classList.add(strikeClass); // zorgt ervoor om de diagonal te tonen
      gameOverScreen(tileValue1);
      return;
    }
  }

  //Check for a draw
  const draw = boardState.every((tile) => tile !== null);
  if (draw) {
    gameOverScreen(null);
  }
}

function gameOverScreen(winnerText) {
  let text = "Gelijkspel!";
  if (winnerText != null) {
    text = `Winaar is ${winnerText}!`;
  }
  gameOverArea.className = "visible";
  gameOverText.innerText = text;
  
}

function startNewGame() {
  strike.className = "strike"; // zorgt ervoor dat de lijn weg gaat als je opnieuw klikt
  gameOverArea.className = "hidden"; // zorgt ervoor dat de win of gelijkspel weg gaat als je opnieuw klikt
  boardState.fill(null);
  tiles.forEach((tile) => (tile.innerText = "")); // zorgt ervoor dat als je op de opnieuw klikt gaat alles weer herhalen dus nieuwe wedstrijd beginnen
  //anders blijft alles op de zelfde plek
  turn = PLAYER_X; // zorgt ervoor dat speler X altijd begint 
  setText();
}

const winningCombinations = [
  //rows
  { combo: [1, 2, 3], strikeClass: "strike-row-1" }, // eerste tempelt column
  { combo: [4, 5, 6], strikeClass: "strike-row-2" }, // tweede tempelt column
  { combo: [7, 8, 9], strikeClass: "strike-row-3" }, // deerde tempelt column
  //columns
  { combo: [1, 4, 7], strikeClass: "strike-column-1" }, // eerste row column
  { combo: [2, 5, 8], strikeClass: "strike-column-2" }, // tweede row column
  { combo: [3, 6, 9], strikeClass: "strike-column-3" }, // deerde row column
  //diagonals
  { combo: [1, 5, 9], strikeClass: "strike-diagonal-1" }, // eerste diagonal
  { combo: [3, 5, 7], strikeClass: "strike-diagonal-2" }, // tweede diagonal
];
