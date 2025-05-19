"use client";

import { useState } from "react";
import Link from "next/link";
import FiltersBar, { Filters } from "../../components/FiltersBar";
import AnimeGrid from "../../components/AniListGrid";

export default function SearchAnimePage() {
  const [filters, setFilters] = useState<Filters>({
    search: "", genre: "Any", year: "Any", season: "Any", format: "Any",
  });

  return (
    <main className="px-6 py-8 space-y-6">
      {/* 1. Filters row */}
      <FiltersBar onChange={setFilters} />

      {/* 2. Title + View All */}
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold">Trending Anime</h1>
        <Link
          href="/browse/trending"
          className="text-sm text-white/70 hover:text-blue-400 transition-colors"
        >
          View All
        </Link>
      </div>

      {/* 3. The poster grid */}
      <AnimeGrid filters={filters} />
    </main>
  );
}
