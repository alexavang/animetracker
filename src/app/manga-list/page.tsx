"use client";

import { useEffect, useState } from "react";
import { request, gql } from "graphql-request";
import Link from "next/link";

const ANILIST_API = "https://graphql.anilist.co";

const GET_TOP_MANGA = gql`
  query GetTopManga {
    Page(perPage: 100) {
      media(type: MANGA, sort: POPULARITY_DESC) {
        id
        title {
          romaji
          english
        }
        coverImage {
          medium
        }
        siteUrl
      }
    }
  }
`;

type Manga = {
  id: number;
  title: {
    romaji: string;
    english: string | null;
  };
  coverImage: {
    medium: string;
  };
  siteUrl: string;
};

type AniResponse = {
  Page: {
    media: Manga[];
  };
};

export default function MangaListPage() {
  const [mangaList, setMangaList] = useState<Manga[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      try {
        const data = await request<AniResponse>(ANILIST_API, GET_TOP_MANGA);
        setMangaList(data.Page.media);
      } catch (err) {
        console.error("Error fetching top manga:", err);
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, []);

  return (
    <main className="pt-16 pb-8 px-6 max-w-7xl mx-auto space-y-6">
      <h1 className="text-2xl font-semibold">Top 100 Manga</h1>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
        {mangaList.map((m) => (
          <Link key={m.id} href={m.siteUrl} className="group">
            <img
              src={m.coverImage.medium}
              alt={m.title.romaji}
              className="w-full h-auto rounded-lg shadow-md object-cover group-hover:shadow-lg transition-shadow"
            />
            <p className="mt-2 text-sm text-white/90 group-hover:text-white">
              {m.title.english || m.title.romaji}
            </p>
          </Link>
        ))}
      </div>
    </main>
  );
}
