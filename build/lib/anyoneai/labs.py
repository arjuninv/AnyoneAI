from flask import (
    Flask,
    render_template,
    url_for,
    jsonify,
    json,
    Markup
    )
from gevent.pywsgi import WSGIServer
import logging
import time
import os
import logging

IP = '127.0.0.1'

if "templates" not in os.listdir('.'):
    os.chdir(os.getcwd() +  "\\anyoneai\\")

app = Flask(__name__, root_path=os.getcwd())

log = logging.getLogger('werkzeug')
log.disabled = True

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

def main():    
    # app.run(host='localhost', threaded=True, port=30, debug=False)
    http_server = WSGIServer((IP, 80), app)
    print("Serving on {}".format("http://" + IP + "/"))
    http_server.serve_forever()
