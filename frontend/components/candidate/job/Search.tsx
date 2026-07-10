"use client";

import { Search as SearchIcon } from "lucide-react";
import { Input } from "@/components/ui/input";

export default function Search() {
    return (
        <section className="flex items-center gap-4">
            <div className="relative flex-1">
                <SearchIcon
                    className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground"
                    size={18}
                />

                <Input
                    placeholder="Search jobs..."
                    className="pl-10"
                />
            </div>
        </section>
    );
}