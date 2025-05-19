import AnimeCard from "../components/AnimeCard";
import { animeList } from "../data/anime";   

export default function Home() {
  return (
    <section className="flex flex-wrap gap-6 justify-center p-4">
      {animeList.map((anime) => (
        <AnimeCard key={anime.id} anime={anime} />
      ))}
    </section>
  );
}
