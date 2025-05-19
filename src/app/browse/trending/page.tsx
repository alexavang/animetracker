"use client";

import { request, gql } from "graphql-request";
import { useEffect, useState } from "react";

const endpoint = "https://graphql.anilist.co";
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
    title: {
      romaji: string;
      english: string | null;
    };
    coverImage: {
      large: string;
    };
  };
  
  type AniResponse = {
    Page: {
      media: Anime[];
    };
  };
export default function TrendingAllPage() {
  const [animeList, setAnimeList] = useState<Anime[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchTrending() {
      const data = await request<AniResponse>(endpoint, GET_ALL_TRENDING);
      setAnimeList(data.Page.media);
      setLoading(false);
    }
    fetchTrending();
  }, []);

  return (
    <section className="max-w-7xl mx-auto">
      <h1 className="text-2xl font-semibold mb-6">Trending Anime</h1>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
        {animeList.map((a) => (
          <div key={a.id}>
            <img
              src={a.coverImage.large}
              alt={a.title.romaji}
              className="rounded-lg shadow"
            />
            <p className="mt-2 text-sm">{a.title.english || a.title.romaji}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
