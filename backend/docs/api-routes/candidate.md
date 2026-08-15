# Candidate

**Base URL:** `/candidate`  
**Source:** `backend/api/routes/candidate_routes.py`  
**Routes:** 6

Each route below is called as the base URL followed by the root path
(for example `/candidate` + `/profile`).

| Method | Root | Purpose | Response |
| --- | --- | --- | --- |
| `POST` | `/profile` | Create candidate profile | 200 `CandidateProfileResponse` |
| `GET` | `/profile/{candidate_id}` | Get candidate profile by id | 200 `CandidateProfileResponse` |
| `GET` | `/profile` | Get candidate profile by user id | 200 `CandidateProfileResponse` |
| `PATCH` | `/profile` | Update my candidate profile | 200 `CandidateProfileResponse` |
| `GET` | `/profiles` | Get all candidate profiles | 200 `list[CandidateProfileResponse]` |
| `DELETE` | `/profile/{candidate_id}` | Delete candidate profile | 200 `DeleteCandidateProfileResponse` |

## Response schemas

### `CandidateProfileResponse`

| Field | Type |
| --- | --- |
| `candidate_id` | `int` |
| `user_id` | `int` |
| `full_name` | `str` |
| `email` | `str` |
| `phone` | `str` |
| `resume_url` | `str` |
| `updated_at` | `datetime` |

### `DeleteCandidateProfileResponse`

| Field | Type |
| --- | --- |
| `message` | `str` |
