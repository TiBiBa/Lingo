var attempts = 0

function set_teams() {
  $('#error_message').hide();
  const team1 = $('#team1').val();
  const team2 = $('#team2').val();

  $.ajax({
    type: 'POST',
    url: '/setup',
    data: JSON.stringify({
      team1: team1,
      team2: team2
    }),
    contentType: 'application/json',
    dataType: 'json'
  }).done(function() {
    window.location.href = '/play';
  }).fail(function(response) {
    $('#error_message_text').text(response.responseText);
    $('#error_message').toggle();
  });
}

function start_countdown() {
  console.log("Start countdown");
  let progress = 100;
  let intervalSpeed = 100;
  let progressInterval = setInterval(function(){
    progress -= 1;
    $('#timer').animate({width: progress + '%'}, {easing: 'linear', duration: intervalSpeed});
    if(progress <= 0){
        clearInterval(progressInterval);
        console.log("We wisselen van team...");
    }
  }, intervalSpeed);
}

function start_word() {
  console.log("Begin met het woord!");
  start_countdown();
  console.log("Start met luisteren...");
  listen_word();
}

function reset_bord() {
  $('.letter_box').text(".");
}

function start_game() {
  reset_bord();
  $.ajax({
    type: 'POST',
    url: '/start',
    data: JSON.stringify({
      word_length: 5
    }),
    contentType: 'application/json',
    dataType: 'json'
  }).done(function(response) {
    let location = ".letter_box[row='0'][column='0']";
    $(location).text(response.word[0]);
    start_word();
  }).fail(function(response) {

  });
}

function listen_word() {
  $.ajax({
    type: 'POST',
    url: '/listener',
    data: JSON.stringify({
      word_length: 5
    }),
    contentType: 'application/json',
    dataType: 'json'
  }).done(function(response) {
    $.each(response.score, function(key: number, value){
      let location = ".letter_box[row='" + attempts + "'][column='" + key + "']";
      setTimeout(function () {
        $(location).text(response.word[key]);
        if (value == true) {
          $(location).removeClass("from-blue-600 to-blue-400");
          $(location).addClass("from-red-600 to-red-400");
        }
        else if (value == false) {
          $(location).removeClass("from-blue-600 to-blue-400");
          $(location).addClass("from-yellow-600 to-yellow-400");
        }
      }, key*200);
    });

    attempts = attempts + 1;
    if (attempts < 5) {
      listen_word();
    } else {
      console.log("We wisselen van team...");
    }
  }).fail(function(response) {
    $('#word_error_text').text(response.responseText);
    $('#word_error_message').toggle();
    attempts = attempts + 1;
    if (attempts < 5) {
      listen_word();
    }
  });
}
