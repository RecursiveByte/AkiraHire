"use client";

import { useEffect, useState } from "react";
import axios from "axios";

import { CandidateProfileService } from "@/services/candidate/candidate.service";
import { CandidateProfile, CandidateResume } from "@/types/candidate/candidate.types";

type CandidateProfileStatus = "loading" | "success" | "not-found" | "error";

export function useCandidateProfile() {
  const [profile, setProfile] = useState<CandidateProfile | null>(null);
  const [resume, setResume] = useState<CandidateResume | null>(null);
  const [status, setStatus] = useState<CandidateProfileStatus>("loading");

  function setProfileCreated(data: {
    profile: CandidateProfile;
    resume: CandidateResume;
  }) {
    setProfile(data.profile);
    setResume(data.resume);
    setStatus("success");
  }

  useEffect(() => {
    async function fetchProfile() {
      try {
        const data = await CandidateProfileService.getProfile();

        setProfile(data.profile);
        setResume(data.resume);
        setStatus("success");
      } catch (error) {
        if (axios.isAxiosError(error) && error.response?.status === 404) {
          setStatus("not-found");
        } else {
          console.error(error);
          setStatus("error");
        }
      }
    }

    fetchProfile();
  }, []);

  return {
    profile,
    resume,
    status,
    loading: status === "loading",
    isSuccess: status === "success",
    isNotFound: status === "not-found",
    isError: status === "error",
    setProfileCreated
  };
}
