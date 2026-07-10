"use client";

import { Control, Controller } from "react-hook-form";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface NumberFieldProps {
  control: Control<any>;
  name: string;
  label: string;
  required?: boolean;
}

export default function NumberField({
  control,
  name,
  label,
  required = false,
}: NumberFieldProps) {
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
            type="number"
            placeholder={`Enter ${label}`}
            min={0}
            {...field}
            value={field.value ?? ""}
            onChange={(e) => {
              const value = e.target.value;

              field.onChange(value === "" ? "" : Number(value));
            }}
          />
        )}
      />
    </div>
  );
}