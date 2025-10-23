// app/layout.tsx (or src/app/layout.tsx)
import "./globals.css";
import Providers from "./providers";
import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"], display: "swap" });

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${inter.className} min-h-screen bg-gray-50 text-gray-900 transition-colors duration-300 dark:bg-gray-950 dark:text-gray-100`}
      >
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}