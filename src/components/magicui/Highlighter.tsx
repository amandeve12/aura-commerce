import React from 'react';
import { motion } from 'motion/react';

interface HighlighterProps {
  children: React.ReactNode;
  action?: 'highlight' | 'underline';
  color?: string;
  className?: string;
}

export const Highlighter: React.FC<HighlighterProps> = ({
  children,
  action = 'highlight',
  color = '#0F766E',
  className = '',
}) => {
  if (action === 'underline') {
    return (
      <span className={`relative inline-block ${className}`}>
        {children}
        <svg
          className="absolute left-0 -bottom-1 w-full h-2 pointer-events-none overflow-visible"
          viewBox="0 0 100 12"
          preserveAspectRatio="none"
        >
          <motion.path
            d="M 0 6 Q 25 1, 50 7 T 100 5"
            fill="none"
            stroke={color}
            strokeWidth="3.5"
            strokeLinecap="round"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 0.8, ease: 'easeOut', delay: 0.2 }}
          />
        </svg>
      </span>
    );
  }

  // Highlight action
  return (
    <span className={`relative inline-block z-0 px-1 py-0.5 ${className}`}>
      <motion.span
        initial={{ scaleX: 0 }}
        animate={{ scaleX: 1 }}
        transition={{ duration: 0.6, ease: [0.25, 1, 0.5, 1], delay: 0.1 }}
        style={{ backgroundColor: color }}
        className="absolute inset-0 -z-10 rounded-md origin-left opacity-25 dark:opacity-35"
      />
      {children}
    </span>
  );
};
