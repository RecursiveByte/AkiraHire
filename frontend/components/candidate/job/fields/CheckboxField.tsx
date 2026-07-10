"use client";

import { Control, Controller } from "react-hook-form";

import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";

interface CheckboxFieldProps {
  control: Control<any>;
  name: string;
  label: string;
  options: string[];
  required?: boolean;
}

export default function CheckboxField({
  control,
  name,
  label,
  options,
  required = false,
}: CheckboxFieldProps) {
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
        defaultValue={[]}
        render={({ field }) => (
          <div className="space-y-3">
            {options.map((option) => {
              const checked = field.value?.includes(option);

              return (
                <div
                  key={option}
                  className="flex items-center space-x-2"
                >
                  <Checkbox
                    id={`${name}-${option}`}
                    checked={checked}
                    onCheckedChange={(isChecked) => {
                      if (isChecked) {
                        field.onChange([
                          ...field.value,
                          option,
                        ]);
                      } else {
                        field.onChange(
                          field.value.filter(
                            (value: string) => value !== option
                          )
                        );
                      }
                    }}
                  />

                  <Label htmlFor={`${name}-${option}`}>
                    {option}
                  </Label>
                </div>
              );
            })}
          </div>
        )}
      />
    </div>
  );
}