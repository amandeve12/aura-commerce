import React, { useState } from 'react';
import { motion } from 'motion/react';

interface CustomGrid {
  rows: number;
  cols: number;
}

interface PixelImageProps {
  src: string;
  alt?: string;
  customGrid?: CustomGrid;
  grayscaleAnimation?: boolean;
  className?: string;
}

export const PixelImage: React.FC<PixelImageProps> = ({
  src,
  alt = '',
  customGrid = { rows: 4, cols: 6 },
  grayscaleAnimation = false,
  className = '',
}) => {
  const [isHovered, setIsHovered] = useState(false);
  const rows = customGrid.rows || 4;
  const cols = customGrid.cols || 6;

  // Total blocks
  const blocks = Array.from({ length: rows * cols });

  return (
    <div
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className={`relative overflow-hidden group cursor-pointer ${className}`}
    >
      {/* Base Image */}
      <img
        src={src}
        alt={alt}
        className={`w-full h-full object-cover object-center transition-all duration-700 ease-out ${
          grayscaleAnimation ? (isHovered ? 'grayscale-0 scale-105' : 'grayscale contrast-105 scale-100') : 'group-hover:scale-105'
        }`}
      />

      {/* Grid Overlay for Pixel Reveal Effect */}
      <div
        className="absolute inset-0 grid pointer-events-none z-10"
        style={{
          gridTemplateRows: `repeat(${rows}, minmax(0, 1fr))`,
          gridTemplateColumns: `repeat(${cols}, minmax(0, 1fr))`,
        }}
      >
        {blocks.map((_, i) => {
          const row = Math.floor(i / cols);
          const col = i % cols;
          // Stagger calculation based on distance from center or row/col index
          const delay = (row + col) * 0.04;

          return (
            <motion.div
              key={i}
              initial={{ opacity: 0.8, scale: 1 }}
              animate={
                isHovered
                  ? { opacity: 0, scale: 0.85, rotate: (i % 2 === 0 ? 5 : -5) }
                  : { opacity: [0.6, 0.2, 0], scale: [1, 1, 0.9] }
              }
              transition={{
                duration: 0.5,
                delay: isHovered ? delay : (rows + cols - row - col) * 0.03,
                ease: 'easeInOut',
              }}
              className="bg-[#111111]/30 dark:bg-black/50 backdrop-blur-xs border border-white/10 dark:border-white/5"
            />
          );
        })}
      </div>
    </div>
  );
};
