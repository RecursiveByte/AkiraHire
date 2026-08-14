# Application evaluations

**Base URL:** `/application-evaluations`  
**Source:** `backend/api/routes/application_evaluation_routes.py`  
**Routes:** 5

Each route below is called as the base URL followed by the root path
(for example `/application-evaluations` + `/{application_id}/evaluate`).

| Method | Root | Purpose |
| --- | --- | --- |
| `POST` | `/{application_id}/evaluate` | Evaluate application |
| `GET` | `/recruiter` | Get my evaluated applications |
| `GET` | `/` | Get all application evaluations |
| `POST` | `/top` | Get top evaluations |
| `DELETE` | `/{application_id}` | Delete application evaluation |
