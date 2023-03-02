/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

$(document).ready(function () {
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
    <textarea>${tweetData.content.text}</textarea>
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
      },
    });
  };

  loadtweets();

  const $form = $("form");
  $form.submit(function (event) {
    event.preventDefault();

    if (!$("#tweet-text").val()) {
      alert("Please enter the content.");
    } else if ($(".counter").val() < 0) {
      alert("Please reduce the content to less than or equal to 140 characters.");
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
        },
        error: (err) => {
          console.log(err);
        },
      });
    }
    
  });
});
