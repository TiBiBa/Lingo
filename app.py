from flask import Flask, render_template

app = Flask(__name__)


@app.route('/')
def hello_world():
    return render_template("index.html")


@app.route('/setup')
def setup_game():
    return render_template("setup_game.html")


@app.route('/play')
def play_game():
    return render_template("play.html")


app.jinja_env.auto_reload = True
app.config['TEMPLATES_AUTO_RELOAD'] = True
app.run(debug=True)
