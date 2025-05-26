"use strict";

const player0El = document.querySelector(".player-left");
const player1El = document.querySelector(".player-right");
const score0El = player0El.querySelector(".player-score");
const score1El = player1El.querySelector(".player-score");
const current0El = player0El.querySelector(".current-score-value");
const current1El = player1El.querySelector(".current-score-value");
const diceEl = document.querySelector(".dice");
const btnNew = document.querySelector(".btn-new");
const btnRoll = document.querySelector(".btn-roll");
const btnHold = document.querySelector(".btn-hold");

let scores, currentScore, activePlayer, playing;

const init = function () {
  scores = [0, 0];
  currentScore = 0;
  activePlayer = 0;
  playing = true;

  score0El.textContent = 0;
  score1El.textContent = 0;
  current0El.textContent = 0;
  current1El.textContent = 0;

  diceEl.style.display = "none";

  player0El.classList.add("player-left");
  player1El.classList.add("player-right");
  player0El.classList.remove("player-winner");
  player1El.classList.remove("player-winner");

  player0El.style.backgroundColor = "rgba(255, 255, 255, 0.7)";
  player1El.style.backgroundColor = "rgba(255, 255, 255, 0.3)";
};

init();

const switchPlayer = function () {
  document.querySelector(
    `.player-${activePlayer === 0 ? "left" : "right"} .current-score-value`
  ).textContent = 0;

  currentScore = 0;
  activePlayer = activePlayer === 0 ? 1 : 0;
  if (activePlayer === 0) {
    player0El.style.backgroundColor = "rgba(255, 255, 255, 0.7)";
    player1El.style.backgroundColor = "rgba(255, 255, 255, 0.3)";
  } else {
    player0El.style.backgroundColor = "rgba(255, 255, 255, 0.3)";
    player1El.style.backgroundColor = "rgba(255, 255, 255, 0.7)";
  }
};

btnRoll.addEventListener("click", function () {
  if (playing) {
    const dice = Math.trunc(Math.random() * 6) + 1;
    diceEl.style.display = "block";
    diceEl.src = `dice-${dice}.png`;
    if (dice !== 1) {
      currentScore += dice;
      document.querySelector(
        `.player-${activePlayer === 0 ? "left" : "right"} .current-score-value`
      ).textContent = currentScore;
    } else {
      switchPlayer();
    }
  }
});

btnHold.addEventListener("click", function () {
  if (playing) {
    scores[activePlayer] += currentScore;
    document.querySelector(
      `.player-${activePlayer === 0 ? "left" : "right"} .player-score`
    ).textContent = scores[activePlayer];
    if (scores[activePlayer] >= 100) {
      playing = false;
      diceEl.style.display = "none";
      if (activePlayer === 0) {
        player0El.style.backgroundColor = "#4CAF50";
        player0El.classList.add("player-winner");
      } else {
        player1El.style.backgroundColor = "#4CAF50";
        player1El.classList.add("player-winner");
      }
    } else {
      switchPlayer();
    }
  }
});

btnNew.addEventListener("click", init);
