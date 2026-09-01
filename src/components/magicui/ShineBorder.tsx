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
  duration = 8,
  color,
  shineColor = ['#A07CFE', '#FE8FB5', '#FFBE7B'],
  className,
  style,
  children,
  ...props
}: ShineBorderProps) {
  const activeColors = shineColor || color || ['#A07CFE', '#FE8FB5', '#FFBE7B'];
  const colorList = Array.isArray(activeColors) ? activeColors : [activeColors];
  
  // Format vibrant conic gradient with smooth entries and exits
  const conicStops = colorList.length === 1
    ? `transparent 0deg, transparent 60deg, ${colorList[0]} 120deg, ${colorList[0]} 180deg, transparent 240deg, transparent 360deg`
    : colorList.length === 2
    ? `transparent 0deg, transparent 40deg, ${colorList[0]} 90deg, ${colorList[1]} 170deg, transparent 240deg, transparent 360deg`
    : `transparent 0deg, transparent 30deg, ${colorList[0]} 75deg, ${colorList[1]} 135deg, ${colorList[2]} 195deg, transparent 265deg, transparent 360deg`;

  return (
    <div
      style={
        {
          '--border-radius': `${borderRadius}px`,
          '--border-width': `${borderWidth}px`,
          '--duration': `${duration}s`,
          ...style,
        } as React.CSSProperties
      }
      className={cn('shine-border-wrapper', className)}
      {...props}
    >
      <div
        className="shine-border-spinner"
        style={{
          background: `conic-gradient(from 0deg, ${conicStops})`,
        }}
      />
      {children}
    </div>
  );
}
