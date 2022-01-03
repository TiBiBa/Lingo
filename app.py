from flask import Flask, render_template, request, jsonify

app = Flask(__name__)


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
    if body['team1'] == body['team2']:
        return 'Teamnamen mogen niet hetzelfde zijn', 400

    return jsonify({}, 200)


@app.route('/play')
def play_game():
    print("We gaan spelen!")
    return render_template("play.html")


app.jinja_env.auto_reload = True
app.config['TEMPLATES_AUTO_RELOAD'] = True
app.run(debug=True)
