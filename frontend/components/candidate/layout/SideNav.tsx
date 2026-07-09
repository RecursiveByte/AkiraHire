"use client";

import { usePathname } from "next/navigation";
import Link from "next/link";

const NAV_ITEMS = [
  { icon: "account_circle", label: "Profile", href: "/candidate/profile" },
  { icon: "work", label: "Jobs", href: "/candidate/dashboard" },
];

export default function SideNav() {
  const pathname = usePathname();

  return (
    <aside className="fixed left-0 top-0 h-screen w-64 border-r border-outline-variant/40 nav-blur flex flex-col py-8 px-4 z-50">
      <div className="mb-12 px-4">
        <h1 className="font-geist text-headline-md font-bold text-primary">
          AkireHire
        </h1>
        <p className="text-[10px] uppercase tracking-widest text-on-surface-variant/50 mt-1">
          Candidate Portal
        </p>
      </div>

      <nav className="flex-1 space-y-2">
        {NAV_ITEMS.map((item) => {
          const active = pathname?.startsWith(item.href);
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`sidebar-item flex items-center gap-4 px-4 py-3 rounded-xl duration-200 ${
                active
                  ? "nav-pill-active text-primary font-bold"
                  : "text-on-surface-variant font-normal"
              }`}
            >
              <span className="msi text-[20px]">{item.icon}</span>
              <span>{item.label}</span>
            </Link>
          );
        })}
      </nav>

      <div className="mt-auto">
        <a
          href="#"
          className="sidebar-item flex items-center gap-4 px-4 py-3 text-on-surface-variant font-normal rounded-xl duration-200"
        >
          <span className="msi text-[20px]">logout</span>
          <span>Logout</span>
        </a>
      </div>
    </aside>
  );
}