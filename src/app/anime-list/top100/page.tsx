// src/app/anime/top100/page.tsx
"use client";

import { useState, useEffect } from "react";
import { request, gql } from "graphql-request";
import FiltersBar, { Filters } from "../../components/FiltersBar";

type Anime = {
  id: number;
  title: { romaji: string; english: string | null };
  coverImage: { large: string; medium: string };
  siteUrl: string;
  averageScore: number;
};

type AniResponse = {
  Page: { media: Anime[] };
};

const GET_TOP_100_ANIME = gql`
  query GetTop100Anime {
    Page(perPage: 100, sort: SCORE_DESC) {
      media(type: ANIME) {
        id
        title { romaji english }
        coverImage { medium large }
        siteUrl
        averageScore
      }
    }
  }
`;

export default function Top100AnimePage() {
  const [animeList, setAnimeList] = useState<Anime[]>([]);
  const [loading, setLoading] = useState(true);

  // Filters state (wired in case you want to filter client-side)
  const [filters, setFilters] = useState<Filters>({
    search: "",
    genres: [],
    year: "Any",
    season: "Any",
    format: "Any",
  });

  useEffect(() => {
    async function fetchTop100() {
      const data = await request<AniResponse>(
        "https://graphql.anilist.co",
        GET_TOP_100_ANIME
      );
      setAnimeList(data.Page.media);
      setLoading(false);
    }
    fetchTop100();
  }, []);

  // If you want to apply client-side filtering based on FiltersBar, you can
  // filter `animeList` here before rendering.

  return (
    <main className="pt-16 pb-8 px-6 max-w-7xl mx-auto space-y-6">
      <h1 className="text-2xl font-semibold text-white">Top 100 Anime</h1>

      {/* Filters row (doesn’t automatically re-query — it’s client-side only) */}
      <FiltersBar onChange={setFilters} />

      {/* Grid of 100 items with ranking badges */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
        {!loading &&
          animeList.map((a, idx) => {
            const rank = idx + 1; // 1-100
            // pick a badge color based on rank:
            let bgColor = "bg-blue-500";
            if (rank === 1) bgColor = "bg-green-500";
            else if (rank === 2) bgColor = "bg-red-500";
            else if (rank === 3) bgColor = "bg-pink-500";
            else if (rank <= 10) bgColor = "bg-yellow-500";

            return (
              <a
                key={a.id}
                href={a.siteUrl}
                target="_blank"
                rel="noreferrer"
                className="relative group"
              >
                {/* Ranking badge in top−left corner */}
                <div
                  className={`${bgColor} absolute top-2 left-2 z-10 flex items-center justify-center w-8 h-8 rounded-full text-white text-sm font-semibold`}
                >
                  #{rank}
                </div>

                <img
                  src={a.coverImage.large}
                  alt={a.title.romaji}
                  className="w-full h-auto rounded-lg shadow-md object-cover group-hover:shadow-lg transition-shadow"
                />
                <p className="mt-2 text-sm text-white/90 group-hover:text-white transition-colors">
                  {a.title.english || a.title.romaji}
                </p>
              </a>
            );
          })}
      </div>
    </main>
  );
}
