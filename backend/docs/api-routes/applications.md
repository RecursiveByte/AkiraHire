# Applications

**Base URL:** `/applications`  
**Source:** `backend/api/routes/application_routes.py`  
**Routes:** 13

Each route below is called as the base URL followed by the root path
(for example `/applications` + `/applied-form-ids`).

| Method | Root | Purpose |
| --- | --- | --- |
| `GET` | `/applied-form-ids` | Get applied form ids |
| `GET` | `/candidate/` | Search candidate applications |
| `GET` | `/candidate/view` | Get candidate applications |
| `GET` | `/recruiter/view` | Get recruiter applications |
| `POST` | `/` | Create application |
| `GET` | `/{application_id}` | Get application by id |
| `GET` | `/recruiter/{recruiter_id}` | Get applications by recruiter id |
| `GET` | `/{application_id}/view` | Get application with form |
| `GET` | `/recruiter/{recruiter_id}/view` | Get all applications with form by recruiter id |
| `GET` | `/candidate/{candidate_id}/view` | Get all applications with form by recruiter id |
| `GET` | `/{application_id}` | Get application by id |
| `PATCH` | `/{application_id}` | Update application |
| `DELETE` | `/{application_id}` | Delete application |
