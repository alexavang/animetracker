"use client";
import React, { useEffect, useState } from "react";
import { request, gql } from "graphql-request";
import Link from "next/link";

const endpoint = "https://graphql.anilist.co";

const GET_TRENDING_ANIME = gql`
  query {
    Page(perPage: 5) {
      media(type: ANIME, sort: TRENDING_DESC) {
        id
        title {
          romaji
          english
        }
        coverImage {
          large
        }
        description(asHtml: false)
      }
    }
  }
`;

type Anime = {
  id: number;
  title: {
    romaji: string;
    english: string | null;
  };
  coverImage: {
    large: string;
  };
  description: string;
};

type AniListResponse = {
  Page: {
    media: Anime[];
  };
};

export default function AniListFetcher() {
  const [animeList, setAnimeList] = useState<Anime[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchAnime() {
      try {
        setLoading(true);
        const data = await request<AniListResponse>(
          endpoint,
          GET_TRENDING_ANIME
        );
        setAnimeList(data.Page.media);
      } catch (err) {
        setError("Failed to fetch anime");
      } finally {
        setLoading(false);
      }
    }

    fetchAnime();
  }, []);

  if (error) return <p>{error}</p>;

  return (
    <section className="max-w-7xl mx-auto">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-semibold hover:text-blue-400 transition-colors cursor-pointer">
          Trending Now
        </h2>

        <Link
          href="/browse/trending"
          className="text-sm text-white/70 hover:text-blue-400 transition-colors"
        >
          View All
        </Link>
      </div>

      {error && <p>{error}</p>}

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
        {animeList.map((a) => (
          <article
            key={a.id}
            className="group transition-transform hover:-translate-y-1"
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
    </section>
  );
}
