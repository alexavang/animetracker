"use client";
import { useRouter } from "next/navigation";
import React, { useState } from "react";

export default function SearchBar() {
  const router = useRouter();
  const [q, setQ] = useState("");

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!q.trim()) return;
    router.push(`/search?query=${encodeURIComponent(q.trim())}`);
  }

  return (
    <form onSubmit={handleSubmit} className="flex gap-2">
      <input
        className="border rounded px-3 py-1 w-64"
        placeholder="Search anime or manga"
        value={q}
        onChange={(e) => setQ(e.target.value)}
      />
      <button className="bg-blue-600 text-white px-3 rounded">Search</button>
    </form>
  );
}
