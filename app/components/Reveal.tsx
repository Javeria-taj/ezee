"use client";
import React from "react";
import { motion } from "framer-motion";

export function Reveal({
  children,
  delay = 0,
  className = "",
  style = {},
  duration = 1.2,
}: any) {
  const parsedDuration = typeof duration === "string" ? parseFloat(duration.replace("s", "")) : duration;
  
  return (
    <motion.div
      className={className}
      style={style}
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ 
        duration: parsedDuration || 1.2, 
        delay: Number(delay), 
        ease: [0.22, 1, 0.36, 1] 
      }}
    >
      {children}
    </motion.div>
  );
}
