import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Ydelser",
  description:
    "Skræddersyede hjemmesider, AI chatbots og SEO til danske virksomheder. Hurtig levering, dansk support og målbare resultater.",
  openGraph: {
    title: "Ydelser · STW-Webdesign",
    description:
      "Skræddersyede hjemmesider, AI chatbots og SEO til danske virksomheder.",
    url: "https://www.stw-webdesign.dk/ydelser",
  },
};

export default function YdelserLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
