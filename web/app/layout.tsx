import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "English Reading Library",
  description: "Improve your English reading skills with bilingual content",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${inter.className} antialiased`}
        style={{
          backgroundColor: '#ffffff',
          color: '#171717',
          minHeight: '100vh'
        }}
      >
        {children}
      </body>
    </html>
  );
}
