# ToDo List - Node.js & SQLite

A simple ToDo List application with a Node.js backend using SQLite for data storage, and a separate frontend.

---

## Backend

The backend is built with Node.js, Express, and SQLite.

### How to run the backend

1. Go to the backend folder:
   ```bash
   cd backend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the server:
   ```bash
   npm start
   ```

---

## Frontend

The frontend is a static web app (HTML, CSS, JS).

- You can serve it using any static file server, for example:
  - Apache, Nginx, or even VS Code Live Server extension.

- Make sure your frontend JavaScript fetches API requests from the correct backend URL.

  > **Note:** If your backend runs on `http://localhost:3000`, your frontend's fetch requests in `frontend/script.js` should use that URL.

---

## Project structure

```
/backend     # Node.js + Express + SQLite backend
/frontend    # Static frontend files (HTML, CSS, JS)
```