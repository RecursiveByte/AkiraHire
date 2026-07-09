import { Application } from "@/types/application.types";

export const mockApplications: Application[] = [
  {
    applicationId: 1042,
    submittedAt: "2023-10-12",
    status: "UNDER_REVIEW",
    jobId: 301,
    jobTitle: "Senior Product Designer",
    candidateProfile: {
      fullName: "Alex Mercer",
      email: "alex.mercer@example.com",
      phone: "+1 (555) 019-2837",
      resumeUrl: "#",
    },
    form: {
      formId: 12,
      title: "Senior Product Designer Application",
      description: "Application form for the Senior Product Designer role.",
      status: "PUBLISHED",
    },
    links: [],
    questions: [],
  },
  {
    applicationId: 1039,
    submittedAt: "2023-10-08",
    status: "SHORTLISTED",
    jobId: 288,
    jobTitle: "Design Systems Architect",
    candidateProfile: {
      fullName: "Alex Mercer",
      email: "alex.mercer@example.com",
      phone: "+1 (555) 019-2837",
      resumeUrl: "#",
    },
    form: {
      formId: 9,
      title: "Design Systems Architect Application",
      description: "Application form for the Design Systems Architect role.",
      status: "PUBLISHED",
    },
    links: [],
    questions: [],
  },
  {
    applicationId: 1021,
    submittedAt: "2023-10-02",
    status: "REJECTED",
    jobId: 254,
    jobTitle: "Lead Experience Designer",
    candidateProfile: {
      fullName: "Alex Mercer",
      email: "alex.mercer@example.com",
      phone: "+1 (555) 019-2837",
      resumeUrl: "#",
    },
    form: {
      formId: 6,
      title: "Lead Experience Designer Application",
      description: "Application form for the Lead Experience Designer role.",
      status: "PUBLISHED",
    },
    links: [],
    questions: [],
  },
];