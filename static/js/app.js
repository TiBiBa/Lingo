var attempts = 0;
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
        var letter_location = 0;
        $.each(response.score, function (key, value) {
            var location = "#letter_box[row='" + attempts + "'][column='" + letter_location + "']";
            $(location).text(response.word[key]);
            if (value == true) {
                $(location).css("color", "green");
            }
            else if (value == false) {
                $(location).css("color", "yellow");
            }
            else {
                $(location).css("color", "red");
            }
            letter_location += 1;
        });
        attempts = attempts + 1;
    }).fail(function (response) {
        $('#word_error_text').text(response.responseText);
        $('#word_error_message').toggle();
        return null;
    });
}
