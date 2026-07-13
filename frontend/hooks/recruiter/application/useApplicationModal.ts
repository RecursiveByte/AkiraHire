import { useState } from "react";
import { Application } from "@/types/recruiter/application/application.types";

export function useApplicationModal(applications: Application[]) {
  const [selectedApplicationId, setSelectedApplicationId] = useState<number | null>(null);

  const selectedApplication =
    applications.find((application) => application.applicationId === selectedApplicationId) ?? null;

  const openApplication = (applicationId: number) => setSelectedApplicationId(applicationId);
  const closeApplication = () => setSelectedApplicationId(null);

  return { selectedApplication, openApplication, closeApplication };
}