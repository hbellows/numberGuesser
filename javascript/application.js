var randomNumber;
const submitGuess = document.querySelector('.submitGuess');
const mostRecentGuess = document.querySelector('.mostRecentGuess');
const correctGuess = document.querySelector('.correctGuess');
const guessField = document.querySelector('.userGuess');
const highLow = document.querySelector('.highLow');
const resetGame = document.querySelector('.resetGame');
const instructions = document.getElementById('instructions');
const gameStatus = document.querySelector('.gameStatus');
const minRangeField = document.querySelector('.minRange');
const maxRangeField = document.querySelector('.maxRange');
const setRange = document.querySelector('.setRange');
var gameRound = 1;

document.onload = gameStart();

function gameStart() {
  if (gameRound === 1) {
    instructions.style.display = 'block';
    minRangeField.focus();
  } else {
    setNumber(event);
    guessField.focus();
  }
  guessField.disabled = false;
  submitGuess.disabled = false;
  let round = document.querySelector('.round');
  round.textContent = "Round: " + gameRound;
}

setRange.addEventListener('click', setNumber);
var minRange;
var maxRange;

function setNumber(event) {
  event.preventDefault();
  instructions.style.display = 'none';
  if (gameRound === 1) {
    minRange = Number(minRangeField.value);
    maxRange = Number(maxRangeField.value);
  } else {
    maxRange += 10;
    minRange < 11 ? minRange = 0 : minRange -= 10;
  }
  let guessRange = maxRange - minRange;
  randomNumber = Math.floor((Math.random() * (guessRange + 1)) + minRange);
  let gameRange = document.querySelector('.gameRange')
  gameRange.textContent = "The Secret Number is between " + minRange + " and " + maxRange
  guessField.focus()
};

submitGuess.addEventListener('click', guessCheck);
resetGame.addEventListener('click', restartGame);

function guessCheck(event) {
  event.preventDefault();
  let userGuess = Number(guessField.value);

  if (validateGuess(userGuess)) {
    mostRecentGuess.textContent = userGuess;
    if (userGuess === randomNumber) {
      highLow.textContent = '';
      correctGuess.textContent = "BOOM!";
      submitGuess.disabled = true;
      guessField.disabled = true;
    } else if (userGuess > randomNumber) {
      highLow.textContent = "Your guess is too high.";
    } else if (userGuess < randomNumber) {
      highLow.textContent = "Your guess is too low.";
    }
    guessField.value = '';
    guessField.focus();
  };
};

function validateGuess(guess) {
  let guessError = document.querySelector('.error');
  guessError.textContent = '';
  if (isNaN(guess)) {
    guessError.textContent = "Your guess needs to be a number.";
    return false;
  } else if (guess < minRange || guess > maxRange) {
    guessError.textContent = 'Your guess should be between ' + minRange + ' and ' + maxRange;
    return false;
  } else {
    return true;
  }
};

function restartGame() {
  resetGame.disabled = true;
  let messages = document.querySelectorAll('.guessStatus p');
  for (i = 0; i < messages.length; i++) {
    messages[i].textContent = '';
  };
  guessField.value = '';
  gameRound++;
  gameStart();
};