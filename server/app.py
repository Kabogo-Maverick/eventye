from flask import Flask, jsonify
from config import create_app, db
from flask_migrate import upgrade
from auth.routes import auth_bp
from events.routes import events_bp

app = create_app()
app.static_folder = 'static'

# Register blueprints
app.register_blueprint(auth_bp, url_prefix='/auth')
app.register_blueprint(events_bp, url_prefix='/events')

from flask import Flask, jsonify



@app.route("/run-migrations")
def run_migrations():
    try:
        upgrade()
        return jsonify(message="✅ Database migration successful")
    except Exception as e:
        print("Migration error:", e)  # log for Render logs
        return jsonify(error=f"❌ Migration failed: {str(e)}"), 500


# Home route
@app.route("/")
def home():
    return "🎉 Welcome to our API!"
