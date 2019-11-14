from flask import (Flask, render_template, url_for,
                    jsonify, json, Markup, request, Response)
import gevent
from gevent.pywsgi import WSGIServer
import logging
import time
import os
import shutil
import logging
import argparse
import webbrowser
from shelljob import proc
import subprocess
from gevent import monkey


parser = argparse.ArgumentParser()
parser.add_argument("--port", help="Port to use [default - 8089]")
args = parser.parse_args()

IP = '127.0.0.1'
PORT = 8089

if args.port:
    PORT = int(args.port)

ROOT_PATH = os.path.dirname(__file__)

monkey.patch_all()
app = Flask(__name__, root_path=ROOT_PATH)

log = logging.getLogger('werkzeug')
log.disabled = True


# WebApp Handlers

@app.route('/')
def index():
    return render_template("index.html")


@app.route('/lab')
def lab_list():
    return render_template("lab_list.html")


@app.route('/build')
def build_local():
    if "filename" in request.args:
        return render_template("lab.html", learn=False)
    else:
        return render_template("404.html")


@app.route('/lab/<lab_name>')
def lab(lab_name):
    data = open(os.path.join(ROOT_PATH, 'labs.json'))
    data = json.load(data)
    if lab_name in data["problem_statements"]:
        data = data["problem_statements"][lab_name]
        return render_template("lab.html", learn=True, problem_statement=Markup(data["text"]))
    else:
        return "Coming soon..."


# Service Handlers

@app.route('/service/build/cwd')
def service_build_cwd():
    return jsonify(os.getcwd())

@app.route('/service/build/duplicate/')
def service_build_duplicate():
    if "filename" in request.args:
        shutil.copyfile(os.path.join(os.getcwd(), request.args['filename']), os.path.join(os.getcwd(), "copy_" + request.args['filename']))
        return "done"
    else:
        return "no file"


@app.route('/service/build/delete/')
def service_build_delete():
    if "filename" in request.args:
        os.remove(os.path.join(os.getcwd(), request.args['filename']))
        return "done"
    else:
        return "no file"

@app.route('/service/build/create/')
def service_build_create():
    if "filename" in request.args:
        if not os.path.exists(request.args["filename"] + ".aai"):
            with open(request.args["filename"] + ".aai", "w+") as file:
                file.write("")
            return request.args["filename"] + ".aai"
        else:
            return "file exists"
    else:
        return "filename required"

@app.route('/service/build/rename/')
def service_build_rename():
    if "filename" in request.args and "new_filename" in request.args:
        try:
            os.rename(os.path.join(os.getcwd(), request.args['filename']), os.path.join(os.getcwd(), request.args['new_filename']))
        except:
            return "error"
        return "done"
    else:
        return "no file"


@app.route('/service/build/files')
def service_build_files():
    files = [f for f in os.listdir(os.getcwd()) if os.path.isfile(f)]
    response = []
    for file in files:
        if file.endswith(".aai"):
            url = "build?filename="+file
        else:
            url = ""
        response.append((file, url))
    return jsonify(response)


@app.route('/services/getXML')
def getXML():
    if "filename" in request.args:
        filename = request.args["filename"]
        xml_file = open(os.getcwd()+"/"+filename,'r')
        xml = xml_file.read()
        xml_file.close()
        if xml != "":
            return xml
        else:
            return "Error"
    else:
        return "file not found"


@app.route('/services/saveXML', methods=['POST'])
def saveXML():
    filename =request.args["file"]
    data = request.get_data()
    if filename:
        with open(os.getcwd()+"/"+filename,'w') as file:
            file.write(str(data, 'utf-8'))
        return "Saved"
    else:
        return "Error"
        

    

@app.route('/services/saveCode', methods=['POST'])
def saveCode():
    filename = request.args["file"]
    code = request.get_data()
    if filename:
        with open(os.path.join(os.getcwd(),filename.replace('.aai','.py')),'w+') as file:
            file.write(str(code, 'utf-8'))
        return 'Saved'
    else:
        return 'Error'

@app.route('/services/build/execute')
def execute():
    if "filename" in request.args:
        filename = request.args["filename"]
        process = subprocess.Popen([ "python", filename], stdout=subprocess.PIPE)
        def read_process():
            while True:
                output = process.stdout.readline()
                if output == '' and process.poll() is not None:
                    break
                if output:
                    yield "data:" + str(output.strip(), 'utf-8').replace(" ", "d&nbsp;") + "\n\n"
            yield "data:end_of_output\n\n" 
        return Response(read_process(), mimetype='text/event-stream')


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
