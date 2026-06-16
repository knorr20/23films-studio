"use client";

import { useRouter, useSearchParams } from "next/navigation";
import type { ProjectCategory } from "@/data/projects";

const filters: { value: ProjectCategory | "all"; label: string }[] = [
  { value: "all", label: "All" },
  { value: "video", label: "Video" },
  { value: "photo", label: "Photo" },
  { value: "bts", label: "BTS" },
];

interface WorkFiltersProps {
  active: ProjectCategory | "all";
}

export function WorkFilters({ active }: WorkFiltersProps) {
  const router = useRouter();
  const searchParams = useSearchParams();

  const setFilter = (value: ProjectCategory | "all") => {
    const params = new URLSearchParams(searchParams.toString());
    if (value === "all") {
      params.delete("category");
    } else {
      params.set("category", value);
    }
    const query = params.toString();
    router.push(query ? `/work?${query}` : "/work", { scroll: false });
  };

  return (
    <div className="flex flex-wrap gap-x-8 gap-y-3 border-b border-border pb-6">
      {filters.map((filter) => {
        const isActive = active === filter.value;
        return (
          <button
            key={filter.value}
            type="button"
            onClick={() => setFilter(filter.value)}
            className={`text-nav pb-3 transition-colors ${
              isActive
                ? "border-b border-text text-text"
                : "border-b border-transparent text-text-muted hover:text-text"
            }`}
            aria-pressed={isActive}
          >
            {filter.label}
          </button>
        );
      })}
    </div>
  );
}
