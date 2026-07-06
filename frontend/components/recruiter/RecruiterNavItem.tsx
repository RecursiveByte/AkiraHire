"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

interface RecruiterNavItemProps {
  href: string;
  icon: string;
  label: string;
  collapsed: boolean;
}

export function RecruiterNavItem({
  href,
  icon,
  label,
  collapsed,
}: RecruiterNavItemProps) {
  const pathname = usePathname();
  const isActive = pathname === href;

  return (
    <Link
      href={href}
      className={`flex items-center rounded-xl transition-all duration-300 ${
        collapsed
          ? "justify-center px-0 py-3"
          : "gap-4 px-4 py-3"
      } ${
        isActive
          ? "bg-white text-black font-medium"
          : "text-white/60 hover:bg-white/5 hover:text-white"
      }`}
    >
      <span className="msi shrink-0 text-[20px]">{icon}</span>

      {!collapsed && (
        <span className="whitespace-nowrap">{label}</span>
      )}
    </Link>
  );
}