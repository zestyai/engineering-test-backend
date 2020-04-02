from flask import Flask
from flask_sqlalchemy import SQLAlchemy

app = Flask(__name__)

DB_URL = 'postgresql+psycopg2://{user}:{pw}@{host}:{port}/{db}'.format(user='postgres',pw='engineTest888',host='localhost', port='5555',db='zesty')

app.config['SQLALCHEMY_DATABASE_URI'] = DB_URL
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False # silence the deprecation warning

db = SQLAlchemy(app)


@app.route('/')
def landing():
	return ""


if __name__ == '__main__':
	app.run(debug=True)
