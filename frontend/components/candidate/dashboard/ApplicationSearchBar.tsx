"use client";

interface ApplicationSearchBarProps {
  value: string;
  onChange: (value: string) => void;
}

export default function ApplicationSearchBar({
  value,
  onChange,
}: ApplicationSearchBarProps) {
  return (
    <div className="flex items-center input-precision px-4 py-2 rounded-xl w-full sm:w-72">
      <span className="msi text-outline text-[20px] mr-3">tag</span>
      <input
        type="text"
        inputMode="numeric"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder="Search by application ID..."
        className="bg-transparent border-none focus:ring-0 focus:outline-none text-body-md text-primary w-full placeholder:text-outline/50"
      />
      {value && (
        <button
          onClick={() => onChange("")}
          aria-label="Clear search"
          className="msi text-outline text-[18px] hover:text-primary transition-colors"
        >
          close
        </button>
      )}
    </div>
  );
}