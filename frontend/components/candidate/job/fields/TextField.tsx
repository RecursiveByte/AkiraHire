"use client";

import { Control, Controller } from "react-hook-form";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface TextFieldProps {
  control: Control<any>;
  name: string;
  label: string;
  required?: boolean;
}

export default function TextField({
  control,
  name,
  label,
  required = false,
}: TextFieldProps) {
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
          <Input
            id={name}
            {...field}
            placeholder={`Enter ${label}`}
          />
        )}
      />
    </div>
  );
}