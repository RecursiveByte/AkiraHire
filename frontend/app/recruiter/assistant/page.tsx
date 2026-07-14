import { Suspense } from "react";
import AssistantPage from "./AssistantPage";

export default function Page() {
  return (
    <Suspense fallback={null}>
      <AssistantPage />
    </Suspense>
  );
}