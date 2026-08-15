# Recruiter

**Base URL:** `/recruiter`  
**Source:** `backend/api/routes/recruiter_routes.py`  
**Routes:** 2

Each route below is called as the base URL followed by the root path
(for example `/recruiter` + `/profiles`).

| Method | Root | Purpose | Response |
| --- | --- | --- | --- |
| `GET` | `/profiles` | Get all recruiters | 200 `list[RecruiterListResponse]` |
| `DELETE` | `/profile/{recruiter_id}` | Delete recruiter | 200 `DeleteRecruiterResponse` |

## Response schemas

### `RecruiterListResponse`

| Field | Type |
| --- | --- |
| `id` | `int` |
| `name` | `str` |
| `email` | `EmailStr` |

### `DeleteRecruiterResponse`

| Field | Type |
| --- | --- |
| `message` | `str` |
