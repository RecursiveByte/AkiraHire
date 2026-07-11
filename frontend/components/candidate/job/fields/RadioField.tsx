"use client";

import { Control, Controller } from "react-hook-form";

import { Label } from "@/components/ui/label";

import {
  RadioGroup,
  RadioGroupItem,
} from "@/components/ui/radio-group";

interface RadioFieldProps {
  control: Control<any>;
  name: string;
  label: string;
  options: string[];
  required?: boolean;
}

export default function RadioField({
  control,
  name,
  label,
  options,
  required = false,
}: RadioFieldProps) {
  return (
    <div className="space-y-3">
      <Label>
        {label}

        {required && (
          <span className="ml-1 text-destructive">*</span>
        )}
      </Label>

      <Controller
        control={control}
        name={name}
        defaultValue=""
        rules={{
          required: required ? `${label} is required` : false,
      }}
        render={({ field }) => (
          <RadioGroup
            value={field.value}
            onValueChange={field.onChange}
            className="space-y-3"
          >
            {options.map((option) => (
              <div
                key={option}
                className="flex items-center space-x-2"
              >
                <RadioGroupItem
                  id={`${name}-${option}`}
                  value={option}
                />

                <Label htmlFor={`${name}-${option}`}>
                  {option}
                </Label>
              </div>
            ))}
          </RadioGroup>
        )}
      />
    </div>
  );
}