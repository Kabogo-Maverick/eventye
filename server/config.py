# server/config.py
import os
from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from flask_cors import CORS
from flask_session import Session
from flask_migrate import Migrate
from dotenv import load_dotenv

load_dotenv()  # Load .env variables

# Initialize extensions
db = SQLAlchemy()
migrate = Migrate()
sess = Session()

def create_app():
    app = Flask(__name__)

    # --- Configuration ---
    app.config['SECRET_KEY'] = os.environ.get("SECRET_KEY", "super-secret")
    app.config['SQLALCHEMY_DATABASE_URI'] = os.environ.get("DATABASE_URL")  # Load from .env
    app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

    # --- Session Management ---
    app.config['SESSION_TYPE'] = "filesystem"
    app.config['SESSION_PERMANENT'] = False
    app.config['SESSION_COOKIE_HTTPONLY'] = True
    app.config['SESSION_COOKIE_SAMESITE'] = "None"  # Required for frontend to access session
    app.config['SESSION_COOKIE_SECURE'] = True      # Must be True on Render (uses HTTPS)

    # --- Initialize Extensions ---
    db.init_app(app)
    migrate.init_app(app, db)
    sess.init_app(app)
    CORS(app, supports_credentials=True)

    return app
