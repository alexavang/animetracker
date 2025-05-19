"use client";

import { useState, ChangeEvent } from "react";

export type Filters = {
  search: string;
  genre: string;
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
    genre: GENRES[0],
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
      {/* Search text */}
      <input
        type="text"
        placeholder="Search"
        className="bg-[#152238] placeholder-white/50 text-white px-3 py-2 rounded-md flex-1 min-w-[200px]"
        value={f.search}
        onChange={(e) => update("search", e.target.value)}
      />

      {/* Genre */}
      <select
        className={selectClass}
        value={f.genre}
        onChange={(e) => update("genre", e.target.value)}
      >
        {GENRES.map((g) => (
          <option key={g} value={g}>
            {g}
          </option>
        ))}
      </select>

      {/* Year */}
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

      {/* Season */}
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

      {/* Format */}
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

      {/* Filter icon (just illustrative) */}
      <button className="bg-[#152238] text-white p-2 rounded-md">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-5 w-5"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M3 4a1 1 0 011-1h16a1 1 0 …"
          />
        </svg>
      </button>
    </div>
  );
}
