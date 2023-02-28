$(document).ready(function() {
  $("#tweet-text").on('input', function(){
    const charCount = $(this).val().length;
    const reamainChars = 140 - charCount;
    const countElement = $(this).parent().find('.counter');
    countElement.text(reamainChars);

    if (reamainChars < 0) {
      countElement.addClass("negative");
    } else {
      countElement.removeClass("negative");
    }
  });
});