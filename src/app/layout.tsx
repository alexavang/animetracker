import Link from "next/link";
import "./globals.css";
import SearchBar from "./components/SearchBar";

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <header className="bg-dark border-b border-white/10">
          <nav className="mx-auto max-w-7xl flex items-center gap-8 px-6 h-14">
            {/* TODO: Add logo component */}
            <Link href="/">Home</Link>
            <Link href="/profile">Profile</Link>
            <Link href="/anime-list">Anime List</Link>
            <Link href="/manga-list">Manga List</Link>
            <Link href="/browse">Browse</Link>
            <div className="ml-auto">
              <SearchBar />
            </div>
          </nav>
        </header>

        <main className="px-6 py-8 max-w-7xl mx-auto">{children}</main>
      </body>
    </html>
  );
}
