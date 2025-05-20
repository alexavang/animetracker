"use client";

import { request, gql } from "graphql-request";
import { useEffect, useState } from "react";
import FiltersBar, { Filters } from "../../components/FiltersBar";

const ENDPOINT = "https://graphql.anilist.co";
const GET_ALL_TRENDING = gql`
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

type Anime = {
  id: number;
  title: { romaji: string; english: string | null };
  coverImage: { large: string };
};

type AniResponse = {
  Page: { media: Anime[] };
};

export default function TrendingAllPage() {
  const [animeList, setAnimeList] = useState<Anime[]>([]);
  const [loading, setLoading] = useState(true);

  // for FiltersBar – you can wire these into your grid later if you like!
  const [filters, setFilters] = useState<Filters>({
    search: "",
    genres: [],
    year: "Any",
    season: "Any",
    format: "Any",
  });

  useEffect(() => {
    async function fetchTrending() {
      const data = await request<AniResponse>(ENDPOINT, GET_ALL_TRENDING);
      setAnimeList(data.Page.media);
      setLoading(false);
    }
    fetchTrending();
  }, []);

  return (
    // 1) pt-16 pushes content below your fixed 56px header (+8px extra)
    // 2) pb-8 / px-6 for padding, space-y-6 for vertical gaps
    <main className="pt-16 pb-8 px-6 space-y-6 max-w-7xl mx-auto">
      {/* 1. Page title */}
      <h1 className="text-2xl font-semibold">Trending Anime</h1>

      {/* 2. FiltersBar (exact same component you use on /search/anime) */}
      <FiltersBar onChange={setFilters} />

      {/* 3. Your grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
        {!loading &&
          animeList.map((a) => (
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
    </main>
  );
}
