import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Kontakt",
  description:
    "Få en gratis analyse af din hjemmeside. Kontakt STW-Webdesign i dag – vi svarer inden for 24 timer.",
  openGraph: {
    title: "Kontakt · STW-Webdesign",
    description: "Få en gratis analyse. Vi svarer inden for 24 timer.",
    url: "https://www.stw-webdesign.dk/kontakt",
  },
};

export default function KontaktLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
