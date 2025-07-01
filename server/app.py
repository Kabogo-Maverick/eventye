# server/app.py

from flask import Flask, jsonify
from config import create_app, db
from flask_migrate import upgrade
from auth.routes import auth_bp
from events.routes import events_bp
from models import User, Event
from werkzeug.security import generate_password_hash

app = create_app()
app.static_folder = 'static'

# Register blueprints
app.register_blueprint(auth_bp, url_prefix='/auth')
app.register_blueprint(events_bp, url_prefix='/events')

# Auto-migrate on app start
with app.app_context():
    try:
        upgrade()
        print("✅ Database migrated")
    except Exception as e:
        print(f"❌ DB migration error: {e}")

# Home route
@app.route("/")
def home():
    return "🎉 Welcome to our API!"

# TEMP SEED ROUTE FOR RENDER ONLY
@app.route("/seed")
def seed_data():
    try:
        # Clear old data
        Event.query.delete()
        User.query.delete()

        # Users
        admin = User(
            username="admin",
            is_admin=True,
            password_hash=generate_password_hash("adminpass")
        )
        user = User(
            username="user",
            is_admin=False,
            password_hash=generate_password_hash("userpass")
        )
        db.session.add_all([admin, user])
        db.session.commit()

        # Events
        e1 = Event(
            title="Public Launch",
            description="Launching our event portal",
            date="2025-07-01",
            image_url="https://eventye-20.onrender.com/static/ima1.jpeg",
            user_id=admin.id
        )
        e2 = Event(
            title="User Meetup",
            description="Networking and games",
            date="2025-07-05",
            image_url="https://eventye-20.onrender.com/static/ima2.jpeg",
            user_id=user.id
        )
        db.session.add_all([e1, e2])
        db.session.commit()

        return jsonify(message="✅ Seeded Render DB with users and events")

    except Exception as e:
        print("❌ Seeding error:", e)
        return jsonify(error=str(e)), 500
