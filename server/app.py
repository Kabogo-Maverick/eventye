# server/app.py

from flask import Flask
from config import create_app, db
from flask_migrate import Migrate
from auth.routes import auth_bp
from events.routes import events_bp

app = create_app()
app.static_folder = 'static'

# Migrations already initialized inside config, so not needed again here
# But if you want logging:
# migrate = Migrate(app, db)

# Register routes
app.register_blueprint(auth_bp, url_prefix='/auth')
app.register_blueprint(events_bp, url_prefix='/events')

# Optional table creation (ONLY if not using Flask-Migrate — not recommended)
# with app.app_context():
#     db.create_all()
