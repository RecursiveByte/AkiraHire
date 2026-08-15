# Application evaluations

**Base URL:** `/application-evaluations`  
**Source:** `backend/api/routes/application_evaluation_routes.py`  
**Routes:** 5

Each route below is called as the base URL followed by the root path
(for example `/application-evaluations` + `/{application_id}/evaluate`).

| Method | Root | Purpose | Response |
| --- | --- | --- | --- |
| `POST` | `/{application_id}/evaluate` | Evaluate application | 201 `EvaluateApplicationResponse` |
| `GET` | `/recruiter` | Get my evaluated applications | 200 `list[ApplicationEvaluationResponse]` |
| `GET` | `/` | Get all application evaluations | 200 |
| `POST` | `/top` | Get top evaluations | 200 `list[TopCandidateResponse]` |
| `DELETE` | `/{application_id}` | Delete application evaluation | 200 `DeleteApplicationEvaluationResponse` |

## Response schemas

### `EvaluateApplicationResponse`

| Field | Type |
| --- | --- |
| `application_id` | `int` |
| `match_score` | `int` |
| `reasoning` | `str` |
| `status` | `ApplicationEvaluationStatus` |

### `ApplicationEvaluationResponse`

| Field | Type |
| --- | --- |
| `application_id` | `int` |
| `match_score` | `int` |
| `reasoning` | `str` |
| `status` | `ApplicationEvaluationStatus` |
| `evaluated_at` | `datetime` |
| `updated_at` | `datetime` |

### `TopCandidateResponse`

| Field | Type |
| --- | --- |
| `evaluation` | `ApplicationEvaluationResponse` |
| `full_name` | `str` |
| `email` | `str` |

### `DeleteApplicationEvaluationResponse`

| Field | Type |
| --- | --- |
| `message` | `str` |
