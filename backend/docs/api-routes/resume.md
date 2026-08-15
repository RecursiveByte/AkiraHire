# Resume

**Base URL:** `/resume`  
**Source:** `backend/api/routes/resume_routes.py`  
**Routes:** 2

Each route below is called as the base URL followed by the root path
(for example `/resume` + `/read`).

| Method | Root | Purpose | Response |
| --- | --- | --- | --- |
| `POST` | `/read` | Read resume | 200 `ReadResumeResponse` |
| `POST` | `/upload` | Upload resume | 200 |

## Response schemas

### `ReadResumeResponse`

| Field | Type |
| --- | --- |
| `content` | `str` |
