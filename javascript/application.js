// All comments refer to the line below them

// declaring variable which will be used throughout program. Used var since the
// value will be changing and so the variable will be available for scope of
// program
var randomNumber;
// these lines are all setting up const variables to be used throughout the
//program. Used const since these values will not be changing, they are refering
// to specific html elements that won't change
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
// used var for gameRound since this variable will be updated after each round
// of play and needs to be accessible throughout app
var gameRound = 1;
// this initiates the gameStart function upon the document successfully loading
document.onload = gameStart();
// declares the function gameStart
function gameStart() {
  // if the gameRound is round 1, then do this block
  if (gameRound === 1) {
    // show the instructions and form inputs to allow user to set the number range
    instructions.style.display = 'block';
    // set the cursor into the minRange field so user knows that's where they
    // should be.
    minRangeField.focus();
  // if gameRound is anything other than 1, do this block.
  } else {
    // proceed to the setNumber function since we will do this automatically for
    // all future rounds
    setNumber(event);
    // put the cursor in the guessField input so the user can easily guess
    // a number.
    guessField.focus();
  }
  // enable the guessField and Submit buttons since we are allowing user to guess now
  guessField.disabled = false;
  submitGuess.disabled = false;
  // sets up variable for this function to set the round paragraph. Used let here
  // since we only need this variable for this section, not the scope of the entire
  // program
  let round = document.querySelector('.round');
  // sets the html <p> to show the Round number for the user
  round.textContent = "Round: " + gameRound;
}
// sets an event listener to the setRange button so when the user clicks on it
// the setNumber function will be initiated
setRange.addEventListener('click', setNumber);
// Next two lines declare two variables that will be changing throughout the
// program and will need to be used in multiple functions. This is why I used
// var as opposed to let, so their scope will be more program wide.
var minRange;
var maxRange;
// declares the setNumber function, passes an event to use for the preventDefault
// function so the page will not refresh when the Set Range button is clicked
function setNumber(event) {
  // stops normal action for the event, in this case, the event is the button
  // being clicked and the default action would be to reload the page.
  event.preventDefault();
  // hides the instruction block and the min/max range input fields
  instructions.style.display = 'none';
  // conditional checks if the gameRound is 1, if so we will enter the if block
  // and the minRange and maxRange are retreived from the user input from the form
  if (gameRound === 1) {
    // Takes value of the input from the field and turns it into a number (came in
    // as a string)
    minRange = Number(minRangeField.value);
    maxRange = Number(maxRangeField.value);
  // branch to go down when gameRound is anything except 1
  } else {
  // takes the current maxRange and adds 10
    maxRange += 10;
  // takes the current minRange and checks if its 11 or less, if so, just set it
  // to zero, otherwise, decrement by 10. Didn't want negative numbers so stopping
  // at zero
    minRange < 11 ? minRange = 1 : minRange -= 10;
  }
  // need the range of the guesses in order to properly generate the random number
  // within the given range.  Used let since I only need this variable for the scope of
  // this function and will be reseting the value each round.
  let guessRange = maxRange - minRange;
  // Sets the random numbers within the given range by the user, then upps the floor
  // of that range to whatever the minRange number is.
  randomNumber = Math.floor((Math.random() * (guessRange + 1)) + minRange);
  // used let since I only need to set this text here in this function, then it
  // is left alone for the rest of the game.
  let gameRange = document.querySelector('.gameRange')
  // Sets the text of this html element on the DOM
  gameRange.textContent = "The Secret Number is between " + minRange + " and " + maxRange
  // moves cursor to the guessField html element so user is ready to guess.
  guessField.focus()
};
// adds event listners for when someone clicks on submitGuess or resetGame.
submitGuess.addEventListener('click', guessCheck);
resetGame.addEventListener('click', restartGame);
// declares function guessCheck
function guessCheck(event) {
// stops the page from refreshing when the guessCheck button is clicked
  event.preventDefault();
// declares variable to be the user input from the number guess field, turns it
// into a number instead of string. Used let since only need this value for scope
// of this function and will be changing the value each round.
  let userGuess = Number(guessField.value);
// first sends the guess through a validation function, if the return value of
// that function is true, we will go down this first branch.
  if (validateGuess(userGuess)) {
    // displays the user's guess on the page in the given html element.
    mostRecentGuess.textContent = userGuess;
    // checks if the userGuess is the correct number, if so, we'll go down this
    // first if block branch
    if (userGuess === randomNumber) {
      // No need to display if number is higher or lower since it's the correct
      // answer, so set that text to an empty string.
      highLow.textContent = '';
      // set this html element to boom!
      correctGuess.textContent = "BOOM!";
      // disable the submitGuess button and the guessField since the user got
      // the correct number, they need to choose another option
      submitGuess.disabled = true;
      guessField.disabled = true;
    // if the users guess is higher than the random number, then go down this branch
    } else if (userGuess > randomNumber) {
      // Set the text content to give user hint
      highLow.textContent = "That is too high!";
    // if users guess is lower than the randomNumber, go down this branch
    } else if (userGuess < randomNumber) {
      // Set text content to giver user hint
      highLow.textContent = "That is too low!";
    }
    // Next two lines happen for each guess that is valid, clears the guessField
    // input field so user doesn't have to, and resets the cursor into that field.
    guessField.value = '';
    guessField.focus();
  };
};
// declares function named validateGuess, takes in one argument
function validateGuess(guess) {
  // sets the error html element to a variable so I can access it within this
  // function. Used let since error message can change and only need it for scope of
  // this function.
  let guessError = document.querySelector('.error');
  // clears the error so any old error messages are gone.
  guessError.textContent = '';
  // checks to see if the user guess is Not a Number
  if (isNaN(guess)) {
    // if not a number, the guessError field will have the content shown below
    guessError.textContent = "You need to guess a numberical number.";
    // false is returned so the rest of the guessCheck function does not run
    return false;
    // checks to see if the user guess is within the set range of numbers for the
    // random number to be between
  } else if (guess < minRange || guess > maxRange) {
    // if user guess is not in given range, the guessError text changes to the text
    // below
    guessError.textContent = 'Your guess should be between ' + minRange + ' and ' + maxRange;
    // return false to guessCheck so that function does not continue running
    return false;
    // if none of those errors are met, go down this branch
  } else {
    // return true so the guessCheck function can continue with play
    return true;
  }
};
// declares restartGame function
function restartGame() {
  // disables resetGame button since the game is reset and there is nothing for
  // the user to reset
  resetGame.disabled = true;
  // selects all the p element children of the guessStatus class html element and
  // saves those elements to the messages variable. This will save as a node list.
  let messages = document.querySelectorAll('.guessStatus p');
  // iterates over node list and sets all text content to empty strings so the user
  // doesn't have any old messages.
  for (i = 0; i < messages.length; i++) {
    messages[i].textContent = '';
  };
  // clears guessField input
  guessField.value = '';
  // increments gameRound
  gameRound++;
  // runs gameStart function 
  gameStart();
};