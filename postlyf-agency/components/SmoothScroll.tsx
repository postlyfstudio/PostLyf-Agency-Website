"use client";

import { ReactLenis } from "lenis/react";
import { ReactNode } from "react";

export default function SmoothScroll({ children }: { children: ReactNode }) {
  return (
    <ReactLenis
      root
      options={{
        easing: (t: number) => 1 - Math.pow(1 - t, 5), // easeOutQuint
    duration: 1.2,
        orientation: "vertical",
        gestureOrientation: "vertical",
        smoothWheel: true,
        wheelMultiplier: 1.3,
        touchMultiplier: 1.4,
        infinite: false,
      }}
    >
      {children}
    </ReactLenis>
  );
}