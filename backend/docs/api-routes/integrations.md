# Integrations

**Base URL:** `/integrations`  
**Source:** `backend/integration/routes.py`  
**Routes:** 2

Each route below is called as the base URL followed by the root path
(for example `/integrations` + `/`).

| Method | Root | Purpose | Response |
| --- | --- | --- | --- |
| `GET` | `/` | Get integrations | 200 `list[IntegrationResponse]` |
| `DELETE` | `/connected-accounts/{account_id}` | Disconnect account | 200 |

## Response schemas

### `IntegrationResponse`

| Field | Type |
| --- | --- |
| `id` | `Optional[int]` |
| `name` | `str` |
| `provider` | `str` |
| `connected` | `bool` |
