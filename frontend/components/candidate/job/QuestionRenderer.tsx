"use client";

import { Control } from "react-hook-form";

import { AdditionalQuestion } from "@/types/candidate/job.types";

import TextField from "./fields/TextField";
import NumberField from "./fields/NumberField";
import TextAreaField from "./fields/TextAreaField";
import SelectField from "./fields/SelectField";
import CheckboxField from "./fields/CheckboxField";
import RadioField from "./fields/RadioField";
import DateField from "./fields/DateField";

interface QuestionRendererProps {
  question: AdditionalQuestion;
  control: Control<any>;
}

export default function QuestionRenderer({
  question,
  control,
}: QuestionRendererProps) {
  switch (question.type) {
    case "text":
      return (
        <TextField
          control={control}
          name={question.id}
          label={question.question}
          required={question.required}
        />
      );

    case "textarea":
      return (
        <TextAreaField
          control={control}
          name={question.id}
          label={question.question}
          required={question.required}
        />
      );

    case "number":
      return (
        <NumberField
          control={control}
          name={question.id}
          label={question.question}
          required={question.required}
        />
      );

    case "dropdown":
      return (
        <SelectField
          control={control}
          name={question.id}
          label={question.question}
          options={question.options}
          required={question.required}
        />
      );

    case "checkbox":
      return (
        <CheckboxField
          control={control}
          name={question.id}
          label={question.question}
          options={question.options}
          required={question.required}
        />
      );

    case "radio":
      return (
        <RadioField
          control={control}
          name={question.id}
          label={question.question}
          options={question.options}
          required={question.required}
        />
      );

    case "date":
      return (
        <DateField
          control={control}
          name={question.id}
          label={question.question}
          required={question.required}
        />
      );

    default:
      return null;
  }
}