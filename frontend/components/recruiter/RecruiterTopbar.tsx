interface RecruiterTopbarProps {
  avatarUrl?: string;
  userName: string;
  collapsed?: boolean;
  onOpenSidebar: () => void;
}

export function RecruiterTopbar({
  avatarUrl,
  userName,
  onOpenSidebar,
}: RecruiterTopbarProps) {
  return (
    <header className="sticky top-0 z-40 flex h-20 items-center justify-between border-b border-white/5 bg-[#050505]/80 px-6 backdrop-blur-xl">
      <div className="flex items-center">
        <button
          onClick={onOpenSidebar}
          className="flex h-10 w-10 items-center justify-center rounded-lg text-white transition hover:bg-white/10 md:hidden"
        >
          <span className="msi text-[24px]">menu</span>
        </button>
      </div>

      <div className="flex items-center gap-6">
        <button className="relative p-2 text-white/50 transition-colors hover:text-white">
          <span className="msi text-[24px]">notifications</span>

          <span className="absolute right-2 top-2 h-2 w-2 rounded-full bg-white shadow-[0_0_8px_rgba(255,255,255,0.5)]" />
        </button>

        <div className="h-10 w-10 overflow-hidden rounded-full border-2 border-white/10 ring-2 ring-white/5">
          {avatarUrl ? (
            <img
              src={avatarUrl}
              alt={userName}
              className="h-full w-full object-cover"
            />
          ) : (
            <div className="flex h-full w-full items-center justify-center bg-white/10 text-sm font-medium text-white">
              {userName.charAt(0)}
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
