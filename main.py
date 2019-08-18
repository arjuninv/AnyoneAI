from flask import Flask
from flask import render_template, url_for
from flask import jsonify
from flask import json
from flask import Markup

import firebase_admin
from firebase_admin import credentials
from firebase_admin import auth

import time

app = Flask(__name__)
cred = credentials.Certificate("static/anyoneai-firebase-adminsdk-h6lci-279440998b.json")
firebase_admin.initialize_app(cred)

@app.route('/')
def index():
    return render_template("index.html")

@app.route('/login')
def login():
    return render_template("login.html")

@app.route('/service/labs')
def service_labs():
    data = open('labs.json')
    data = json.load(data)
    return jsonify(data["levels"])


@app.route('/service/labs/<level>')
def service_labs_level(level):
    data = open('labs.json')
    data = json.load(data)
    if level in data["labs"]:
        return jsonify(data["labs"][level])
    else:
        return jsonify({"error": "lab does not exist"})

@app.route('/lab/<lab_name>')
def lab(lab_name):
    data = open('labs.json')
    data = json.load(data)
    if lab_name in data["problem_statements"]:
        data = data["problem_statements"][lab_name]
        return render_template("lab.html", problem_statement=Markup(data["text"]))
    else:
        return "Coming soon..."



if __name__ == '__main__':
    app.run(host='localhost', threaded=True, port=30, debug=True)