const submitGuess = document.querySelector('.submitGuess');
const mostRecentGuess = document.querySelector('.mostRecentGuess');
const correctGuess = document.querySelector('.correctGuess');
const guessField = document.querySelector('.userGuess');
const highLow = document.querySelector('.highLow');

guessField.focus();

submitGuess.addEventListener('click', guessCheck);

function guessCheck() {
  let userGuess = Number(guessField.value);
  mostRecentGuess.textContent = 'Your Most Recent Guess: ' + userGuess;
  if (userGuess === randomNumber) {
    highLow.textContent = '';
    correctGuess.textContent = "BOOM!";
    submitGuess.disabled = true;
    guessField.disabled = true;
    resetGame();
  } else if (userGuess > randomNumber) {
    highLow.textContent = "That is too high";
  } else if (userGuess < randomNumber) {
    highLow.textContent = "That is too low";
  }

  guessField.value = '';
  guessField.focus();
};