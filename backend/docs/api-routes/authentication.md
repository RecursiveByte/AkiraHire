# Authentication

**Base URL:** `/auth`  
**Source:** `backend/api/routes/auth_routes.py`  
**Routes:** 9

Each route below is called as the base URL followed by the root path
(for example `/auth` + `/refresh`).

| Method | Root | Purpose |
| --- | --- | --- |
| `POST` | `/refresh` | Refresh |
| `GET` | `/me` | Get current user details |
| `POST` | `/login` | Login |
| `GET` | `/google/login` | Google login |
| `GET` | `/google/callback` | Google callback |
| `POST` | `/signup` | Register |
| `POST` | `/logout` | Logout |
| `POST` | `/forgot-password` | Forgot password |
| `POST` | `/reset-password` | Reset password |
