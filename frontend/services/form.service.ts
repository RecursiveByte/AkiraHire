import { apiClient } from "@/lib/api/apiClient";
import { ApiForm } from "@/types/form.types";
import { mapApiFormToForm } from "@/lib/mappers/form.mapper";
import { Form } from "@/types/form.types";

export class FormService {
  static async getRecruiterForms(search?: string): Promise<Form[]> {
    const { data } = await apiClient.get<ApiForm[]>("/forms/recruiter/", {
      params: search ? { search } : undefined,
    });

    console.log(data);

    return data.map(mapApiFormToForm);
  }
  static async publishForm(formId: number) {
    const response = await apiClient.patch(`/forms/${formId}/publish`);
    return response.data;
  }

  static async closeForm(formId: number) {
    const response = await apiClient.patch(`/forms/${formId}/close`);
    return response.data;
  }

  static async deleteForm(formId: number) {
    const response = await apiClient.delete(`/forms/${formId}`);
    return response.data;
  }
}
