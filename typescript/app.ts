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
  console.log("Start the countdown!");
  let progress = 0;
  let intervalSpeed = 10;
  let incrementSpeed = 1;
  document.addEventListener("DOMContentLoaded", function(){
    let bar = $('#timer');
    let progressInterval = setInterval(function(){
      progress -= incrementSpeed;
      bar.width(progress + "%");
      if(progress <= 0){
          clearInterval(progressInterval);
      }
    }, intervalSpeed);
  });

}

function start_game() {
  $.ajax({
    type: 'POST',
    url: '/start',
    data: JSON.stringify({
      word_length: 5
    }),
    contentType: 'application/json',
    dataType: 'json'
  }).done(function(response) {
    let location = "#letter_box[row='0'][column='0']";
    $(location).text(response.word[0]);
    start_countdown();
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
    let letter_location = 0
    $.each(response.score, function(key, value){
      let location = "#letter_box[row='" + attempts + "'][column='" + letter_location + "']";
      $(location).text(response.word[key]);
      if (value == true) {
        $(location).css("color", "green");
      } else if (value == false) {
        $(location).css("color", "yellow");
      } else {
        $(location).css("color", "red");
      }


      letter_location += 1;
    });
    attempts = attempts + 1;
  }).fail(function(response) {
    $('#word_error_text').text(response.responseText);
    $('#word_error_message').toggle();
    return null;
  });
}
