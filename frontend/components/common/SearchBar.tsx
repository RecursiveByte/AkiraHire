"use client";

interface SearchBarProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
}

export default function SearchBar({
  value,
  onChange,
  placeholder = "Search...",
}: SearchBarProps) {
  return (
    <div className="flex items-center  input-precision px-4 py-2 rounded-xl w-full sm:w-80">
      <span className="msi text-outline text-[20px] mr-3">tag</span>

      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="bg-transparent border-none focus:ring-0 focus:outline-none text-body-md text-primary w-full placeholder:text-outline/50"
      />

      {value && (
        <button
          type="button"
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