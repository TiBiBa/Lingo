
function set_teams() {
  const team1 = $('#team1').val();
  const team2 = $('#team2').val();

  $.ajax({
    type: 'POST',
    url: '/set_teams',
    data: JSON.stringify({
      team1: team1,
      team2: team2
    }),
    contentType: 'application/json',
    dataType: 'json'
  }).done(function(response) {
    console.log("Het werkt!");
  }).fail(function(xhr) {
    console.error(xhr);
  });
}
