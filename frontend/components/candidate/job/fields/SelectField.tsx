"use client";

import { Control, Controller } from "react-hook-form";

import { Label } from "@/components/ui/label";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface SelectFieldProps {
  control: Control<any>;
  name: string;
  label: string;
  options: string[];
  required?: boolean;
  placeholder?: string;
}

export default function SelectField({
  control,
  name,
  label,
  options,
  required = false,
  placeholder = "Select an option",
}: SelectFieldProps) {
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
        rules={{
          required: required ? `${label} is required` : false,
      }}
        render={({ field }) => (
          <Select
            value={field.value}
            onValueChange={field.onChange}
          >
            <SelectTrigger id={name} className="w-full">
              <SelectValue placeholder={placeholder} />
            </SelectTrigger>

            <SelectContent>
              {options.map((option) => (
                <SelectItem
                  key={option}
                  value={option}
                >
                  {option}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        )}
      />
    </div>
  );
}