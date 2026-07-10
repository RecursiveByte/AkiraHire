"use client";

import { Control, Controller } from "react-hook-form";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface DateFieldProps {
  control: Control<any>;
  name: string;
  label: string;
  required?: boolean;
}

export default function DateField({
  control,
  name,
  label,
  required = false,
}: DateFieldProps) {
  return (
    <div className="space-y-2">
      <Label htmlFor={name}>
        {label}

        {required && (
          <span className="ml-1 text-destructive">*</span>
        )}
      </Label>

      <Controller
        control={control}
        name={name}
        defaultValue=""
        render={({ field }) => (
          <Input
            id={name}
            type="date"
            {...field}
          />
        )}
      />
    </div>
  );
}