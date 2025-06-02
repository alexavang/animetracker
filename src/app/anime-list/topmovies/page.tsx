// src/app/anime/movies/page.tsx
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

const GET_TOP_ANIME_MOVIES = gql`
  query GetTopAnimeMovies {
    Page(
      perPage: 50
      sort: SCORE_DESC
      mediaType: ANIME
      format: MOVIE
    ) {
      media {
        id
        title { romaji english }
        coverImage { medium large }
        siteUrl
        averageScore
      }
    }
  }
`;

export default function TopAnimeMoviesPage() {
  const [movieList, setMovieList] = useState<Anime[]>([]);
  const [loading, setLoading] = useState(true);
  const [filters, setFilters] = useState<Filters>({
    search: "",
    genres: [],
    year: "Any",
    season: "Any",
    format: "Movie", // default Movie
  });

  useEffect(() => {
    async function fetchMovies() {
      const data = await request<AniResponse>(
        "https://graphql.anilist.co",
        GET_TOP_ANIME_MOVIES
      );
      setMovieList(data.Page.media);
      setLoading(false);
    }
    fetchMovies();
  }, []);

  return (
    <main className="pt-16 pb-8 px-6 max-w-7xl mx-auto space-y-6">
      <h1 className="text-2xl font-semibold text-white">
        Top Anime Movies
      </h1>

      {/* We still show FiltersBar so the user can filter further. */}
      {/* Since format is “Movie,” you might want to preload that pill. */}
      <FiltersBar onChange={setFilters} />

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
        {!loading &&
          movieList.map((a, idx) => {
            const rank = idx + 1;
            let badgeColor = "bg-gray-400";
            if (rank === 1) badgeColor = "bg-red-500";
            else if (rank === 2) badgeColor = "bg-blue-500";
            else if (rank <= 5) badgeColor = "bg-yellow-500";

            return (
              <a
                key={a.id}
                href={a.siteUrl}
                target="_blank"
                rel="noreferrer"
                className="relative group"
              >
                <div
                  className={`${badgeColor} absolute top-2 left-2 z-10 flex items-center justify-center w-8 h-8 rounded-full text-white text-sm font-semibold`}
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
