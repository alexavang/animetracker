"use client";

import { useState } from "react";
import MultiSelectDropdown from "./MultiSelectDropdown";
import SingleSelectDropdown from "./SingleSelectDropdown";

export type Filters = {
  search: string;
  genres: string[];
  year: string;
  season: string;
  format: string;
};

const GENRES = [
  "Any",
  "Action",
  "Adventure",
  "Comedy",
  "Drama",
  "Ecchi",
  "Fantasy",
  "Horror",
  "Mahou Shoujo",
  "Mecha",
  "Music",
  "Mystery",
  "Psychological",
  "Romance",
  "Sci-Fi",
  "Slice of Life",
  "Sports",
  "Supernatural",
  "Thriller",
];
const YEARS = [
  "Any",
  ...Array.from(
    { length: 40 },
    (_, i) => String(new Date().getFullYear() - i)
  ),
];
const SEASONS = ["Any", "Winter", "Spring", "Summer", "Fall"];
const FORMATS = [
  "Any",
  "TV Show",
  "Movie",
  "TV Short",
  "Special",
  "OVA",
  "ONA",
  "Music",
];

export default function FiltersBar({
  onChange,
}: {
  onChange: (f: Filters) => void;
}) {
  const [f, setF] = useState<Filters>({
    search: "",
    genres: [],
    year: YEARS[0],
    season: SEASONS[0],
    format: FORMATS[0],
  });

  function update<K extends keyof Filters>(key: K, value: Filters[K]) {
    const next = { ...f, [key]: value };
    setF(next);
    onChange(next);
  }

  return (
    <div className="flex flex-wrap gap-4 mb-6">
      {/* Search */}
      <div className="flex flex-col">
        <span className="mb-1 text-sm text-white/60">Search</span>
        <input
          type="text"
          placeholder="Search"
          className="bg-[#152238] placeholder-white/50 text-white px-3 py-2 rounded-md
                     flex-1 min-w-[200px]"
          value={f.search}
          onChange={(e) => update("search", e.target.value)}
        />
      </div>

      {/* Genres */}
      <div className="flex-shrink-0 flex flex-col">
        <span className="mb-1 text-sm text-white/60">Genres</span>
        <MultiSelectDropdown
          placeholder="Any"
          options={GENRES.filter((g) => g !== "Any")}
          selected={f.genres}
          onChange={(gs) => update("genres", gs)}
        />
      </div>

      {/* Year */}
      <div className="flex flex-col">
        <span className="mb-1 text-sm text-white/60">Year</span>
        <SingleSelectDropdown
          placeholder="Any"
          options={YEARS}
          value={f.year}
          onChange={(y) => update("year", y)}
        />
      </div>

      {/* Season */}
      <div className="flex flex-col">
        <span className="mb-1 text-sm text-white/60">Season</span>
        <SingleSelectDropdown
          placeholder="Any"
          options={SEASONS}
          value={f.season}
          onChange={(s) => update("season", s)}
        />
      </div>

      {/* Format */}
      <div className="flex flex-col">
        <span className="mb-1 text-sm text-white/60">Format</span>
        <SingleSelectDropdown
          placeholder="Any"
          options={FORMATS}
          value={f.format}
          onChange={(fmt) => update("format", fmt)}
        />
      </div>

      {/* (optional) filter icon button if you had one */}
      <button className="bg-[#152238] text-white p-2 rounded-md">
        {/* your svg icon */}
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-5 w-5 text-white/60"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4h18M3 12h18M3 20h18" />
        </svg>
      </button>
    </div>
  );
}
