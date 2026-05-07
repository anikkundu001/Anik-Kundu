import { motion } from "motion/react";

interface GlowProps {
  color?: string;
  className?: string;
}

export default function Glow({ color = "bg-accent-purple", className = "" }: GlowProps) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 2 }}
      className={`absolute pointer-events-none blur-[120px] rounded-full opacity-20 ${color} ${className}`}
    />
  );
}
