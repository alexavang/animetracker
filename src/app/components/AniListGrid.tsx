"use client";
import { useEffect, useState } from "react";
import { request, gql } from "graphql-request";
import { Filters } from "./FiltersBar";

const endpoint = "https://graphql.anilist.co";

const GRID_QUERY = gql`
  query (
    $search: String
    $genres: [String]
    $season: MediaSeason
    $seasonYear: Int
    $format: MediaFormat
  ) {
    Page(perPage: 20) {
      media(
        search: $search
        type: ANIME
        sort: TRENDING_DESC
        genre_in: $genres
        season: $season
        seasonYear: $seasonYear
        format: $format
      ) {
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

export default function AnimeGrid({ filters }: { filters: Filters }) {
  const [list, setList] = useState<Anime[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    request<{ Page: { media: Anime[] } }>(endpoint, GRID_QUERY, {
      search: filters.search || undefined,
      genres: filters.genres.length > 0 ? filters.genres : undefined,
      season: filters.season !== "Any" ? filters.season : undefined,
      seasonYear: filters.year !== "Any" ? +filters.year : undefined,
      format: filters.format !== "Any" ? (filters.format as any) : undefined,
    }).then((data) => {
      setList(data.Page.media);
      setLoading(false);
    });
  }, [filters]);

  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
      {list.map((a) => (
        <article
          key={a.id}
          className="group hover:-translate-y-1 transition-transform"
        >
          <img
            src={a.coverImage.large}
            alt={a.title.romaji}
            className="w-full h-64 object-cover rounded-lg shadow-md"
          />
          <h3 className="mt-2 text-sm leading-tight group-hover:text-blue-400">
            {a.title.english || a.title.romaji}
          </h3>
        </article>
      ))}
    </div>
  );
}
