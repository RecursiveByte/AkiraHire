from pydantic import BaseModel
from datetime import date

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
    
class UserDistributionResponse(BaseModel):
    candidates: int
    recruiters: int
    




class UserGrowthItemResponse(BaseModel):
    date: date
    candidates: int
    recruiters: int