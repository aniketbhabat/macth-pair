// Card data - can be replaced with images or words
const cardItems = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H'];
let cards = [...cardItems, ...cardItems];
let flippedCards = [];
let matchedCards = [];
let attempts = 0;

// Shuffle cards
function shuffle(array) {
  return array.sort(() => Math.random() - 0.5);
}

// Create card elements
function createBoard() {
  const gameBoard = document.getElementById('game-board');
  gameBoard.innerHTML = ''; // Clear the board
  cards = shuffle(cards); // Shuffle cards
  cards.forEach((item, index) => {
    const card = document.createElement('div');
    card.classList.add('card');
    card.dataset.item = item;
    card.dataset.index = index;
    card.addEventListener('click', flipCard);
    gameBoard.appendChild(card);
  });
}

// Flip card
function flipCard() {
  if (flippedCards.length === 2 || this.classList.contains('flipped') || this.classList.contains('matched')) {
    return;
  }

  this.classList.add('flipped');
  this.textContent = this.dataset.item;
  flippedCards.push(this);

  if (flippedCards.length === 2) {
    attempts++;
    document.getElementById('attempts').textContent = attempts;
    checkMatch();
  }
}

// Check if cards match
function checkMatch() {
  const [firstCard, secondCard] = flippedCards;

  if (firstCard.dataset.item === secondCard.dataset.item) {
    firstCard.classList.add('matched');
    secondCard.classList.add('matched');
    matchedCards.push(firstCard, secondCard);
    if (matchedCards.length === cards.length) {
      setTimeout(() => alert(`You won in ${attempts} attempts!`), 500);
    }
  } else {
    setTimeout(() => {
      firstCard.classList.remove('flipped');
      secondCard.classList.remove('flipped');
      firstCard.textContent = '';
      secondCard.textContent = '';
    }, 1000);
  }
  flippedCards = [];
}

// Restart game
function restartGame() {
  attempts = 0;
  matchedCards = [];
  document.getElementById('attempts').textContent = attempts;
  createBoard();
}

document.getElementById('restart').addEventListener('click', restartGame);

// Initialize game
window.onload = restartGame;
