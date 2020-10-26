import os
from flask import Flask, current_app, send_file
from flask_cors import CORS


app = Flask(__name__, static_folder='../dist/static')
CORS(app)

from .config import Config
app.logger.debug(f'>>> {Config.FLASK_ENV}')
# app.logger.debug(f'>>> {Config.SECRET_KEY}')


@app.route('/')
def index():
    return send_file(
        os.path.join(
            current_app.config['DIST_DIR'], 'index.html'))
