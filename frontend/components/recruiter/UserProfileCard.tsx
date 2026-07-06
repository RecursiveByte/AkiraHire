interface UserProfileCardProps {
    name: string;
    title: string;
    avatarUrl?: string;
  }
  
  export function UserProfileCard({ name, title, avatarUrl }: UserProfileCardProps) {
    return (
      <div className="mt-4 px-4 py-2 flex items-center gap-4 border-t border-white/5 pt-4">
        <div className="h-9 w-9 rounded-full overflow-hidden border border-white/10 shrink-0">
          {avatarUrl ? (
            <img alt={name} className="w-full h-full object-cover" src={avatarUrl} />
          ) : (
            <div className="w-full h-full bg-white/10 flex items-center justify-center text-white text-sm font-medium">
              {name.charAt(0)}
            </div>
          )}
        </div>
        <div className="flex flex-col overflow-hidden">
          <span className="text-white text-[13px] font-medium truncate">{name}</span>
          <span className="text-white/50 text-[11px] truncate">{title}</span>
        </div>
      </div>
    );
  }