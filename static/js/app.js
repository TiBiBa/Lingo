function set_teams() {
    $('#error_message').hide();
    var team1 = $('#team1').val();
    var team2 = $('#team2').val();
    $.ajax({
        type: 'POST',
        url: '/setup',
        data: JSON.stringify({
            team1: team1,
            team2: team2
        }),
        contentType: 'application/json',
        dataType: 'json'
    }).done(function () {
        window.location.href = '/play';
    }).fail(function (response) {
        $('#error_message_text').text(response.responseText);
        $('#error_message').toggle();
    });
}
function listen_word() {
    console.log("Begonnen met luisteren...");
    $.ajax({
        type: 'POST',
        url: '/listener',
        data: JSON.stringify({
            word_length: 5
        }),
        contentType: 'application/json',
        dataType: 'json'
    }).done(function (response) {
        console.log(response);
        $('#guessed_word').text(response.score[0]);
    }).fail(function (response) {
        $('#word_error_text').text(response.responseText);
        $('#word_error_message').toggle();
    });
}
