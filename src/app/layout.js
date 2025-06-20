import { Geist_Mono } from "next/font/google";
import "./globals.css";

import Navbar from "@/components/Navbar";
import { GlobalProvider } from '@/context/GlobalContext';


const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "Nix",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${geistMono.className}`}>
        <GlobalProvider>
          <Navbar />
          <div>
            {children}
          </div>
        </GlobalProvider>
      </body>
    </html >
  );
}
