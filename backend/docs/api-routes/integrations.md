# Integrations

**Base URL:** `/integrations`  
**Source:** `backend/integration/routes.py`  
**Routes:** 2

Each route below is called as the base URL followed by the root path
(for example `/integrations` + `/`).

| Method | Root | Purpose |
| --- | --- | --- |
| `GET` | `/` | Get integrations |
| `DELETE` | `/connected-accounts/{account_id}` | Disconnect account |
