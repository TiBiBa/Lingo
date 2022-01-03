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
