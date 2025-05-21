"use client";
import { useEffect, useState } from "react";
import { request, gql } from "graphql-request";
import Link from "next/link";
import FiltersBar, { Filters } from "../../components/FiltersBar";

const ENDPOINT = "https://graphql.anilist.co";

// 1) Query for the trending list
const GET_TRENDING = gql`
  query {
    Page(perPage: 50) {
      media(type: ANIME, sort: TRENDING_DESC) {
        id
        title {
          romaji
          english
        }
        coverImage {
          large
        }
      }
    }
  }
`;

// 2) Query for searching by title
const SEARCH_ANIME = gql`
  query ($search: String!) {
    Page(perPage: 50) {
      media(search: $search, type: ANIME) {
        id
        title {
          romaji
          english
        }
        coverImage {
          large
        }
      }
    }
  }
`;

type Anime = {
  id: number;
  title: { romaji: string; english: string | null };
  coverImage: { large: string };
};

export default function TrendingPage() {
  // trending vs. search results
  const [trending, setTrending] = useState<Anime[]>([]);
  const [results, setResults] = useState<Anime[]>([]);
  const [loading, setLoading] = useState(false);

  const [filters, setFilters] = useState<Filters>({
    search: "",
    genres: [],
    year: "Any",
    season: "Any",
    format: "Any",
  });

  useEffect(() => {
    setLoading(true);
    request<{ Page: { media: Anime[] } }>(ENDPOINT, GET_TRENDING)
      .then((data) => setTrending(data.Page.media))
      .finally(() => setLoading(false));
  }, []);

  useEffect(() => {
    const term = filters.search.trim();
    if (!term) {
      setResults([]);
      return;
    }

    setLoading(true);
    request<{ Page: { media: Anime[] } }>(ENDPOINT, SEARCH_ANIME, {
      search: term,
    })
      .then((data) => setResults(data.Page.media))
      .finally(() => setLoading(false));
  }, [filters.search]);

  const isSearching = filters.search.trim().length > 0;

  return (
    <main className="pt-16 pb-8 px-6 max-w-7xl mx-auto space-y-6">
      <FiltersBar onChange={setFilters} />

      {isSearching ? (
        <>
          <div className="flex items-center gap-2">
            <span className="text-xs text-white/60">Search</span>
            <span className="bg-blue-600 text-white px-2 py-1 rounded">
              {filters.search}
            </span>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
            {!loading &&
              results.map((a) => (
                <div key={a.id}>
                  <img
                    src={a.coverImage.large}
                    alt={a.title.romaji}
                    className="rounded-lg shadow"
                  />
                  <p className="mt-2 text-sm">
                    {a.title.english || a.title.romaji}
                  </p>
                </div>
              ))}
          </div>
        </>
      ) : (
        <>
          <div className="flex items-center justify-between">
            <h1 className="text-2xl font-semibold">Trending Anime</h1>
            <Link
              href="/browse/trending"
              className="text-sm text-white/70 hover:text-blue-400"
            >
              View All
            </Link>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
            {!loading &&
              trending.map((a) => (
                <div key={a.id}>
                  <img
                    src={a.coverImage.large}
                    alt={a.title.romaji}
                    className="rounded-lg shadow"
                  />
                  <p className="mt-2 text-sm">
                    {a.title.english || a.title.romaji}
                  </p>
                </div>
              ))}
          </div>
        </>
      )}
    </main>
  );
}
