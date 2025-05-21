"use client";
import { useState, useEffect } from "react";
import { request, gql } from "graphql-request";
import { MagnifyingGlassIcon, XMarkIcon } from "@heroicons/react/24/solid";
import Link from "next/link";

const SEARCH_BOTH = gql`
  query ($search: String!) {
    anime: Page(perPage: 8) {
      media(search: $search, type: ANIME) { id title { romaji english } coverImage { small: medium } siteUrl format }
    }
    manga: Page(perPage: 8) {
      media(search: $search, type: MANGA) { id title { romaji english } coverImage { small: medium } siteUrl format }
    }
  }
`;

type MediaItem = {
  id: number;
  title: { romaji: string; english: string | null };
  coverImage: { small: string };
  siteUrl: string;
  format: string;
};

export default function QuickSearch({ onClose }: { onClose(): void }) {
  const [term, setTerm] = useState("");
  const [animeResults, setAnimeResults] = useState<MediaItem[]>([]);
  const [mangaResults, setMangaResults] = useState<MediaItem[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!term.trim()) {
      setAnimeResults([]);
      setMangaResults([]);
      return;
    }
    setLoading(true);
    request<{ anime: { media: MediaItem[] }; manga: { media: MediaItem[] } }>(
      "https://graphql.anilist.co",
      SEARCH_BOTH,
      { search: term }
    )
      .then((data) => {
        setAnimeResults(data.anime.media);
        setMangaResults(data.manga.media);
      })
      .finally(() => setLoading(false));
  }, [term]);

  return (
    <div
      className="fixed inset-0 bg-black/50 flex items-start justify-center px-4 z-50"
      onClick={onClose}
    >
      <div
        className="mt-14 w-full max-w-4xl space-y-4"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Search bar + hint */}
        <div className="w-full max-w-3xl mx-auto">
          <div className="relative">
            <div className="bg-[#152238] rounded-md flex items-center px-5 py-2.5">
              <MagnifyingGlassIcon className="h-5 w-5 text-white/60" />
              <input
                autoFocus
                value={term}
                onChange={(e) => setTerm(e.target.value)}
                className="ml-3 flex-grow bg-transparent placeholder-white/50 text-sm text-white focus:outline-none"
                placeholder="Search"
              />
              <button onClick={onClose} className="p-1">
                <XMarkIcon className="h-5 w-5 text-white/60 hover:text-white" />
              </button>
            </div>
            <p className="absolute top-full mt-2 right-5 text-xs text-white/50">
              Hint: Hit Ctrl-S to toggle Quick Search
            </p>
          </div>
        </div>

        {/* Results */}
        {(animeResults.length > 0 || mangaResults.length > 0) && (
          <div className="grid grid-cols-2 gap-4">
            {/* Anime Column */}
            <div>
              <h3 className="mb-2 text-[11px] text-white/60">
                Anime
              </h3>
              <div className="bg-[#152238] rounded-md flex flex-col overflow-hidden">
                <div className="max-h-[60vh] overflow-auto px-5 py-3 space-y-0">
                  {!loading &&
                    animeResults.map((a) => (
                      <Link
                        key={a.id}
                        href={a.siteUrl}
                        className="flex items-center gap-4 py-2.5 hover:bg-[#1f2a44] rounded"
                      >
                        <img
                          src={a.coverImage.small}
                          alt={a.title.romaji}
                          className="h-10 w-8 object-cover rounded-sm flex-shrink-0"
                        />
                        <div className="flex flex-col text-sm">
                          <span>{a.title.english || a.title.romaji}</span>
                          <span className="text-[9px] text-white/50">
                            {a.format}
                          </span>
                        </div>
                      </Link>
                    ))}
                </div>
                {animeResults.length > 0 && (
                  <div className="border-t border-white/10 px-5 py-3 text-center">
                    <Link
                      href={`/search/anime?query=${encodeURIComponent(term)}`}
                      className="text-sm text-blue-400 hover:underline"
                    >
                      View all anime results
                    </Link>
                  </div>
                )}
              </div>
            </div>

            {/* Manga Column */}
            <div>
              <h3 className="mb-2 text-[11px] text-white/60">
                Manga
              </h3>
              <div className="bg-[#152238] rounded-md flex flex-col overflow-hidden">
                <div className="max-h-[60vh] overflow-auto px-5 py-3 space-y-0">
                  {!loading &&
                    mangaResults.map((m) => (
                      <Link
                        key={m.id}
                        href={m.siteUrl}
                        className="flex items-center gap-4 py-2.5 hover:bg-[#1f2a44] rounded"
                      >
                        <img
                          src={m.coverImage.small}
                          alt={m.title.romaji}
                          className="h-10 w-8 object-cover rounded-sm flex-shrink-0"
                        />
                        <div className="flex flex-col text-sm">
                          <span>{m.title.english || m.title.romaji}</span>
                          <span className="text-[9px] text-white/50">
                            {m.format}
                          </span>
                        </div>
                      </Link>
                    ))}
                </div>
                {mangaResults.length > 0 && (
                  <div className="border-t border-white/10 px-5 py-3 text-center">
                    <Link
                      href={`/search/manga?query=${encodeURIComponent(term)}`}
                      className="text-sm text-blue-400 hover:underline"
                    >
                      View all manga results
                    </Link>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
