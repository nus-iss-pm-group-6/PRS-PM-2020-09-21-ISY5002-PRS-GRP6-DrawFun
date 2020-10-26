import os
from base64 import b64decode

from app import app


class Config(object):
    FLASK_ENV = os.getenv('FLASK_ENV', 'production')
    SECRET_KEY = b64decode(
        os.getenv('FLASK_SECRET', 'c2VjcmV0').encode('utf-8')).decode('utf-8')
    APP_DIR = os.path.dirname(__file__)
    ROOT_DIR = os.path.dirname(APP_DIR)
    DIST_DIR = os.path.join(ROOT_DIR, 'dist')
    if not os.path.exists(DIST_DIR):
        raise Exception(f'DIST_DIR not found: {DIST_DIR}')


app.config.from_object('app.config.Config')
