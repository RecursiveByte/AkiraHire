# Applications

**Base URL:** `/applications`  
**Source:** `backend/api/routes/application_routes.py`  
**Routes:** 12

Each route below is called as the base URL followed by the root path
(for example `/applications` + `/applied-form-ids`).

| Method | Root | Purpose | Response |
| --- | --- | --- | --- |
| `GET` | `/applied-form-ids` | Get applied form ids | 200 |
| `GET` | `/candidate/` | Search candidate applications | 200 |
| `GET` | `/recruiter/view` | Get recruiter applications | 200 |
| `POST` | `/` | Create application | 201 `CreateApplicationResponse` |
| `GET` | `/{application_id}` | Get application by id | 200 `GetApplicationResponse` |
| `GET` | `/recruiter/{recruiter_id}` | Get applications by recruiter id | 200 |
| `GET` | `/{application_id}/view` | Get application with form | 200 |
| `GET` | `/recruiter/{recruiter_id}/view` | Get all applications with form by recruiter id | 200 |
| `GET` | `/candidate/{candidate_id}/view` | Get all applications with form by recruiter id | 200 |
| `GET` | `/{application_id}` | Get application by id | 200 `GetApplicationResponse` |
| `PATCH` | `/{application_id}` | Update application | 200 `UpdateApplicationResponse` |
| `DELETE` | `/{application_id}` | Delete application | 200 `DeleteApplicationResponse` |

## Response schemas

### `CreateApplicationResponse`

| Field | Type |
| --- | --- |
| `application_id` | `int` |
| `form_id` | `int` |
| `submitted_at` | `datetime` |

### `GetApplicationResponse`

| Field | Type |
| --- | --- |
| `application_id` | `int` |
| `form_id` | `int` |
| `candidate_profile` | `CandidateProfileRequest` |
| `links` | `list[ApplicationLinkRequest]` |
| `answers` | `list[ApplicationAnswerRequest]` |
| `submitted_at` | `datetime` |

### `UpdateApplicationResponse`

| Field | Type |
| --- | --- |
| `application_id` | `int` |
| `form_id` | `int` |
| `candidate_profile` | `CandidateProfileRequest` |
| `links` | `list[ApplicationLinkRequest]` |
| `answers` | `list[ApplicationAnswerRequest]` |
| `submitted_at` | `datetime` |

### `DeleteApplicationResponse`

| Field | Type |
| --- | --- |
| `message` | `str` |
