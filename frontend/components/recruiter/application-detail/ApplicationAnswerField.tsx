import { ApplicationQuestionAnswer } from "@/types/recruiter/application/application.types";

export default function ApplicationAnswerField({ question }: { question: ApplicationQuestionAnswer }) {
  const displayAnswer =
    question.answer === null || question.answer === undefined || question.answer === ""
      ? "No answer provided"
      : String(question.answer);

  return (
    <div className="space-y-1.5">
      <p className="text-sm text-on-surface font-medium">
        {question.question}
        {question.required && <span className="text-error ml-1">*</span>}
      </p>
      <p className="text-sm text-on-surface-variant bg-surface-container border border-white/5 rounded-lg px-3 py-2">
        {displayAnswer}
      </p>
    </div>
  );
}