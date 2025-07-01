# 🗓️ Event Planner App (Flask + React)

This is a full-stack event planning app that allows **admins** to create public events and **users** to manage their own personal event list. Users can duplicate public events to their own calendar, make reservations, and manage personal entries.

---

## 📦 Features

### 👥 User
- Register and login securely
- View public events
- Duplicate public events to "My Events"
- Delete their own copied events
- Reserve a seat for any event

### 👑 Admin
- Login with special credentials
- Create, update, and delete events
- Manage global public events

---


## TO CHECK ON THE ADMIN LOGINS AND OPERATIONS,AFTER SEEDING THE PASS IS user> "admin" pass> "adminpass"

## Clone the repo

```bash
git clone https://github.com/Kabogo-Maverick/mvents.git
cd mvents/server
```

## Create and activate virtual environment
```console
python -m venv venv
source venv/bin/activate
```



## Install Dependencies
```console
pip install -r requirements.txt
```

# Run Flask
```console
flask run
```

## 🌐 Frontend (React)
Navigate to frontend
```console
cd ../client
```

## Install dependencies
```console
npm install
```
## Start the frontend dev server
```console
npm run dev

Default frontend runs on: http://localhost:5173

```
## 🛠 Tech Stack

Frontend: React, Axios, Vite

Backend: Flask, Flask-SQLAlchemy, Flask-CORS, Werkzeug

Database: SQLite (default), easily swappable with PostgreSQL

## Currently working on redeploying with render