from flask import Flask, render_template, request, jsonify
import speech_recognition as sr
from lingo import Lingo

app = Flask(__name__)
LINGO = Lingo()

@app.route('/')
def hello_world():
    LINGO = Lingo() #Automatically generate new word -> Which is always "panda" atm
    return render_template("play.html", word=LINGO.get_current_word())


@app.route('/setup', methods=['GET'])
def setup_game():
    return render_template("setup_game.html")


@app.route('/setup', methods=['POST'])
def setup_preferences():
    body = request.json
    if 'team1' not in body or 'team2' not in body:
        return 'Er mist een teamnaam', 400
    if body['team1'] == body['team2']:
        return 'Namen mogen niet hetzelfde zijn', 400

    return jsonify({}, 200)


@app.route('/play')
def play_game():
    return render_template("play.html")


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
        r.pause_threshold = 0.5
        r.energy_threshold = 50
        audio = r.listen(source)
    word = r.recognize_google(audio, language="nl-NL").lower()
    print(word)

    current_word = LINGO.get_current_word()

    #Match length of word with required length
    if len(word) != body['word_length']:
        return 'Woord heeft de verkeerde lengte', 400

    if word[0] != current_word[0]:
        return 'Woord moet met dezelfde letter beginnen', 400

    score = []
    for i in range(len(current_word)):
        if current_word[i] == word[i]:
          score.append(True)
        elif word[i] in current_word:
          score.append(False)
        else:
          score.append(None)

    return jsonify({'score': score, 'word': word}), 200


app.jinja_env.auto_reload = True
app.config['TEMPLATES_AUTO_RELOAD'] = True
app.run(debug=True)
