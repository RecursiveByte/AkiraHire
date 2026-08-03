from pydantic import BaseModel


class DashboardStatsResponse(BaseModel):
    candidates: int
    recruiters: int
    jobs: int
    applications: int
    
class RecentActivityResponse(BaseModel):
    candidates: int
    recruiters: int
    jobs: int
    applications: int
    
class DashboardResponse(BaseModel):
    stats: DashboardStatsResponse
    activity: RecentActivityResponse