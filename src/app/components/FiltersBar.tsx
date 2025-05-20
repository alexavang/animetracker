// src/app/components/FiltersBar.tsx
"use client";

import { useState } from "react";
import { TagIcon, XMarkIcon, MagnifyingGlassIcon } from "@heroicons/react/24/solid";
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
  const currentYear = String(new Date().getFullYear());

  const [f, setF] = useState<Filters>({
    search: "",
    genres: [],
    year: "Any",
    season: "Any",
    format: "Any",
  });

  function update<K extends keyof Filters>(key: K, value: Filters[K]) {
    const next = { ...f, [key]: value };
    setF(next);
    onChange(next);
  }

  function onSeasonChange(season: string) {
    let next: Filters;
    if (season === "Any") {
      next = { ...f, season: "Any" };
    } else {
      next = { ...f, season, year: currentYear };
    }
    setF(next);
    onChange(next);
  }

  const anyActive =
    f.search !== "" ||
    f.genres.length > 0 ||
    f.year !== "Any" ||
    f.season !== "Any" ||
    f.format !== "Any";

  return (
    <div className="flex flex-col gap-4 mb-6">
      {/* ——— 1) Filters row ——— */}
      <div className="flex flex-wrap gap-4">
        {/* Search */}
        <div className="flex flex-col">
          <span className="mb-1 text-sm text-white/60">Search</span>
          <div className="relative">
            <MagnifyingGlassIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-white/50" />
            <input
              type="text"
              value={f.search}
              onChange={(e) => update("search", e.target.value)}
              className="bg-[#152238] text-white px-3 py-2 rounded-md min-w-[200px] pl-10 placeholder-transparent focus:outline-none"
              placeholder="Search"
            />
          </div>
        </div>

        {/* Genres */}
        <div className="flex flex-col">
          <span className="mb-1 text-sm text-white/60">Genres</span>
          <MultiSelectDropdown
            label="Genres"
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
            options={YEARS.filter((y) => y !== "Any")}
            value={f.year}
            onChange={(y) => update("year", y)}
          />
        </div>

        {/* Season */}
        <div className="flex flex-col">
          <span className="mb-1 text-sm text-white/60">Season</span>
          <SingleSelectDropdown
            placeholder="Any"
            options={SEASONS.filter((s) => s !== "Any")}
            value={f.season}
            onChange={onSeasonChange}
          />
        </div>

        {/* Format */}
        <div className="flex flex-col">
          <span className="mb-1 text-sm text-white/60">Format</span>
          <SingleSelectDropdown
            placeholder="Any"
            options={FORMATS.filter((fmt) => fmt !== "Any")}
            value={f.format}
            onChange={(fmt) => update("format", fmt)}
          />
        </div>

        {/* Filter icon */}
        <button className="bg-[#152238] text-white p-2 rounded-md">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5 text-white/60"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M3 4h18M3 12h18M3 20h18"
            />
          </svg>
        </button>
      </div>

      {/* ——— 2) “Tag” row: only when any filter is active ——— */}
      {anyActive && (
        <div className="flex items-center gap-2">
          <TagIcon className="w-5 h-5 text-white/50" />

          {/* search pill */}
          {f.search && (
            <button
              className="bg-blue-600 text-white px-2 py-1 rounded flex items-center gap-1"
              onClick={() => update("search", "")}
            >
              <span>{f.search}</span>
              <XMarkIcon className="w-4 h-4" />
            </button>
          )}

          {/* genre pills */}
          {f.genres.map((g) => (
            <button
              key={g}
              className="bg-blue-600 text-white px-2 py-1 rounded flex items-center gap-1"
              onClick={() =>
                update(
                  "genres",
                  f.genres.filter((x) => x !== g)
                )
              }
            >
              <span>{g}</span>
              <XMarkIcon className="w-4 h-4" />
            </button>
          ))}

          {/* season pill */}
          {f.season !== "Any" && (
            <button
              className="bg-blue-600 text-white px-2 py-1 rounded flex items-center gap-1"
              onClick={() => update("season", "Any")}
            >
              <span>{f.season}</span>
              <XMarkIcon className="w-4 h-4" />
            </button>
          )}

          {/* year pill */}
          {f.year !== "Any" && (
            <button
              className="bg-blue-600 text-white px-2 py-1 rounded flex items-center gap-1"
              onClick={() => update("year", "Any")}
            >
              <span>{f.year}</span>
              <XMarkIcon className="w-4 h-4" />
            </button>
          )}

          {/* format pill */}
          {f.format !== "Any" && (
            <button
              className="bg-blue-600 text-white px-2 py-1 rounded flex items-center gap-1"
              onClick={() => update("format", "Any")}
            >
              <span>{f.format}</span>
              <XMarkIcon className="w-4 h-4" />
            </button>
          )}
        </div>
      )}
    </div>
  );
}