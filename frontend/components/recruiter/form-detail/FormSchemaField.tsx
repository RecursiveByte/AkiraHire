import { FormSchemaQuestion } from "@/types/recruiter/form/form.types";

export default function FormSchemaField({ question }: { question: FormSchemaQuestion }) {
  const label = (
    <label className="text-sm text-on-surface font-medium">
      {question.question}
      {question.required && <span className="text-error ml-1">*</span>}
    </label>
  );

  switch (question.type) {
    case "radio":
      return (
        <div className="space-y-2">
          {label}
          <div className="flex flex-col gap-2">
            {question.options.map((option) => (
              <label key={option} className="flex items-center gap-2 text-sm text-on-surface-variant">
                <input type="radio" name={question.id} disabled className="accent-primary" />
                {option}
              </label>
            ))}
          </div>
        </div>
      );

    case "checkbox":
      return (
        <div className="space-y-2">
          {label}
          <div className="flex flex-col gap-2">
            {question.options.map((option) => (
              <label key={option} className="flex items-center gap-2 text-sm text-on-surface-variant">
                <input type="checkbox" disabled className="accent-primary" />
                {option}
              </label>
            ))}
          </div>
        </div>
      );

    case "select":
      return (
        <div className="space-y-2">
          {label}
          <select
            disabled
            className="w-full bg-surface-container border border-white/10 rounded-lg px-3 py-2 text-sm text-on-surface-variant"
          >
            <option>Select an option</option>
            {question.options.map((option) => (
              <option key={option}>{option}</option>
            ))}
          </select>
        </div>
      );

    case "number":
      return (
        <div className="space-y-2">
          {label}
          <input
            type="number"
            disabled
            placeholder="0"
            className="w-full bg-surface-container border border-white/10 rounded-lg px-3 py-2 text-sm text-on-surface-variant"
          />
        </div>
      );

    case "textarea":
      return (
        <div className="space-y-2">
          {label}
          <textarea
            disabled
            rows={3}
            placeholder="Candidate response"
            className="w-full bg-surface-container border border-white/10 rounded-lg px-3 py-2 text-sm text-on-surface-variant resize-none"
          />
        </div>
      );

    case "file":
      return (
        <div className="space-y-2">
          {label}
          <div className="w-full border border-dashed border-white/15 rounded-lg px-3 py-4 text-center text-xs text-on-surface-variant/70">
            {question.accepted_file_types.length > 0
              ? `Accepted: ${question.accepted_file_types.join(", ")}`
              : "File upload"}
          </div>
        </div>
      );

    case "text":
    default:
      return (
        <div className="space-y-2">
          {label}
          <input
            type="text"
            disabled
            placeholder="Candidate response"
            className="w-full bg-surface-container border border-white/10 rounded-lg px-3 py-2 text-sm text-on-surface-variant"
          />
        </div>
      );
  }
}