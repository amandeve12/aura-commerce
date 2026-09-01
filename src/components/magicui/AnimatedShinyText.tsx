import React from 'react';

interface AnimatedShinyTextProps {
  children: React.ReactNode;
  className?: string;
  shimmerWidth?: number;
  variant?: 'dark' | 'teal' | 'gold';
}

export const AnimatedShinyText: React.FC<AnimatedShinyTextProps> = ({
  children,
  className = '',
  variant = 'dark',
}) => {
  const variantClass = variant === 'teal' ? 'animate-shiny-teal' : 'animate-shiny-text';

  return (
    <span className={`inline-block tracking-normal ${variantClass} ${className}`}>
      {children}
    </span>
  );
};
