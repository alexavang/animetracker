"use client";

import { useRouter, useSearchParams } from "next/navigation";
import React, { useState, useEffect } from "react";

export default function SearchBar() {
  const router = useRouter();
  const params = useSearchParams();
  const searchTermFromUrl = params.get("anime") || "";

  const [q, setQ] = useState(searchTermFromUrl);

  useEffect(() => {
    const timeout = setTimeout(() => {
      if (q.trim()) {
        if (q.trim() !== searchTermFromUrl) {
          router.push(`/search?anime=${encodeURIComponent(q.trim())}`);
        }
      } else {
        if (window.location.pathname !== "/search/anime") {
          router.push("/search/anime");
        }
      }
    }, 300);

    return () => clearTimeout(timeout);
  }, [q, router, searchTermFromUrl]);

  return (
    <input
      className="bg-card placeholder-white/60 text-white px-3 py-2 rounded-md w-64 focus:outline-none focus:ring focus:ring-blue-500/50"
      placeholder="Search anime or manga"
      value={q}
      onChange={(e) => setQ(e.target.value)}
      autoFocus
    />
  );
}
