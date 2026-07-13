interface IntegrationIconProps {
    iconSrc?: string | null;
    alt: string;
  }
  
  export function IntegrationIcon({ iconSrc, alt }: IntegrationIconProps) {
    return (
      <div className="flex h-12 w-12 items-center justify-center rounded-lg border border-white/10 bg-white/5">
        {iconSrc ? (
          <img src={iconSrc} alt={alt} className="h-6 w-6 object-contain" />
        ) : (
          <span className="h-6 w-6 rounded-sm bg-white/20" />
        )}
      </div>
    );
  }