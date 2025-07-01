# server/config.py
import os
from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from flask_cors import CORS
from flask_session import Session
from flask_migrate import Migrate

db = SQLAlchemy()
migrate = Migrate()
sess = Session()

def create_app():
    app = Flask(__name__)

    # Configs
    app.config['SECRET_KEY'] = os.environ.get("SECRET_KEY", "super-secret")
    app.config['SQLALCHEMY_DATABASE_URI'] = "postgresql://maverick:pharaoh@localhost:5432/mkay_events"
    app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

    # Sessions
    app.config['SESSION_TYPE'] = "filesystem"  # You can switch to 'sqlalchemy' later
    app.config['SESSION_PERMANENT'] = False
    app.config['SESSION_COOKIE_HTTPONLY'] = True
    app.config['SESSION_COOKIE_SAMESITE'] = "None"  # Important for cross-origin
    app.config['SESSION_COOKIE_SECURE'] = True      # Important for HTTPS (on Render)

    # Init extensions
    db.init_app(app)
    migrate.init_app(app, db)
    sess.init_app(app)
    CORS(app, supports_credentials=True)

    return app
