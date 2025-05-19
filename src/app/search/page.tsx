"use client";

import { request, gql } from "graphql-request";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

const endpoint = "https://graphql.anilist.co";
const SEARCH_QUERY = gql`
  query ($search: String) {
    Page(perPage: 20) {
      media(search: $search, type: ANIME) {
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

type AniResponse = { Page: { media: Anime[] } };

export default function SearchPage() {
  const params = useSearchParams();
  const term = params.get("query") || "";
  const [results, setResults] = useState<Anime[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!term) return;
    (async () => {
      setLoading(true);
      const data = await request<AniResponse>(endpoint, SEARCH_QUERY, { search: term });
      setResults(data.Page.media);
      setLoading(false);
    })();
  }, [term]);

  if (!term) return <p className="p-4">Type something in the search bar 😊</p>;
  if (loading) return <p className="p-4">Searching …</p>;

  return (
    <main className="flex flex-wrap gap-6 p-4">
      {results.map((a) => (
        <div key={a.id} className="w-40">
          <img src={a.coverImage.large} alt={a.title.romaji} className="rounded" />
          <p className="text-sm mt-1">{a.title.english || a.title.romaji}</p>
        </div>
      ))}
    </main>
  );
}
