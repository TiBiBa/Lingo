from flask import Flask, render_template, request, jsonify
import speech_recognition as sr
from lingo import Lingo
import re

app = Flask(__name__)
LINGO = Lingo()


@app.route('/')
def hello_world():
    return render_template("index.html")


@app.route('/setup', methods=['GET'])
def setup_game():
    return render_template("setup_game.html")


@app.route('/setup', methods=['POST'])
def setup_preferences():
    body = request.json
    if 'team1' not in body or 'team2' not in body:
        return 'Er mist een teamnaam', 400
    if len(body['team1']) > 40 or len(body['team2']) > 40:
        return 'Namen mogen niet langer zijn dan 40 karakters', 400
    if body['team1'] == body['team2']:
        return 'Namen mogen niet hetzelfde zijn', 400

    LINGO.set_team_names(body['team1'], body['team2'])

    return jsonify({}, 200)

@app.route('/start', methods=['POST'])
def start_game():
    body = request.json
    if 'word_length' not in body:
      return 'We kunnen niet spelen zonder woord lengte', 400
    return jsonify({'word': "panda"}), 200



@app.route('/play')
def play_game():
    team_names = LINGO.get_team_names()
    if not team_names or not team_names[0] or not team_names[1]:
        return 'Je kunt geen spel spelen zonder teams', 404
    team_scores = LINGO.get_team_scores()

    return render_template("play.html", teams=team_names, scores=team_scores)


@app.route('/listener', methods=['POST'])
def audio_retrieval():
    print("We komen aan in de back-end...")
    body = request.json
    if 'word_length' not in body:
        return 'Geef een wordlengte door', 400

    r = sr.Recognizer()
    mic = sr.Microphone()

    #Retrieve the word
    with mic as source:
        r.pause_threshold = 1
        r.energy_threshold = 50
        audio = r.listen(source)
    word = r.recognize_google(audio, language="nl-NL").lower()
    print(word)

    current_word = "panda"
    print(current_word)

    #Match length of word with required length
    if len(word) != body['word_length']:
        return 'Woord heeft de verkeerde lengte', 400

    if word[0] != current_word[0]:
        return 'Woord moet met dezelfde letter beginnen', 400

    score = []
    claimed_locations = []

    for i in range(len(current_word)):
        if current_word[i] == word[i]:
            claimed_locations.append(i)
            score.append(True)
        elif word[i] in current_word:
            wrong_place = False
            indices = [i.start() for i in re.finditer(word[i], current_word)]
            for location in indices:
                if location not in claimed_locations:
                    claimed_locations.append(location)
                    wrong_place = True
            if wrong_place:
                score.append(False)
            else:
                score.append(None)
        else:
            score.append(None)

    print(score)
    return jsonify({'score': score, 'word': word}), 200


app.jinja_env.auto_reload = True
app.config['TEMPLATES_AUTO_RELOAD'] = True
app.run(debug=True)
