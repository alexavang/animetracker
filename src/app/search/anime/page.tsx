"use client";
import { useState } from "react";
import Link from "next/link";
import FiltersBar, { Filters } from "../../components/FiltersBar";
import AnimeGrid from "../../components/AniListGrid";

export default function SearchAnimePage() {
  const [filters, setFilters] = useState<Filters>({
    search: "",
    genres: [],
    year: "Any",
    season: "Any",
    format: "Any",
  });

  const isSearching = filters.search.trim().length > 0;

  return (
    <main className="pt-16 pb-8 px-6 space-y-6 max-w-7xl mx-auto">
      <FiltersBar onChange={setFilters} />

      {isSearching ? (
        <AnimeGrid filters={filters} />
      ) : (
        <>
          <div className="flex items-center justify-between">
            <h1 className="text-2xl font-semibold">Trending Now</h1>
            <Link
              href="/browse/trending"
              className="text-sm text-white/70 hover:text-blue-400"
            >
              View All
            </Link>
          </div>

          <AnimeGrid filters={filters} />
        </>
      )}
    </main>
  );
}
