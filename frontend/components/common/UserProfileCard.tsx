interface UserProfileCardProps {
    name: string;
    variant?: "card" | "inline";
  }
  
  export function UserProfileCard({ name, variant = "card" }: UserProfileCardProps) {
    const initial = name.trim().charAt(0).toUpperCase();
  
    const avatar = (
      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-white/10 bg-surface-container text-sm font-bold text-white">
        {initial}
      </div>
    );
  
    if (variant === "inline") {
      return (
        <div className="flex items-center gap-3">
          <p className="truncate text-sm font-bold text-white hidden sm:block">
            {name}
          </p>
          {avatar}
        </div>
      );
    }
  
    return (
      <div className="flex items-center gap-3 rounded-xl border border-white/10 bg-white/5 px-3 py-3">
        {avatar}
        <div className="min-w-0">
          <p className="truncate text-sm font-bold text-white">{name}</p>
        </div>
      </div>
    );
  }