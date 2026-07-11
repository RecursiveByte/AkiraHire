import { apiClient } from "@/lib/api/apiClient";
import { ApiForm } from "@/types/form.types";
import { mapApiFormToForm } from "@/lib/mappers/form.mapper";
import { Form } from "@/types/form.types";

export class FormService {
  static async getRecruiterForms(): Promise<Form[]> {
    const { data } = await apiClient.get<ApiForm[]>("/forms/recruiter/");
    console.log(data)
    return data.map(mapApiFormToForm);
  }

};