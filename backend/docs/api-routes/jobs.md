# Jobs

**Base URL:** `/jobs`  
**Source:** `backend/api/routes/job_routes.py`  
**Routes:** 9

Each route below is called as the base URL followed by the root path
(for example `/jobs` + `/search`).

| Method | Root | Purpose | Response |
| --- | --- | --- | --- |
| `GET` | `/search` | Search jobs | 200 `list[JobResponse]` |
| `GET` | `/recruiter` | Get jobs by recruiter id | 200 `list[JobResponse]` |
| `POST` | `/generate-description` | Generate job description | 200 `GenerateJobDescriptionResponse` |
| `POST` | `/` | Create job | 201 `JobResponse` |
| `GET` | `/{job_id}` | Get job by job id | 200 `JobResponse` |
| `PATCH` | `/{job_id}` | Update job | 200 `JobResponse` |
| `DELETE` | `/{job_id}` | Delete job | 200 `DeleteJobResponse` |
| `PATCH` | `/{job_id}/publish` | Publish job | 200 `JobResponse` |
| `PATCH` | `/{job_id}/close` | Close job | 200 `JobResponse` |

## Response schemas

### `JobResponse`

| Field | Type |
| --- | --- |
| `job_id` | `int` |
| `recruiter_id` | `int` |
| `role` | `str` |
| `job_description` | `str` |
| `status` | `str` |
| `application_deadline` | `datetime` |
| `created_at` | `datetime` |
| `updated_at` | `datetime` |

### `GenerateJobDescriptionResponse`

| Field | Type |
| --- | --- |
| `role` | `str` |
| `job_description` | `str` |
| `application_deadline` | `datetime` |

### `DeleteJobResponse`

| Field | Type |
| --- | --- |
| `message` | `DescriptionStr` |
