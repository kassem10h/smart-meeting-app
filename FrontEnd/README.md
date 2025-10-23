# Smart Meeting Frontend (React + Vite)

Run locally:
```bash
npm install
npm run dev
```

By default it points to the backend:
```
https://localhost:5246/api
```
Change it in `src/services/api.js` if your port is different.

## Pages
- `/` Login (expects POST /Auth/login to return { token })
- `/dashboard` Dashboard (protected)
- `/meetings` List meetings (GET /Meeting)
- `/employees` List employees (GET /Employee)
- `/rooms` List rooms (GET /Room)

## Notes
- JWT token is stored in localStorage under `token`.
- Requests include `Authorization: Bearer <token>` automatically.
- `AutoTable` renders any JSON array shape for quick integration.
