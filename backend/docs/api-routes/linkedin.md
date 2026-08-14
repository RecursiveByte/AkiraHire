# LinkedIn

**Base URL:** `/linkedin`  
**Source:** `backend/integration/linkedin/api/routes/linkedin_post_routes.py`  
**Routes:** 6

Each route below is called as the base URL followed by the root path
(for example `/linkedin` + `/auth/connect`).

| Method | Root | Purpose |
| --- | --- | --- |
| `GET` | `/auth/connect` | Login |
| `GET` | `/auth/callback` | Callback |
| `POST` | `/generate-post` | Generate post |
| `GET` | `/drafts` | List drafts |
| `DELETE` | `/drafts/{draft_id}` | Delete draft |
| `POST` | `/publish-post` | Confirm post |
