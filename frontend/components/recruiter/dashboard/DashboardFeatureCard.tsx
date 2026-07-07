"use client";

import Link from "next/link";
import useGlassCardEffect from "@/hooks/useGlassCardEffect";

interface DashboardFeatureCardProps {
  icon: string;
  title: string;
  description: string;
  ctaLabel: string;
  ctaIcon?: string;
  href: string;
}

export function DashboardFeatureCard({
  icon,
  title,
  description,
  ctaLabel,
  ctaIcon = "arrow_forward",
  href,
}: DashboardFeatureCardProps) {
  const ref = useGlassCardEffect<HTMLDivElement>();

  return (
    <div ref={ref} className="glass-card p-8 rounded-[20px] flex flex-col h-full">
      <div className="w-12 h-12 rounded-xl bg-white/5 flex items-center justify-center mb-4 border border-white/10">
        <span className="msi text-white text-[28px]">{icon}</span>
      </div>

      <h3 className="text-[20px] font-semibold text-white mb-2">{title}</h3>
      <p className="text-white/50 text-sm leading-relaxed mb-8 flex-1">{description}</p>

      <Link
        href={href}
        className="monochrome-button px-4 py-2.5 rounded-lg font-medium text-sm self-start inline-flex items-center gap-2"
      >
        {ctaLabel}
        <span className="msi text-[18px]">{ctaIcon}</span>
      </Link>
    </div>
  );
}