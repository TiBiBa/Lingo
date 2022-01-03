from flask import Flask, redirect, url_for, request, render_template
app = Flask(__name__)

@app.route('/')
def hello_world():
    return render_template("index.html")


@app.route('/login', methods=['GET'])
def login_page():
    return render_template("login.html")


@app.route('/login', methods=['POST'])
def login():
    return "Dit doet nog even niks..."


@app.route('/play')
def play_game():
    return render_template("play.html")


if __name__ == '__main__':
    app.run()
