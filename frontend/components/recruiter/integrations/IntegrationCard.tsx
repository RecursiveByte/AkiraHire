import { Integration } from "@/types/recruiter/integration/common/integration.types";
import { IntegrationIcon } from "./IntegrationIcon";
import { IntegrationBadge } from "./IntegrationBadge";

interface IntegrationCardProps {
  integration: Integration;
  iconSrc?: string | null;
  description: string;
  onConnect?: () => void;
  onDisconnect?: () => void;
  disconnecting?: boolean;
}

export function IntegrationCard({
  integration,
  iconSrc,
  onConnect,
  description,
  onDisconnect,
  disconnecting = false
}: IntegrationCardProps) {
  return (
    <div className="flex flex-col rounded-xl border border-white/10 bg-white/[0.03] p-6 backdrop-blur-xl transition-all duration-300 hover:border-white/20 hover:bg-white/[0.05]">
      <div className="mb-6 flex items-start justify-between">
        <IntegrationIcon iconSrc={iconSrc} alt={integration.name} />
        <IntegrationBadge connected={integration.connected} />
      </div>

      <h3 className="mb-2 text-lg font-bold text-white">{integration.name}</h3>

      <p className="mb-8 flex-1 text-sm leading-relaxed text-white/50">
        {description}
      </p>

      {integration.connected ? (
        <button
          onClick={onDisconnect}
          disabled={disconnecting}
          className="w-full rounded-md bg-red-500 py-2.5 text-sm font-semibold text-white transition-all hover:bg-red-400 active:scale-[0.98]"
        >
          {disconnecting ? "Disconnecting..." : "Disconnect"}
        </button>
      ) : (
        <button
          onClick={onConnect}
          className="w-full rounded-md bg-emerald-500 py-2.5 text-sm font-semibold text-black transition-all hover:bg-emerald-400 active:scale-[0.98]"
        >
          Connect
        </button>
      )}
    </div>
  );
}