"use client";

import { Control, Controller } from "react-hook-form";

import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

interface TextAreaFieldProps {
  control: Control<any>;
  name: string;
  label: string;
  required?: boolean;
  rows?: number;
}

export default function TextAreaField({
  control,
  name,
  label,
  required = false,
  rows = 5,
}: TextAreaFieldProps) {
  return (
    <div className="space-y-2">
      <Label htmlFor={name}>
        {label}

        {required && (
          <span className="ml-1 text-destructive">*</span>
        )}
      </Label>

      <Controller
        name={name}
        control={control}
        defaultValue=""
        render={({ field }) => (
          <Textarea
            id={name}
            rows={rows}
            placeholder={`Enter ${label}`}
            {...field}
          />
        )}
      />
    </div>
  );
}