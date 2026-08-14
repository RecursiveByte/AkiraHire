# Jobs

**Base URL:** `/jobs`  
**Source:** `backend/api/routes/job_routes.py`  
**Routes:** 9

Each route below is called as the base URL followed by the root path
(for example `/jobs` + `/search`).

| Method | Root | Purpose |
| --- | --- | --- |
| `GET` | `/search` | Search jobs |
| `GET` | `/recruiter` | Get jobs by recruiter id |
| `POST` | `/generate-description` | Generate job description |
| `POST` | `/` | Create job |
| `GET` | `/{job_id}` | Get job by job id |
| `PATCH` | `/{job_id}` | Update job |
| `DELETE` | `/{job_id}` | Delete job |
| `PATCH` | `/{job_id}/publish` | Publish job |
| `PATCH` | `/{job_id}/close` | Close job |
