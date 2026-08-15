# Authentication

**Base URL:** `/auth`  
**Source:** `backend/api/routes/auth_routes.py`  
**Routes:** 9

Each route below is called as the base URL followed by the root path
(for example `/auth` + `/refresh`).

| Method | Root | Purpose | Response |
| --- | --- | --- | --- |
| `POST` | `/refresh` | Refresh | 200 |
| `GET` | `/me` | Get current user details | 200 |
| `POST` | `/login` | Login | 200 `AuthResponse` |
| `GET` | `/google/login` | Google login | 200 |
| `GET` | `/google/callback` | Google callback | 200 |
| `POST` | `/signup` | Register | 200 `AuthResponse` |
| `POST` | `/logout` | Logout | 200 |
| `POST` | `/forgot-password` | Forgot password | 200 |
| `POST` | `/reset-password` | Reset password | 200 |

## Response schemas

### `AuthResponse`

| Field | Type |
| --- | --- |
| `access_token` | `str` |
| `user` | `UserResponse` |
