# Admin

**Base URL:** `/admin`  
**Source:** `backend/api/routes/admin_routes.py`  
**Routes:** 3

Each route below is called as the base URL followed by the root path
(for example `/admin` + `/dashboard`).

| Method | Root | Purpose | Response |
| --- | --- | --- | --- |
| `GET` | `/dashboard` | Get dashboard | 200 `DashboardResponse` |
| `GET` | `/analytics/user-distribution` | Get user distribution | 200 `UserDistributionResponse` |
| `GET` | `/analytics/user-growth` | Get user growth | 200 `list[UserGrowthItemResponse]` |

## Response schemas

### `DashboardResponse`

| Field | Type |
| --- | --- |
| `stats` | `DashboardStatsResponse` |
| `activity` | `RecentActivityResponse` |

### `UserDistributionResponse`

| Field | Type |
| --- | --- |
| `candidates` | `int` |
| `recruiters` | `int` |

### `UserGrowthItemResponse`

| Field | Type |
| --- | --- |
| `date` | `date` |
| `candidates` | `int` |
| `recruiters` | `int` |
