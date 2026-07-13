"use client";

interface FilterOption {
  label: string;
  value: string;
}

interface FilterDropdownProps {
  value: string;
  onChange: (value: string) => void;
  options: FilterOption[];
}

export default function FilterDropdown({
  value,
  onChange,
  options,
}: FilterDropdownProps) {
  return (
    <div className="relative w-full sm:w-56">
      <span className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 msi text-outline text-[20px]">
        filter_list
      </span>

      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="input-precision w-full rounded-xl py-2 pl-12 pr-10 text-body-md text-primary appearance-none cursor-pointer focus:outline-none"
      >
        {options.map((option) => (
          <option
            key={option.value}
            value={option.value}
            className="bg-surface text-primary"
          >
            {option.label}
          </option>
        ))}
      </select>

      <span className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 msi text-outline text-[20px]">
        expand_more
      </span>
    </div>
  );
}