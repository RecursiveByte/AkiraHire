interface FeatureCardProps {
    icon: string;
    title: string;
    description: string;
  }
  
  export default function FeatureCard({
    icon,
    title,
    description,
  }: FeatureCardProps) {
    return (
      <div className="rounded-xl border border-zinc-800 bg-black/90 p-6 text-left">
        <span className="msi mb-4 block text-3xl text-white">
          {icon}
        </span>
  
        <h3 className="font-semibold text-white">
          {title}
        </h3>
  
        <p className="mt-2 text-sm text-zinc-400">
          {description}
        </p>
      </div>
    );
  }