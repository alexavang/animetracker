import Link from "next/link";
import "./globals.css";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <header className="border-b px-4 py-3">
          <nav className="flex gap-4">
            <Link href="/">Home</Link>
            <Link href="/about">Search</Link>
          </nav>
        </header>

        <main className="p-4">{children}</main>
      </body>
    </html>
  );
}
