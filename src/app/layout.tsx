import type { Metadata } from "next";
import "./globals.css";
import { cn } from "@/lib/utils";
import { COPY } from "@/content/copy";

export const metadata: Metadata = {
  title: `${COPY.header.brand} — ${COPY.hero.headline}`,
  description: COPY.hero.subhead,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={cn("font-sans")}>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>{children}</body>
    </html>
  );
}
