"use client";

import { Search as SearchIcon } from "lucide-react";
import { Input } from "@/components/ui/input";

type Props = {
  search: string;
  setSearch: (value: string) => void;
};

export default function Search({ search, setSearch }: Props) {
  return (
    <section className="flex items-center gap-4">
      <div className="relative flex-1">
        <SearchIcon
          className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground"
          size={18}
        />

        <Input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search jobs by job id or job title..."
          className="pl-10"
        />
      </div>
    </section>
  );
}
