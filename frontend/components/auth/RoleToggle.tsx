
import type { AuthRole } from "@/types/auth.types";

interface RoleToggleProps {
  role: AuthRole;
  onChange: (role: AuthRole) => void;
}

export function RoleToggle({ role, onChange }: RoleToggleProps) {
  return (
    <div className="flex flex-col gap-2">
      <label className="text-xs font-semibold text-white/60 uppercase tracking-wider">
        Select Role
      </label>

      <div className="grid grid-cols-2 gap-2 rounded-lg border border-white/10 bg-white/5 p-1">
        <button
          type="button"
          onClick={() => onChange("candidate")}
          className={`rounded-md py-2 text-xs font-bold transition-all cursor-pointer ${
            role === "candidate" ? "bg-white text-black" : "text-white/60 hover:text-white"
          }`}
        >
          Candidate
        </button>

        <button
          type="button"
          onClick={() => onChange("recruiter")}
          className={`rounded-md py-2 text-xs font-bold transition-all cursor-pointer ${
            role === "recruiter" ? "bg-white text-black" : "text-white/60 hover:text-white"
          }`}
        >
          Recruiter
        </button>
      </div>
    </div>
  );
}