import Link from "next/link";
import "./globals.css";
import SearchBar from "./components/SearchBar";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <header className="border-b px-4 py-3">
          <nav className="flex items-center gap-4">
            <Link href="/">Home</Link>
            <Link href="/about">Browse</Link>
            <SearchBar />
          </nav>
        </header>

        <main className="p-4">{children}</main>
      </body>
    </html>
  );
}
