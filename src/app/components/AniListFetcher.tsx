"use client";
import React, { useEffect, useState } from "react";
import { request, gql } from "graphql-request";

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
    <section>
      <h2 className="text-lg font-semibold mb-4">Trending Now</h2>
  
      {loading && <p>Loading…</p>}
      {error && <p>{error}</p>}
  
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
        {animeList.map((a) => (
          <article
            key={a.id}
            className="group hover:-translate-y-1 transition-transform"
          >
            <img
              src={a.coverImage.large}
              alt={a.title.romaji}
              className="w-full h-64 object-cover rounded-md shadow-lg"
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
