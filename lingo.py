import string
import random


class Lingo:
    def __init__(self):
        file = open("static/words.txt", "r")
        self.words = file.read().splitlines()
        self.current_letter = None
        self.current_word = None
        self.team1_name = None
        self.team2_name = None
        self.team1_score = 0
        self.team2_score = 0

    def generate_word(self):
        self.current_word = random.choice(self.words)
        return self.current_word

    def get_current_word(self):
        return self.current_word

    def reset_current_word(self):
        self.current_word = None

    def set_team_names(self, team1, team2):
        self.team1_name = team1
        self.team2_name = team2

    def get_team_names(self):
        return self.team1_name, self.team2_name

    def increase_team_score(self, team, score):
        if team == 1:
            self.team1_score += score
        else:
            self.team2_score += score

    def get_team_scores(self):
        return self.team1_score, self.team2_score

    def reset_teams(self):
        self.team1_name = None
        self.team2_name = None
        self.team1_score = 0
        self.team2_score = 0
