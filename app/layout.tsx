import type { Metadata, Viewport } from "next";
import { Playfair_Display, Inter } from "next/font/google";
import "./globals.css";
import { LangProvider } from "@/components/LangProvider";
import LayoutShell from "@/components/LayoutShell";

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "STW-Webdesign – Professionelle hjemmesider & AI chatbots",
    template: "%s · STW-Webdesign",
  },
  description:
    "Vi bygger skræddersyede hjemmesider, AI chatbots og SEO-løsninger til danske virksomheder. Hurtig levering, dansk support, målbare resultater.",
  metadataBase: new URL("https://www.stw-webdesign.dk"),
  openGraph: {
    type: "website",
    locale: "da_DK",
    url: "https://www.stw-webdesign.dk",
    siteName: "STW-Webdesign",
    title: "STW-Webdesign – Professionelle hjemmesider & AI chatbots",
    description: "Skræddersyede digitale løsninger til danske virksomheder.",
    images: [{ url: "/og-image.png", width: 1200, height: 630 }],
  },
  twitter: { card: "summary_large_image" },
  robots: { index: true, follow: true },
};

export const viewport: Viewport = {
  themeColor: "#0a0a0a",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="da" className={`${playfair.variable} ${inter.variable}`}>
      <body>
        <LangProvider>
          <LayoutShell>{children}</LayoutShell>
        </LangProvider>
      </body>
    </html>
  );
}
