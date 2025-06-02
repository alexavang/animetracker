// src/app/anime/trending/page.tsx
"use client";

import { useState, useEffect } from "react";
import { request, gql } from "graphql-request";
import FiltersBar, { Filters } from "../../components/FiltersBar";

type Anime = {
  id: number;
  title: { romaji: string; english: string | null };
  coverImage: { large: string; medium: string };
  siteUrl: string;
};

type AniResponse = {
  Page: { media: Anime[] };
};

const GET_TRENDING_ANIME = gql`
  query GetTrendingAnime {
    Page(perPage: 50, sort: TRENDING_DESC) {
      media(type: ANIME) {
        id
        title { romaji english }
        coverImage { medium large }
        siteUrl
      }
    }
  }
`;

export default function TrendingAnimePage() {
  const [animeList, setAnimeList] = useState<Anime[]>([]);
  const [loading, setLoading] = useState(true);
  const [filters, setFilters] = useState<Filters>({
    search: "",
    genres: [],
    year: "Any",
    season: "Any",
    format: "Any",
  });

  useEffect(() => {
    async function fetchTrending() {
      const data = await request<AniResponse>(
        "https://graphql.anilist.co",
        GET_TRENDING_ANIME
      );
      setAnimeList(data.Page.media);
      setLoading(false);
    }
    fetchTrending();
  }, []);

  return (
    <main className="pt-16 pb-8 px-6 max-w-7xl mx-auto space-y-6">
      <h1 className="text-2xl font-semibold text-white">Trending Anime</h1>

      {/* Same FiltersBar if you want to allow client-side filtering */}
      <FiltersBar onChange={setFilters} />

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
        {!loading &&
          animeList.map((a) => (
            <a
              key={a.id}
              href={a.siteUrl}
              target="_blank"
              rel="noreferrer"
              className="relative group"
            >
              <img
                src={a.coverImage.large}
                alt={a.title.romaji}
                className="w-full h-auto rounded-lg shadow-md object-cover group-hover:shadow-lg transition-shadow"
              />
              <p className="mt-2 text-sm text-white/90 group-hover:text-white transition-colors">
                {a.title.english || a.title.romaji}
              </p>
            </a>
          ))}
      </div>
    </main>
  );
}
