/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

$(document).ready(function () {

  const tweetData = [
    {
      user: {
        name: "Newton",
        avatars: "https://i.imgur.com/73hZDYK.png",
        handle: "@SirIsaac",
      },
      content: {
        text: "If I have seen further it is by standing on the shoulders of giants",
      },
      created_at: 1461116232227,
    },
    {
      user: {
        name: "Descartes",
        avatars: "https://i.imgur.com/nlhLi3I.png",
        handle: "@rd",
      },
      content: {
        text: "Je pense , donc je suis",
      },
      created_at: 1461113959088,
    },
  ];

  const renderTweets = function (tweetData) {
    for (const user of tweetData) {
      const $usertweet = createTweetElement(user);
      $(".tweets").append($usertweet);
    }
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
    <textarea>${tweetData.content.text}</textarea>
    <footer>
      <div class="update-date">
      ${tweetData.created_at}
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

 

  const $form = $("form");
  $form.submit(function(event) {
    event.preventDefault();
    const urlencoded = $form.serialize();
    
    $.ajax({
      method: 'POST',
      url: '/tweets',
      data: urlencoded,
      success: (response) => {
        console.log(response);

        renderTweets(tweetData);
      },
      error: (err) => {
        console.log(err);
      }
    })
  })
});



/*
$.ajax({
  method: 'GET',
  url: '/tweets',
  dataType: 'json', (optional)
  success: (responseData) => {},
  error: (err) => {}
})



*/