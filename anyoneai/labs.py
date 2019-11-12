from flask import (Flask, render_template, url_for,
                    jsonify, json, Markup, request)
import gevent
from gevent.pywsgi import WSGIServer
import logging
import time
import os
import shutil
import logging
import argparse
import webbrowser

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


@app.route('/build')
def build():
    return render_template("lab.html", learn=False)


@app.route('/lab/<lab_name>')
def lab(lab_name):
    data = open(os.path.join(ROOT_PATH, 'labs.json'))
    data = json.load(data)
    if lab_name in data["problem_statements"]:
        data = data["problem_statements"][lab_name]
        return render_template("lab.html", learn=True, problem_statement=Markup(data["text"]))
    else:
        return "Coming soon..."


@app.route('/service/build/cwd')
def service_build_cwd():
    return jsonify(os.getcwd())

@app.route('/service/build/duplicate/')
def service_build_duplicate():
    if "file" in request.args:
        shutil.copyfile(os.path.join(os.getcwd(), request.args['file']), os.path.join(os.getcwd(), "copy_" + request.args['file']))
        return "done"
    else:
        return "no file"


@app.route('/service/build/delete/')
def service_build_delete():
    if "file" in request.args:
        os.remove(os.path.join(os.getcwd(), request.args['file']))
        return "done"
    else:
        return "no file"

# @app.route('/service/build/rename/')
# def service_build_rename():
#     if "file" in request.args:
#         os.rename(os.path.join(os.getcwd(), request.args['file']), os.path.join(os.getcwd(), "copy_" + request.args['file']))
#         return "done"
#     else:
#         return "no file"


@app.route('/service/build/files')
def service_build_files():
    files = [f for f in os.listdir(os.getcwd()) if os.path.isfile(f)]
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
    http_server = WSGIServer((IP, PORT), app, log=None)
    url = "http://" + IP + ":" + str(PORT) + "/"
    print("AnyoneAI Lab session running on {}".format(url))
    webbrowser.open(url)
    http_server.serve_forever()
    

if __name__ == "__main__":
    main()