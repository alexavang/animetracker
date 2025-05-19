"use client";
import { useState } from "react";
import MultiSelectDropdown from "./MultiSelectDropdown";

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
  ...Array.from({ length: 40 }, (_, i) => String(new Date().getFullYear() - i)),
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

  const selectClass = "bg-[#152238] text-white px-3 py-2 rounded-md";

  return (
    <div className="flex flex-wrap gap-4 mb-6">
      {/* Search */}
      <div className="flex flex-col">
        <span className="mb-1 text-sm text-white/60">Search</span>
        <input
          type="text"
          placeholder=""
          className="bg-[#152238] placeholder-white/50 text-white px-3 py-2 rounded-md flex-1 min-w-[200px]"
          value={f.search}
          onChange={(e) => update("search", e.target.value)}
        />
      </div>

      {/* Genre */}
      <div className="flex flex-col">
        <span className="mb-1 text-sm text-white/60">Genres</span>
        <MultiSelectDropdown
          placeholder="Any"
          options={GENRES.filter((g) => g !== "Any")}
          selected={f.genres}
          onChange={(genres) => update("genres", genres)}
        />
      </div>

      {/* Year */}
      <div className="flex flex-col">
        <span className="mb-1 text-sm text-white/60">Year</span>
        <select
          className={selectClass}
          value={f.year}
          onChange={(e) => update("year", e.target.value)}
        >
          {YEARS.map((y) => (
            <option key={y} value={y}>
              {y}
            </option>
          ))}
        </select>
      </div>

      {/* Season */}
      <div className="flex flex-col">
        <span className="mb-1 text-sm text-white/60">Season</span>
        <select
          className={selectClass}
          value={f.season}
          onChange={(e) => update("season", e.target.value)}
        >
          {SEASONS.map((s) => (
            <option key={s} value={s}>
              {s}
            </option>
          ))}
        </select>
      </div>

      {/* Format */}
      <div className="flex flex-col">
        <span className="mb-1 text-sm text-white/60">Format</span>
        <select
          className={selectClass}
          value={f.format}
          onChange={(e) => update("format", e.target.value)}
        >
          {FORMATS.map((fmt) => (
            <option key={fmt} value={fmt}>
              {fmt}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
}
