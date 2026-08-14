# Forms

**Base URL:** `/forms`  
**Source:** `backend/api/routes/form_routes.py`  
**Routes:** 10

Each route below is called as the base URL followed by the root path
(for example `/forms` + `/generate-form-schema-json`).

| Method | Root | Purpose |
| --- | --- | --- |
| `POST` | `/generate-form-schema-json` | Generate form schema |
| `POST` | `/` | Create form |
| `GET` | `/with-job` | Get forms with job |
| `GET` | `/{form_id}` | Get form by id |
| `GET` | `/{form_id}/with-job` | Get form with job |
| `GET` | `/job/{job_id}` | Get form by job id |
| `GET` | `/recruiter/` | Get my forms |
| `PATCH` | `/{form_id}/publish` | Publish form |
| `PATCH` | `/{form_id}/close` | Close form |
| `DELETE` | `/{form_id}` | Delete form |
