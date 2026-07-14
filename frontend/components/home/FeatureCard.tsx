"use client";

interface FeatureCardProps {
  icon?: string;
  image?: string;
  title: string;
  description: string;
}

export default function FeatureCard({
  icon,
  title,
  image,
  description,
}: FeatureCardProps) {
  return (
    <div className="glass-card p-6 rounded-xl hover:border-white/30 transition-all">
      <div className="mb-6 flex h-14 w-14 items-center justify-center rounded-2xl bg-white/5">
        {image ? (
          <img src={image} alt={title} className="h-13 w-13  rounded-lg object-contain" />
        ) : (
          <span className="msi text-3xl text-primary">{icon}</span>
        )}
      </div>
      <h3 className="font-geist text-[20px] font-medium mb-2">{title}</h3>
      <p className="text-sm text-white/70 leading-relaxed">{description}</p>
    </div>
  );
}
