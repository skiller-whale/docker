from flask import Flask, jsonify

app = Flask(__name__)

@app.route('/')
def index():
    return 'Hello'

@app.route('/get_secret')
def get_secret():
    # Don't put secrets in source code!
    #   For exercise purposes only.
    return jsonify({'secret': 'supersecret'})

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=2001)
