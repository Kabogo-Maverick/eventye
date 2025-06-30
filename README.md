### ✅ MkayEvents API Auth Endpoints

All requests use `http://localhost:5000`

- **POST /auth/register**
    - Body: `{ "username": "testuser", "password": "pass123" }`
    - Response: `{ "id": 1, "username": "testuser" }`
    - Sets session cookie

- **POST /auth/login**
    - Body: `{ "username": "testuser", "password": "pass123" }`
    - Response: `{ "id": 1, "username": "testuser" }`
    - Sets session cookie

- **GET /auth/check_session**
    - Requires session cookie
    - Response: `{ "id": 1, "username": "testuser" }` if logged in
    - Else: `{ "error": "Unauthorized" }`

- **POST /auth/logout**
    - Clears session
    - Response: `{ "message": "Logged out" }`
