$(document).ready(function() {
  $('.userGuess').on("input", function() {
    $('.clearGuess').prop('disabled', false);
    $('.resetGame').prop('disabled', false);
    if ( $('.userGuess').val() === '') {
      disableReset;
    };
  }
);

  $('.submitGuess').on('click', disableReset);

  $('.clearGuess').on('click', function(event) {
    disableReset;
    clearContents;
    }
  );

  function disableReset() {
    $('.clearGuess').prop('disabled', true);
  };

  function clearContents() {
    $('.userGuess').html('');
  }
});