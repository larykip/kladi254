import { Inter } from "next/font/google";
import "./globals.css";
import { LikedItemsProvider } from "@/contexts/LikedItemsContext";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Kladi254",
  description: "Home to fashon icons",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <LikedItemsProvider>
          {children}
        </LikedItemsProvider>
      </body>
    </html>
  );
}
