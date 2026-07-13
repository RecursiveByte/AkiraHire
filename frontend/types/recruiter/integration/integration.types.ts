export type IntegrationProvider = "google" | "linkedin";



export interface Integration {

  id: number | null;

  name: string;

  provider: IntegrationProvider;

  connected: boolean;

}
