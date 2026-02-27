"use client";

import { motion, useMotionValue, useSpring } from "framer-motion";
import React, { useRef } from "react";
import Link from "next/link";

type MagneticButtonProps = {
  children: React.ReactNode;
  className?: string;
  variant?: "primary" | "secondary";
  href?: string;
  onClick?: () => void;
};

export function MagneticButton({
  children,
  className = "",
  variant = "primary",
  href,
  onClick,
}: MagneticButtonProps) {
  const ref = useRef<HTMLDivElement>(null);

  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const springConfig = { damping: 15, stiffness: 150, mass: 0.1 };
  const smoothX = useSpring(x, springConfig);
  const smoothY = useSpring(y, springConfig);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!ref.current) return;
    const { clientX, clientY } = e;
    const { left, top, width, height } =
      ref.current.getBoundingClientRect();

    const center = { x: left + width / 2, y: top + height / 2 };
    const distance = {
      x: clientX - center.x,
      y: clientY - center.y,
    };

    x.set(distance.x * 0.4);
    y.set(distance.y * 0.4);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  const buttonStyles = `
    px-8 py-3 rounded-full font-medium transition-colors duration-300
    ${
      variant === "primary"
        ? "bg-white text-black hover:bg-white/90"
        : "border border-white/20 bg-transparent text-white hover:bg-white/10"
    }
  `;

  const ButtonContent = (
    <motion.button
      type="button"
      onClick={onClick}
      style={{ x: smoothX, y: smoothY }}
      className={`${buttonStyles}`}
    >
      {children}
    </motion.button>
  );

  return (
    <div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className={`relative inline-block ${className}`}
    >
      {href ? (
        <Link href={href}>{ButtonContent}</Link>
      ) : (
        ButtonContent
      )}
    </div>
  );
}