import React from "react";

type RevealProps = {
  children: React.ReactNode;
  className?: string;
  as?: keyof JSX.IntrinsicElements;
};

/**
 * Fades its children up as they scroll into view. The animation is pure CSS
 * (scroll-driven, see .reveal in index.css), so content is always visible in
 * browsers without support, with reduced motion, or when JS timing stalls.
 */
export default function Reveal({ children, className = "", as = "div" }: RevealProps) {
  const Tag = as as React.ElementType;
  return <Tag className={`reveal ${className}`}>{children}</Tag>;
}
