// src/app/components/Header.tsx
"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { MagnifyingGlassIcon } from "@heroicons/react/24/solid";
import QuickSearch from "./QuickSearch";

export default function Header() {
  const [searchOpen, setSearchOpen] = useState(false);

  const navItems = [
    { href: "/", label: "Home" },
    { href: "/profile", label: "Profile" },
    { href: "/anime-list", label: "Anime List" },
    { href: "/manga-list", label: "Manga List" },
    { href: "/search/anime", label: "Browse" },
    { href: "/forum", label: "Forum" },
  ];

  // Toggle on Ctrl+S and close on Escape
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
    // Use capture phase so we intercept before browser Save dialog
    window.addEventListener("keydown", handler, true);
    return () => window.removeEventListener("keydown", handler, true);
  }, []);

  return (
    <header className="fixed inset-x-0 top-0 bg-[#0f1119] border-b border-white/10 z-50">
      <div className="mx-auto max-w-7xl flex items-center justify-between px-6 h-14">
        {/* Logo + Nav */}
        <div className="flex items-center space-x-8">
          <Link href="/" className="flex-shrink-0">
            <img src="/logo.svg" alt="Logo" className="h-6" />
          </Link>
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="uppercase text-sm text-white hover:text-white/80"
            >
              {item.label}
            </Link>
          ))}
        </div>

        {/* Quick-Search Trigger */}
        <button
          onClick={() => setSearchOpen(true)}
          className="p-2 rounded-md hover:bg-white/10"
          aria-label="Open quick search"
        >
          <MagnifyingGlassIcon className="h-5 w-5 text-white/60 hover:text-white" />
        </button>
      </div>

      {/* QuickSearch Overlay */}
      {searchOpen && <QuickSearch onClose={() => setSearchOpen(false)} />}
    </header>
  );
}
