from flask import (Flask, render_template, url_for,
                    jsonify, json, Markup)
from gevent.pywsgi import WSGIServer
import logging
import time
import os
import logging
import argparse

parser = argparse.ArgumentParser()
parser.add_argument("--port", help="Port to use [default - 8089]")
args = parser.parse_args()

IP = '127.0.0.1'
PORT = 8089

if args.port:
    PORT = int(args.port)

ROOT_PATH = os.path.dirname(__file__)

app = Flask(__name__, root_path=ROOT_PATH)

log = logging.getLogger('werkzeug')
log.disabled = True


@app.route('/')
def index():
    return render_template("index.html")


@app.route('/lab')
def lab_list():
    return render_template("lab_list.html")


@app.route('/lab/<lab_name>')
def lab(lab_name):
    data = open(os.path.join(ROOT_PATH, 'labs.json'))
    data = json.load(data)
    if lab_name in data["problem_statements"]:
        data = data["problem_statements"][lab_name]
        return render_template("lab.html", problem_statement=Markup(data["text"]))
    else:
        return "Coming soon..."


@app.route('/service/build/cwd')
def service_build_cwd():
    return jsonify(os.getcwd())

@app.route('/service/build/files')
def service_build_files():
    files = os.listdir()
    response = []
    for file in files:
        if file.endswith(".aai"):
            url = file + ".aai"
        else:
            url = ""
        response.append((file, url))
    return jsonify(response)


@app.route('/service/labs')
def service_labs():
    data = open(os.path.join(ROOT_PATH, 'labs.json'))
    data = json.load(data)
    return jsonify(data["levels"])




@app.route('/service/labs/<level>')
def service_labs_level(level):
    data = open(os.path.join(ROOT_PATH, 'labs.json'))
    data = json.load(data)
    if level in data["labs"]:
        return jsonify(data["labs"][level])
    else:
        return jsonify({"error": "lab does not exist"})


def main():
    app.debug = True
    http_server = WSGIServer((IP, PORT), app)
    print("Serving on {}".format("http://" + IP + ":" + str(PORT)))
    http_server.serve_forever()

if __name__ == "__main__":
    main()