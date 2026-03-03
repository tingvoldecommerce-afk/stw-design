"use client";

import { useRef, useState, useEffect } from "react";
import { useInView } from "motion/react";

interface FadeInProps {
  children: React.ReactNode;
  delay?: number;
  className?: string;
  direction?: "up" | "left" | "right" | "none";
}

// Safe scroll animation: content is always visible (opacity 1) during SSR
// and initial client render. Animation activates after hydration.
export default function FadeIn({
  children,
  delay = 0,
  className = "",
  direction = "up",
}: FadeInProps) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-40px" });
  const [ready, setReady] = useState(false);

  useEffect(() => {
    setReady(true);
  }, []);

  const yOffset = direction === "up" ? 20 : 0;
  const xOffset = direction === "left" ? -20 : direction === "right" ? 20 : 0;

  const visible = !ready || isInView;

  return (
    <div
      ref={ref}
      className={className}
      style={{
        opacity: visible ? 1 : 0,
        transform: visible
          ? "translate(0,0)"
          : `translate(${xOffset}px, ${yOffset}px)`,
        transition: ready
          ? `opacity 0.55s ${delay}s ease-out, transform 0.55s ${delay}s ease-out`
          : "none",
      }}
    >
      {children}
    </div>
  );
}
