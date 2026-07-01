import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "FABLELIQUID | Meme Perps on Solana",
  description: "Trade perpetual futures on your favorite memecoins with up to 50x leverage. Powered by Solana.",
  icons: {
    icon: '/favicon.png',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased">{children}</body>
    </html>
  );
}
