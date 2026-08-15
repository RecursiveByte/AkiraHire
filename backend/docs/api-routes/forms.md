# Forms

**Base URL:** `/forms`  
**Source:** `backend/api/routes/form_routes.py`  
**Routes:** 9

Each route below is called as the base URL followed by the root path
(for example `/forms` + `/generate-form-schema-json`).

| Method | Root | Purpose | Response |
| --- | --- | --- | --- |
| `POST` | `/generate-form-schema-json` | Generate form schema | 200 `GeneratedFormSchemaResponse` |
| `POST` | `/` | Create form | 201 `CreateFormResponse` |
| `GET` | `/with-job` | Get forms with job | 200 `list[GetFormWithJobResponse]` |
| `GET` | `/{form_id}` | Get form by id | 200 `GetFormResponse` |
| `GET` | `/job/{job_id}` | Get form by job id | 200 `GetFormResponse` |
| `GET` | `/recruiter/` | Get my forms | 200 `list[GetFormResponse]` |
| `PATCH` | `/{form_id}/publish` | Publish form | 200 `PublishFormResponse` |
| `PATCH` | `/{form_id}/close` | Close form | 200 `CloseFormResponse` |
| `DELETE` | `/{form_id}` | Delete form | 200 `DeleteFormResponse` |

## Response schemas

### `GeneratedFormSchemaResponse`

| Field | Type |
| --- | --- |
| `title` | `str` |
| `description` | `str` |
| `links` | `list[LinkField]` |
| `additional_questions` | `list[AdditionalQuestion]` |

### `CreateFormResponse`

| Field | Type |
| --- | --- |
| `form_id` | `int` |
| `job_id` | `int` |
| `title` | `str` |
| `status` | `FormStatus` |
| `form_schema_json` | `GeneratedFormSchemaResponse` |
| `expires_at` | `datetime` |
| `created_at` | `datetime` |
| `updated_at` | `datetime` |

### `GetFormWithJobResponse`

| Field | Type |
| --- | --- |
| `form_id` | `int` |
| `job_id` | `int` |
| `job_role` | `str` |
| `job_description` | `str` |
| `title` | `str` |
| `status` | `FormStatus` |
| `form_schema_json` | `GeneratedFormSchemaResponse` |
| `expires_at` | `datetime` |
| `created_at` | `datetime` |
| `updated_at` | `datetime` |

### `GetFormResponse`

| Field | Type |
| --- | --- |
| `form_id` | `int` |
| `job_id` | `int` |
| `title` | `str` |
| `status` | `FormStatus` |
| `form_schema_json` | `GeneratedFormSchemaResponse` |
| `expires_at` | `datetime` |
| `created_at` | `datetime` |
| `updated_at` | `datetime` |

### `PublishFormResponse`

| Field | Type |
| --- | --- |
| `form_id` | `int` |
| `status` | `FormStatus` |

### `CloseFormResponse`

| Field | Type |
| --- | --- |
| `form_id` | `int` |
| `status` | `FormStatus` |

### `DeleteFormResponse`

| Field | Type |
| --- | --- |
| `message` | `str` |
