// "use client";

// import { useCallback, useEffect, useState } from "react";
// import { FormWithJob } from "@/types/candidate/formWithJob.types";
// import { FormService } from "@/services/form.service";

// export function useFormWithJob(formId: number | null) {
//   const [formWithJob, setFormWithJob] = useState<FormWithJob | null>(null);
//   const [isLoading, setIsLoading] = useState(false);
//   const [error, setError] = useState<string | null>(null);

//   const fetchFormWithJob = useCallback(async () => {
//     if (formId === null) return;
//     setIsLoading(true);
//     setError(null);
//     try {
//       const result = await FormService.getFormWithJob(formId);
//       setFormWithJob(result);
//     } catch (err) {
//       console.error(err);
//       setError("Failed to load job details.");
//     } finally {
//       setIsLoading(false);
//     }
//   }, [formId]);

//   useEffect(() => {
//     fetchFormWithJob();
//   }, [fetchFormWithJob]);

//   return { formWithJob, isLoading, error };
// }