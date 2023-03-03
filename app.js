const cards = document.querySelectorAll(".memory-card");
const winner = document.querySelector(".winner");

let cardIsFlipped = false;
let lockBoard = false;
let firstCard, secondCard;
let count = 6;

const disableCards = function () {
  firstCard.removeEventListener("click", flipCard);
  secondCard.removeEventListener("click", flipCard);
  count--;
  console.log(count);
};

const unflipCards = function () {
  lockBoard = true;
  setTimeout(() => {
    firstCard.classList.remove("flip");
    secondCard.classList.remove("flip");
    lockBoard = false;
    firstCard = null;
    secondCard = null;
  }, 1500);
};

const checkForMatch = function () {
  let isMatched = firstCard.dataset.name === secondCard.dataset.name;
  isMatched ? disableCards() : unflipCards();
};

const flipCard = function () {
  if (lockBoard) return;
  if (this === firstCard) return;

  this.classList.add("flip");

  if (!cardIsFlipped) {
    cardIsFlipped = true;
    firstCard = this;
    return;
  }
  cardIsFlipped = false;
  secondCard = this;
  checkForMatch();
  if (count === 0) {
    winner.classList.remove("display");
  }
};

const shuffle = function () {
  cards.forEach((card) => {
    let randomPosition = Math.floor(Math.random() * 12);
    card.style.order = randomPosition;
  });
};

shuffle();

cards.forEach((card) => {
  card.addEventListener("click", flipCard);
});
