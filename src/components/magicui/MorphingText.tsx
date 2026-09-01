import React, { useEffect, useState } from 'react';

interface MorphingTextProps {
  texts: string[];
  className?: string;
}

export const MorphingText: React.FC<MorphingTextProps> = ({
  texts,
  className = '',
}) => {
  const [textIndex, setTextIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);

  useEffect(() => {
    if (texts.length <= 1) return;

    const interval = setInterval(() => {
      setIsAnimating(true);
      setTimeout(() => {
        setTextIndex((prevIndex) => (prevIndex + 1) % texts.length);
        setIsAnimating(false);
      }, 450); // half of transition time
    }, 2800);

    return () => clearInterval(interval);
  }, [texts]);

  return (
    <span
      className={`inline-block transition-all duration-500 ease-in-out transform ${
        isAnimating
          ? 'opacity-0 blur-md translate-y-2 scale-95'
          : 'opacity-100 blur-none translate-y-0 scale-100'
      } ${className}`}
    >
      {texts[textIndex]}
    </span>
  );
};
