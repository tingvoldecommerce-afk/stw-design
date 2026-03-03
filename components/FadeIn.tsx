"use client";

import { useRef, useState, useEffect } from "react";
import { useInView } from "motion/react";

interface FadeInProps {
  children: React.ReactNode;
  delay?: number;
  className?: string;
  direction?: "up" | "left" | "right" | "none";
}

// Content is always visible on SSR. Animation activates after hydration.
// Only animates on Y-axis to prevent horizontal overflow.
export default function FadeIn({
  children,
  delay = 0,
  className = "",
}: FadeInProps) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-40px" });
  const [ready, setReady] = useState(false);

  useEffect(() => {
    setReady(true);
  }, []);

  const visible = !ready || isInView;

  return (
    <div
      ref={ref}
      className={className}
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0)" : "translateY(16px)",
        transition: ready
          ? `opacity 0.5s ${delay}s ease-out, transform 0.5s ${delay}s ease-out`
          : "none",
      }}
    >
      {children}
    </div>
  );
}
