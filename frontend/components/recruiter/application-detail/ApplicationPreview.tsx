import { Application } from "@/types/recruiter/application/application.types";
import ApplicationAnswerField from "./ApplicationAnswerField";

export default function ApplicationPreview({
  application,
}: {
  application: Application;
}) {
  return (
    <div className="space-y-6">
      {/* Candidate Information */}
      <div className="space-y-4">
        <div className="space-y-1.5">
          <p className="text-sm text-on-surface font-medium">
            Full Name <span className="text-error ml-1">*</span>
          </p>
          <div className="bg-surface-container border border-white/5 rounded-lg px-3 py-2 text-sm text-on-surface-variant">
            {application.candidateProfile.fullName}
          </div>
        </div>

        <div className="space-y-1.5">
          <p className="text-sm text-on-surface font-medium">
            Email <span className="text-error ml-1">*</span>
          </p>
          <div className="bg-surface-container border border-white/5 rounded-lg px-3 py-2 text-sm text-on-surface-variant">
            {application.candidateProfile.email}
          </div>
        </div>

        <div className="space-y-1.5">
          <p className="text-sm text-on-surface font-medium">
            Phone <span className="text-error ml-1">*</span>
          </p>
          <div className="bg-surface-container border border-white/5 rounded-lg px-3 py-2 text-sm text-on-surface-variant">
            {application.candidateProfile.phone}
          </div>
        </div>

        <div className="space-y-1.5">
          <p className="text-sm text-on-surface font-medium">
            Resume <span className="text-error ml-1">*</span>
          </p>

          <a
            href={application.candidateProfile.resumeUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 bg-surface-container border border-white/5 rounded-lg px-3 py-2 text-sm text-primary hover:bg-white/5 transition-colors"
          >
            <span className="material-symbols-outlined text-[18px]">
              description
            </span>
            View Resume
          </a>
        </div>
      </div>

      {/* Links */}
      {application.links.map((link) => (
        <div key={link.id} className="space-y-1.5">
          <p className="text-sm text-on-surface font-medium">
            {link.label}
            {link.required && <span className="text-error ml-1">*</span>}
          </p>

          <a
            href={link.value}
            target="_blank"
            rel="noopener noreferrer"
            className="block text-sm text-primary underline break-all bg-surface-container border border-white/5 rounded-lg px-3 py-2"
          >
            {link.value}
          </a>
        </div>
      ))}

      {/* Questions */}
      {application.questions.map((question) => (
        <ApplicationAnswerField key={question.id} question={question} />
      ))}
    </div>
  );
}
