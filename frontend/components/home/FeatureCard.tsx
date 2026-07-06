"use client";
import  useGlassCardEffect  from "@/hooks/useGlassCardEffect";

interface FeatureCardProps {
  icon: string; 
  title: string;
  description: string;
}

export default function FeatureCard({ icon, title, description }: FeatureCardProps) {
  const ref = useGlassCardEffect<HTMLDivElement>();

  return (
    <div ref={ref} className="glass-card p-6 rounded-xl hover:border-white/30 transition-all">
      <span className="msi text-white mb-4 block">{icon}</span>
      <h3 className="font-geist text-[20px] font-medium mb-2">{title}</h3>
      <p className="text-sm text-white/70 leading-relaxed">{description}</p>
    </div>
  );
}