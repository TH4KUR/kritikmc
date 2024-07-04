import { Poppins } from "next/font/google";
import "./globals.css";
import Credits from "./components/Credits";
import { SpeedInsights } from "@vercel/speed-insights/next";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
});
export const metadata = {
  title: {
    template: "%s - kriti. | Kakatiya Medical College",
    default: "Homepage",
  },
  description:
    "The premier medical conference hosted by Kakatiya Medical College, Warangal. Join events or seminars by top medical experts.",
  keywords: [
    "medical conference in Telangana",
    "medical competitions in Telangana",
    "kriti kmc",
    "kmc warangal",
  ],
  creator: "E.",
  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon.ico",
    apple: "/favicon.ico",
  },
  other: {
    "revisit-after": "1 days",
  },
  openGraph: {
    title: {
      template: "%s - kriti. | Kakatiya Medical College",
      default: "Homepage",
    },
    description:
      "The premier medical conference hosted by Kakatiya Medical College, Warangal. Join events or seminars by top medical experts.",
    url: "https://www.kritikmc.com/",
    siteName: "kriti.",
    images: [
      {
        url: "https://i.ibb.co/1s9X5g2/Kriti-Meta-Image.png", // Must be an absolute URL
        width: 1200,
        height: 630,
      },
    ],
    locale: "en_IN",
    type: "website",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <SpeedInsights />
      <body className={poppins.className}>
        {children}

        <Credits />
      </body>
    </html>
  );
}
