type Anime = {
  id: number;
  title: string;
  image: string;
  description: string;
};

export default function AnimeCard({ anime }: { anime: Anime }) {
  return (
    <div
      style={{
        width: 220,
        border: "1px solid #ccc",
        borderRadius: 8,
        margin: 10,
      }}
    >
      <img
        src={anime.image}
        alt={anime.title}
        style={{
          width: "100%",
          borderTopLeftRadius: 8,
          borderTopRightRadius: 8,
        }}
      />
      <div style={{ padding: 10 }}>
        <h3 style={{ fontWeight: "bold", fontSize: 14 }}>{anime.title}</h3>
        <p style={{ fontSize: 12, color: "#666" }}>{anime.description}</p>
      </div>
    </div>
  );
}
