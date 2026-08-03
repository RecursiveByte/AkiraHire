export interface CandidateListItem {
  id: number;
  fullName: string;
  email: string;
  phone: string;
}

export interface RecruiterListItem {
  id: number;
  name: string;
  email: string;
}

export interface DashboardStats {
  candidates: number;
  recruiters: number;
  jobs: number;
  applications: number;
}

export interface RecentActivity {
  candidates: number;
  recruiters: number;
  jobs: number;
  applications: number;
}

export interface Dashboard {
  stats: DashboardStats;
  activity: RecentActivity;
}
