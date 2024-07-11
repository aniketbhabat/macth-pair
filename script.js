// script.js
const cards = [
    'A', 'A', 'B', 'B', 'C', 'C', 'D', 'D', 
    'E', 'E', 'F', 'F', 'G', 'G', 'H', 'H'
];

let gameBoard = document.getElementById('game-board');
let attemptsDisplay = document.getElementById('attempt-count');
let restartBtn = document.getElementById('restart-btn');
let attempts = 0;
let firstCard, secondCard;
let lockBoard = false;

function shuffle(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
}

function createBoard() {
    gameBoard.innerHTML = '';
    shuffle(cards);
    cards.forEach(card => {
        let cardElement = document.createElement('div');
        cardElement.classList.add('card');
        cardElement.dataset.value = card;
        cardElement.innerHTML = `<span>${card}</span>`;
        cardElement.querySelector('span').style.display = 'none';
        cardElement.addEventListener('click', flipCard);
        gameBoard.appendChild(cardElement);
    });
}

function flipCard() {
    if (lockBoard) return;
    if (this === firstCard) return;

    this.classList.add('flipped');
    this.querySelector('span').style.display = 'block';

    if (!firstCard) {
        firstCard = this;
        return;
    }

    secondCard = this;
    attempts++;
    attemptsDisplay.textContent = attempts;

    checkForMatch();
}

function checkForMatch() {
    if (firstCard.dataset.value === secondCard.dataset.value) {
        disableCards();
    } else {
        unflipCards();
    }
}

function disableCards() {
    firstCard.classList.add('matched');
    secondCard.classList.add('matched');
    resetBoard();
}

function unflipCards() {
    lockBoard = true;
    setTimeout(() => {
        firstCard.classList.remove('flipped');
        secondCard.classList.remove('flipped');
        firstCard.querySelector('span').style.display = 'none';
        secondCard.querySelector('span').style.display = 'none';
        resetBoard();
    }, 1000);
}

function resetBoard() {
    [firstCard, secondCard, lockBoard] = [null, null, false];
}

function restartGame() {
    attempts = 0;
    attemptsDisplay.textContent = attempts;
    createBoard();
}

restartBtn.addEventListener('click', restartGame);

document.addEventListener('DOMContentLoaded', () => {
    createBoard();
});
