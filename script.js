const playerHand = document.getElementById("player-hand");
const computerHand = document.getElementById("computer-hand");
const resultText = document.getElementById("result-text");
const playAgainBtn = document.getElementById("play-again");

const choices = document.querySelectorAll(".choice");

const wonCount = document.getElementById("won-count");
const lostCount = document.getElementById("lost-count");
const drawCount = document.getElementById("draw-count");

let wins = 0, losses = 0, draws = 0;

const handEmojis = {
  rock: "✊",
  paper: "✋",
  scissors: "✌️"
};

choices.forEach(btn => {
  btn.addEventListener("click", () => {
    const userChoice = btn.dataset.choice;
    const computerChoice = getComputerChoice();

    // Reset both hands to default
    playerHand.textContent = handEmojis["rock"];
    computerHand.textContent = handEmojis["rock"];
    playerHand.classList.add("shake");
    computerHand.classList.add("shake");

    setTimeout(() => {
      // Stop shaking and show real choices
      playerHand.classList.remove("shake");
      computerHand.classList.remove("shake");

      playerHand.textContent = handEmojis[userChoice];
      computerHand.textContent = handEmojis[computerChoice];

      const result = getResult(userChoice, computerChoice);
      showResult(result, userChoice, computerChoice);
    }, 1200);
  });
});

function getComputerChoice() {
  const options = ["rock", "paper", "scissors"];
  return options[Math.floor(Math.random() * options.length)];
}

function getResult(user, comp) {
  if (user === comp) return "draw";
  if (
    (user === "rock" && comp === "scissors") ||
    (user === "paper" && comp === "rock") ||
    (user === "scissors" && comp === "paper")
  ) return "win";
  return "lose";
}

function showResult(result, user, comp) {
  if (result === "win") {
    wins++;
    resultText.textContent = `You Won! ${capitalize(user)} beats ${capitalize(comp)}`;
    resultText.style.color = "#4caf50";
  } else if (result === "lose") {
    losses++;
    resultText.textContent = `You Lost! ${capitalize(comp)} beats ${capitalize(user)}`;
    resultText.style.color = "#f44336";
  } else {
    draws++;
    resultText.textContent = `Draw! You both chose ${capitalize(user)}`;
    resultText.style.color = "#ffc107";
  }

  wonCount.textContent = wins;
  lostCount.textContent = losses;
  drawCount.textContent = draws;

  playAgainBtn.classList.remove("hidden");
}

playAgainBtn.addEventListener("click", () => {
  resultText.textContent = "Choose your move!";
  resultText.style.color = "#fff";
  playAgainBtn.classList.add("hidden");
  playerHand.textContent = handEmojis["rock"];
  computerHand.textContent = handEmojis["rock"];
});

function capitalize(str) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}
