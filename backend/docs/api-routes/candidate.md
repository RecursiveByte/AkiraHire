# Candidate

**Base URL:** `/candidate`  
**Source:** `backend/api/routes/candidate_routes.py`  
**Routes:** 6

Each route below is called as the base URL followed by the root path
(for example `/candidate` + `/profile`).

| Method | Root | Purpose |
| --- | --- | --- |
| `POST` | `/profile` | Create candidate profile |
| `GET` | `/profile/{candidate_id}` | Get candidate profile by id |
| `GET` | `/profile` | Get candidate profile by user id |
| `PATCH` | `/profile` | Update my candidate profile |
| `GET` | `/profiles` | Get all candidate profiles |
| `DELETE` | `/profile/{candidate_id}` | Delete candidate profile |
