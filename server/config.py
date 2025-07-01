# server/config.py

from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from flask_session import Session
from flask_cors import CORS

db = SQLAlchemy()
sess = Session()

def create_app():
    app = Flask(__name__)

    # Base config
    app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///app.db'  # or PostgreSQL
    app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
    app.config['SECRET_KEY'] = 'super-secret-key'  # Make this stronger in prod

    # ✅ Flask-Session config
    app.config['SESSION_TYPE'] = 'filesystem'       # or 'sqlalchemy' for db sessions
    app.config['SESSION_PERMANENT'] = False
    app.config['SESSION_USE_SIGNER'] = True
    app.config['SESSION_COOKIE_HTTPONLY'] = True

    # ✅ IMPORTANT for production on Render (HTTPS)
    app.config['SESSION_COOKIE_SAMESITE'] = 'None'
    app.config['SESSION_COOKIE_SECURE'] = True  # Needed for HTTPS

    # Init extensions
    db.init_app(app)
    sess.init_app(app)

    # ✅ Enable CORS with credentials
    CORS(app, supports_credentials=True)

    return app
