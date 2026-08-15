# LinkedIn

**Base URL:** `/linkedin`  
**Source:** `backend/integration/linkedin/api/routes/linkedin_post_routes.py`  
**Routes:** 6

Each route below is called as the base URL followed by the root path
(for example `/linkedin` + `/auth/connect`).

| Method | Root | Purpose | Response |
| --- | --- | --- | --- |
| `GET` | `/auth/connect` | Login | 200 |
| `GET` | `/auth/callback` | Callback | 200 |
| `POST` | `/generate-post` | Generate post | 200 `LinkedInDraftResponse` |
| `GET` | `/drafts` | List drafts | 200 `List[LinkedInDraftResponse]` |
| `DELETE` | `/drafts/{draft_id}` | Delete draft | 204 |
| `POST` | `/publish-post` | Confirm post | 200 `LinkedInPostResponse` |
