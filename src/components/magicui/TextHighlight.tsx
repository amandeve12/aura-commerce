import React from 'react';
import { motion } from 'motion/react';

interface TextHighlightProps {
  children: React.ReactNode;
  className?: string;
  color?: string;
  delay?: number;
}

export const TextHighlight: React.FC<TextHighlightProps> = ({
  children,
  className = '',
  color = 'bg-[#0F766E]/15 dark:bg-teal-500/20',
  delay = 0.2,
}) => {
  return (
    <span className={`relative inline-block px-1.5 py-0.5 rounded-md ${className}`}>
      <motion.span
        initial={{ scaleX: 0 }}
        animate={{ scaleX: 1 }}
        transition={{ duration: 0.6, delay, ease: [0.16, 1, 0.3, 1] }}
        className={`absolute inset-0 -z-10 rounded-md origin-left ${color}`}
      />
      {children}
    </span>
  );
};
