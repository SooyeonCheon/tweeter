/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

$(document).ready(function () {
 
  // second toggle button
  $(window).scroll(function() {    
    if ($(window).scrollTop() > 0) {
      $("#scroll-btn").addClass("show");
    } else {
      $("#scroll-btn").removeClass("show");
    }
  });
  $("#scroll-btn").click(function() {
    $(window).scrollTop(0);
    $("#tweet-text").focus();
  });

  // compose button
  $(".right").click(function() {
    $(".new-tweet").slideToggle();
    if ($(".new-tweet").is(":visible")) {
      $("#tweet-text").focus();
    }
  });

  //Escape function to re-encode text so that unsafe characters are converted into a safe encoded representation
  const escape = function(str) {
    let div = document.createElement("div");
    div.appendChild(document.createTextNode(str));
    return div.innerHTML;
  };

  const createTweetElement = function (tweetData) {
    const $tweet = $(`
  <article>
    <header>
      <div class="user">
        <img src=${tweetData.user.avatars}>
        <span class="user-name">${tweetData.user.name}</span>
      </div>
      <span class="user-id">${tweetData.user.handle}</span>
    </header>
    <div class="tweet-content">${escape(tweetData.content.text)}</div>
    <footer>
      <div class="update-date">
      ${timeago.format(tweetData.created_at)}
      </div>
      <div class="icons">
        <i class="fa-solid fa-flag"></i>
        <i class="fa-solid fa-retweet"></i>
        <i class="fa-solid fa-heart"></i>
      </div>
    </footer>
  </article>
  `);
    return $tweet;
  };

  const renderTweets = function (tweetData) {
    $(".tweets").empty();
    for (const user of tweetData) {
      const $usertweet = createTweetElement(user);
      $(".tweets").append($usertweet);
    }
  };

  const loadtweets = function () {
    $.ajax({
      method: "GET",
      url: "/tweets",
      success: (tweets) => {
        renderTweets(tweets.reverse());
      }
    });
  };

  loadtweets();

  $("form").submit(function (event) {
    event.preventDefault();
    $(".error").hide();
    $("#tweet-text").css("background-color", "transparent");

    // form validation
    if (!$("#tweet-text").val()) {
      $("#err-empty").slideDown();
      $("#tweet-text").css("background-color", "#fdcece");
    } else if ($(".counter").val() < 0) {
      $("#err-long").slideDown();
      $("#tweet-text").css("background-color", "#fdcece");
    } else {
      const urlencoded = $(this).serialize();
      $.ajax({
        method: "POST",
        url: "/tweets",
        data: urlencoded,
        success: (response) => {
          event.target.reset();
          $(this).find(".counter").val(140);
          loadtweets();
        }
      });
    }
  });
});
