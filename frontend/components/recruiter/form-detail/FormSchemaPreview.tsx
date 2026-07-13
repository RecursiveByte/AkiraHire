import { FormSchema } from "@/types/recruiter/form/form.types";

import FormSchemaField from "./FormSchemaField";

export default function FormSchemaPreview({ schema }: { schema: FormSchema }) {
  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <label className="font-label-sm text-label-sm text-on-surface-variant uppercase tracking-widest block">
          Name <span className="text-error ml-1">*</span>
        </label>
        <input
          type="text"
          disabled
          placeholder="name"
          className="w-full bg-surface-container-lowest border border-outline-variant rounded-sm px-4 py-3 text-body-lg text-on-surface-variant"
        />
      </div>

      <div className="space-y-2">
        <label className="font-label-sm text-label-sm text-on-surface-variant uppercase tracking-widest block">
          Email <span className="text-error ml-1">*</span>
        </label>
        <input
          type="email"
          disabled
          placeholder="email"
          className="w-full bg-surface-container-lowest border border-outline-variant rounded-sm px-4 py-3 text-body-lg text-on-surface-variant"
        />
      </div>

      <div className="space-y-2">
        <label className="font-label-sm text-label-sm text-on-surface-variant uppercase tracking-widest block">
          Phone <span className="text-error ml-1">*</span>
        </label>
        <input
          type="tel"
          disabled
          placeholder="phone"
          className="w-full bg-surface-container-lowest border border-outline-variant rounded-sm px-4 py-3 text-body-lg text-on-surface-variant"
        />
      </div>

      <div className="space-y-2">
        <label className="font-label-sm text-label-sm text-on-surface-variant uppercase tracking-widest block">
          Resume <span className="text-error ml-1">*</span>
        </label>

        <input
          type="file"
          disabled
          accept=".pdf,.doc,.docx"
          className="w-full cursor-not-allowed file:mr-4 file:rounded-sm file:border-0 file:bg-primary file:px-4 file:py-2 file:text-sm file:font-medium file:text-on-primary text-on-surface-variant disabled:opacity-70"
        />
      </div>

      {schema.links.map((link) => (
        <div key={link.id} className="space-y-2">
          <label className="font-label-sm text-label-sm text-on-surface-variant uppercase tracking-widest block">
            {link.label}
            {link.required && <span className="text-error ml-1">*</span>}
          </label>
          <input
            type="url"
            disabled
            placeholder="https://"
            className="w-full bg-surface-container-lowest border border-outline-variant rounded-sm px-4 py-3 text-body-lg text-on-surface-variant"
          />
        </div>
      ))}

      {/* Additional Questions */}
      {schema.additional_questions.map((question) => (
        <FormSchemaField key={question.id} question={question} />
      ))}
    </div>
  );
}
