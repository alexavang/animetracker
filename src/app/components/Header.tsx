// src/app/components/Header.tsx
"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { MagnifyingGlassIcon } from "@heroicons/react/24/solid";
import QuickSearch from "./QuickSearch";

export default function Header() {
  const [searchOpen, setSearchOpen] = useState(false);

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.ctrlKey && e.key.toLowerCase() === "s") {
        e.preventDefault();
        setSearchOpen((v) => !v);
      }
      if (e.key === "Escape") {
        setSearchOpen(false);
      }
    };
    window.addEventListener("keydown", handler, true);
    return () => window.removeEventListener("keydown", handler, true);
  }, []);

  return (
    <header className="fixed inset-x-0 top-0 z-50 bg-[#0f1119] border-b border-white/10">
      <div className="mx-auto max-w-7xl flex items-center px-6 h-14">
        {/* ─── Left zone: Logo ─── */}
        <div className="flex-shrink-0">
          <Link href="/">
            <img src="/logo.svg" alt="Logo" className="h-6" />
          </Link>
        </div>

        {/* ─── Center zone: Nav links (centered) ─── */}
        <nav className="flex flex-1 justify-center space-x-8">
          {/* Home */}
          <Link
            href="/"
            className="text-sm text-white/80 hover:text-white transition-colors"
          >
            Home
          </Link>

          {/* Anime dropdown */}
          <div className="relative group">
            <button
              className="text-sm text-white/80 hover:text-white flex items-center transition-colors"
              aria-haspopup="true"
              aria-expanded="false"
            >
              Anime
              <svg
                className="ml-1 h-3 w-3 text-white/70 group-hover:text-white/90 transition-colors"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path
                  fillRule="evenodd"
                  d="M5.23 7.21a.75.75 0 011.06-.02L10 10.586l3.71-3.396a.75.75 0 011.02 1.098l-4.25 3.892a.75.75 0 01-1.02 0L5.25 8.288a.75.75 0 01-.02-1.06z"
                  clipRule="evenodd"
                />
              </svg>
            </button>
            {/* Dropdown menu */}
            <div className="absolute left-1/2 top-full mt-1 w-40 -translate-x-1/2 rounded-md bg-[#0f1119] border border-white/10 shadow-lg opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none group-hover:pointer-events-auto z-10">
              <div className="py-1">
                <Link
                  href="/anime/top100"
                  className="block px-4 py-2 text-sm text-white hover:bg-white/10"
                >
                  Top 100
                </Link>
                <Link
                  href="/anime/trending"
                  className="block px-4 py-2 text-sm text-white hover:bg-white/10"
                >
                  Trending
                </Link>
                <Link
                  href="/anime/movies"
                  className="block px-4 py-2 text-sm text-white hover:bg-white/10"
                >
                  Top Movies
                </Link>
              </div>
            </div>
          </div>

          {/* Manga dropdown */}
          <div className="relative group">
            <button
              className="text-sm text-white/80 hover:text-white flex items-center transition-colors"
              aria-haspopup="true"
              aria-expanded="false"
            >
              Manga
              <svg
                className="ml-1 h-3 w-3 text-white/70 group-hover:text-white/90 transition-colors"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path
                  fillRule="evenodd"
                  d="M5.23 7.21a.75.75 0 011.06-.02L10 10.586l3.71-3.396a.75.75 0 011.02 1.098l-4.25 3.892a.75.75 0 01-1.02 0L5.25 8.288a.75.75 0 01-.02-1.06z"
                  clipRule="evenodd"
                />
              </svg>
            </button>
            {/* Dropdown menu */}
            <div className="absolute left-1/2 top-full mt-1 w-40 -translate-x-1/2 rounded-md bg-[#0f1119] border border-white/10 shadow-lg opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none group-hover:pointer-events-auto z-10">
              <div className="py-1">
                <Link
                  href="/manga/top100"
                  className="block px-4 py-2 text-sm text-white hover:bg-white/10"
                >
                  Top 100
                </Link>
                <Link
                  href="/manga/trending"
                  className="block px-4 py-2 text-sm text-white hover:bg-white/10"
                >
                  Trending
                </Link>
                <Link
                  href="/manga/manhwa"
                  className="block px-4 py-2 text-sm text-white hover:bg-white/10"
                >
                  Top Manhwa
                </Link>
              </div>
            </div>
          </div>

          {/* Browse */}
          <Link
            href="/search/anime"
            className="text-sm text-white/80 hover:text-white transition-colors"
          >
            Browse
          </Link>
        </nav>

        {/* ─── Right zone: Search button ─── */}
        <div>
          <button
            onClick={() => setSearchOpen(true)}
            className="p-2 rounded-md hover:bg-white/10"
            aria-label="Open quick search"
          >
            <MagnifyingGlassIcon className="h-5 w-5 text-white/60 hover:text-white" />
          </button>
        </div>
      </div>

      {/* ─── QuickSearch Overlay ─── */}
      {searchOpen && <QuickSearch onClose={() => setSearchOpen(false)} />}
    </header>
  );
}
