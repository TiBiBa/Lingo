import string
import random


class Lingo:
    def __init__(self):
        self.current_letter = random.choice(string.ascii_letters).lower()
        self.current_word = "panda"

    def generate_letter(self):
        self.current_letter = random.choice(string.ascii_letters).lower()
        return self.current_letter

    def get_current_letter(self):
        return self.current_letter

    def reset_current_letter(self):
        self.current_letter = None

    def generate_word(self):
        self.current_word = "panda" #Will have to write some library for this
        return self.current_word

    def get_current_word(self):
        return self.current_word

    def reset_current_word(self):
        self.current_word = None
