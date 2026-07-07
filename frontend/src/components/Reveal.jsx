import React from "react";
import { motion } from "framer-motion";

/**
 * Scroll-triggered reveal. Wrap any block to fade/slide it in when it enters
 * the viewport. Use `index` for stagger within a group.
 */
const ease = [0.2, 0.8, 0.2, 1];

export default function Reveal({
  children,
  index = 0,
  y = 28,
  className = "",
  once = true,
  style,
}) {
  return (
    <motion.div
      className={className}
      style={style}
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once, margin: "-40px" }}
      transition={{ duration: 0.6, ease, delay: index * 0.08 }}
    >
      {children}
    </motion.div>
  );
}
