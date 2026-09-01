import React, { useState } from 'react';
import { motion } from 'motion/react';

interface KineticTextProps {
  text: string;
  className?: string;
  letterClassName?: string;
  isHovered?: boolean;
}

export const KineticText: React.FC<KineticTextProps> = ({
  text,
  className = '',
  letterClassName = '',
  isHovered,
}) => {
  const [internalHover, setInternalHover] = useState(false);
  const active = isHovered !== undefined ? isHovered : internalHover;
  const characters = text.split('');

  return (
    <span
      onMouseEnter={() => setInternalHover(true)}
      onMouseLeave={() => setInternalHover(false)}
      className={`inline-flex flex-wrap select-none transition-colors duration-300 ${className}`}
    >
      {characters.map((char, index) => (
        <motion.span
          key={index}
          animate={
            active
              ? {
                  y: [0, -4, 2, 0],
                  scaleY: [1, 1.22, 0.95, 1],
                  scaleX: [1, 0.88, 1.05, 1],
                  rotate: [0, index % 2 === 0 ? 4 : -4, 0],
                }
              : {
                  y: 0,
                  scaleY: 1,
                  scaleX: 1,
                  rotate: 0,
                }
          }
          transition={{
            duration: 0.4,
            delay: index * 0.02,
            ease: [0.22, 1, 0.36, 1],
          }}
          className={`inline-block origin-bottom ${char === ' ' ? 'w-[0.25em]' : ''} ${letterClassName}`}
        >
          {char === ' ' ? '\u00A0' : char}
        </motion.span>
      ))}
    </span>
  );
};
