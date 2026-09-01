import React from 'react';
import { cn } from '../../lib/utils';

export interface ShineBorderProps extends React.HTMLAttributes<HTMLDivElement> {
  borderRadius?: number;
  borderWidth?: number;
  duration?: number;
  color?: string | string[];
  shineColor?: string | string[];
  className?: string;
  style?: React.CSSProperties;
  children?: React.ReactNode;
}

/**
 * Magic UI Shine Border Component
 * Creates an animated luminous multi-color shine gradient on card borders.
 */
export function ShineBorder({
  borderRadius = 24,
  borderWidth = 2,
  duration = 12,
  color,
  shineColor = ['#A07CFE', '#FE8FB5', '#FFBE7B'],
  className,
  style,
  children,
  ...props
}: ShineBorderProps) {
  const activeColors = shineColor || color || ['#A07CFE', '#FE8FB5', '#FFBE7B'];
  const colorList = Array.isArray(activeColors) ? activeColors : [activeColors];
  const gradientString = colorList.length === 1 
    ? `${colorList[0]}, ${colorList[0]}`
    : colorList.join(', ');

  return (
    <div
      style={
        {
          '--border-radius': `${borderRadius}px`,
          '--border-width': `${borderWidth}px`,
          '--shine-pulse-duration': `${duration}s`,
          '--duration': `${duration}s`,
          '--mask-linear-gradient': `linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)`,
          '--background-radial-gradient': `radial-gradient(transparent, transparent, ${gradientString}, transparent, transparent)`,
          ...style,
        } as React.CSSProperties
      }
      className={cn(
        'pointer-events-none absolute inset-0 size-full rounded-[--border-radius] p-[--border-width] z-10',
        'before:absolute before:inset-0 before:size-full before:rounded-[--border-radius] before:p-[--border-width] before:will-change-[background-position] before:content-[""]',
        'before:![-webkit-mask-composite:xor] before:![mask-composite:exclude]',
        'before:[background-image:var(--background-radial-gradient)] before:[background-size:300%_300%] before:[mask:var(--mask-linear-gradient)] before:[-webkit-mask:var(--mask-linear-gradient)]',
        'motion-safe:before:animate-shine',
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
}
