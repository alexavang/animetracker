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
    <div>
      {animeList.map((anime) => (
        <div key={anime.id} style={{ marginBottom: "20px" }}>
          <h2>{anime.title.english || anime.title.romaji}</h2>
          <img
            src={anime.coverImage.large}
            alt={anime.title.romaji}
            style={{ maxWidth: "200px" }}
          />
        </div>
      ))}
    </div>
  );
}
