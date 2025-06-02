"use client";

import { useEffect, useState } from "react";
import { request, gql } from "graphql-request";
import Link from "next/link";

const ANILIST_API = "https://graphql.anilist.co";

const GET_TOP_ANIME = gql`
  query GetTopAnime {
    Page(perPage: 100) {
      media(type: ANIME, sort: POPULARITY_DESC) {
        id
        title {
          romaji
          english
        }
        coverImage {
          large
        }
        siteUrl
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
  siteUrl: string;
};

type AniResponse = {
  Page: {
    media: Anime[];
  };
};

export default function AnimeListPage() {
  const [animeList, setAnimeList] = useState<Anime[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      const data = await request<AniResponse>(ANILIST_API, GET_TOP_ANIME);
      setAnimeList(data.Page.media);
      setLoading(false);
    }
    fetchData();
  }, []);

  return (
    <main className="pt-16 pb-8 px-6 max-w-7xl mx-auto space-y-6">
      <h1 className="text-2xl font-semibold">Top 100 Anime</h1>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
        {animeList.map((a) => (
          <Link key={a.id} href={a.siteUrl} className="group">
            <img
              src={a.coverImage.large}
              alt={a.title.romaji}
              className="w-full h-auto rounded-lg shadow-md object-cover group-hover:shadow-lg transition-shadow"
            />
            <p className="mt-2 text-sm text-white/90 group-hover:text-white">
              {a.title.english || a.title.romaji}
            </p>
          </Link>
        ))}
      </div>
    </main>
  );
}
