export const MODAL_CONFIG = {

    delete: {
  
      title: (jobTitle: string) => `Delete "${jobTitle}"?`,
  
      description:
  
        "This action is irreversible. This job posting and all associated data will be permanently removed.",
  
      confirmLabel: "Delete",
  
      action: "delete" as const,
  
    },
  
    publish: {
  
      title: (jobTitle: string) => `Publish "${jobTitle}"?`,
  
      description:
  
        "Once published, this job posting will become visible to candidates and they can start submitting applications.",
  
      confirmLabel: "Publish",
  
      action: "publish" as const,
  
    },
  
    close: {
  
      title: (jobTitle: string) => `Close "${jobTitle}"?`,
  
      description:
  
        "Closing this job will stop accepting new applications. Existing applications will still be available for review.",
  
      confirmLabel: "Close Job",
  
      action: "close" as const,
  
    },
  
  };
  