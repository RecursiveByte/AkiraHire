export interface CandidateProfile {
  fullName: string;
  email: string;
  phone: string;
}

export interface CandidateResume {
  fileName: string;
  fileUrl: string;
  updatedAt: string;
}

export interface UpdateCandidateProfileInput {
  fullName?: string;
  phone?: string;
  resumeFile?: File;
}


export interface CreateCandidateProfileInput {
  fullName: string;
  phone: string;
  resumeFile: File;
}
