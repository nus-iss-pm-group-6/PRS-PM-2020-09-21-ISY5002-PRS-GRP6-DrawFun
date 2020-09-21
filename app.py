from flask import Flask, request, render_template
from flask_cors import CORS

app = Flask(__name__)
CORS(app)  # 解决跨域
app.debug = True  # 自动重启
SECRET_KEY = '*\xff\x93\xc8w\x13\x0e@3\xd6\x82\x0f\x84\x18\xe7\xd9\\|\x04e\xb9(\xfd\xc3'
app.config['SECRET_KEY'] = 'SECRET_KEY'

@app.route('/')
def hello_world():
    return 'Hello World!'

@app.route('/index')
def getIndex():
    return render_template("index.html")

if __name__ == '__main__':
    app.run()
