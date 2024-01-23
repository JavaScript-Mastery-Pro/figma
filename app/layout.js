import { Work_Sans } from "next/font/google";

import { FigmaProvider } from "@/context/FigmaProvider";

import "./globals.css";
import { Room } from "@/context/RoomProvider";
import { LiveProvider } from "@/context/LiveProvider";

export const metadata = {
  title: "Figma Clone",
  description:
    "A minimalist Figma clone using fabric.js and Liveblocks for realtime collaboration",
};

const workSans = Work_Sans({
  subsets: ["latin"],
  variable: "--font-work-sans",
  weight: ["400", "600", "700"],
});

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`bg-primary-grey-100 overflow-hidden ${workSans.className}`}
      >
        <Room>
          <LiveProvider>
            <FigmaProvider>{children}</FigmaProvider>
          </LiveProvider>
        </Room>
      </body>
    </html>
  );
}
