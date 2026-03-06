import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Om os",
  description:
    "Lær STW-Webdesign at kende – et dansk digitalt bureau grundlagt af Sebastian. Vi hjælper virksomheder med at skabe en stærk digital tilstedeværelse.",
  openGraph: {
    title: "Om os · STW-Webdesign",
    description:
      "Et dansk digitalt bureau grundlagt af Sebastian. Vi hjælper virksomheder med professionel online tilstedeværelse.",
    url: "https://www.stw-webdesign.dk/om-os",
  },
};

export default function OmOsLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
