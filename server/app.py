from flask import Flask
from config import create_app, db
from flask_migrate import upgrade
from auth.routes import auth_bp
from events.routes import events_bp

app = create_app()
app.static_folder = 'static'

# Register blueprints
app.register_blueprint(auth_bp, url_prefix='/auth')
app.register_blueprint(events_bp, url_prefix='/events')

# Temporary migration route
@app.route("/run-migrations")
def run_migrations():
    try:
        upgrade()
        return "✅ Database migration successful"
    except Exception as e:
        return f"❌ Migration failed: {str(e)}"

# Home route
@app.route("/")
def home():
    return "🎉 Welcome to our API!"
