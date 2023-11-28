from flask import Flask, send_from_directory, redirect, send_file

app = Flask(__name__)

@app.route('/')
def root():
    return redirect('/index/en', code=301)

@app.route('/index/<language>')
def index(language):

    return send_from_directory(
        '/app/static',
        f'index.{language}.html'
    )

@app.route('/static/<file>')
def static_route(file):
    return send_from_directory('/app/static', file)

if __name__ == '__main__':
    app.run(host='0.0.0.0', host=8001)
