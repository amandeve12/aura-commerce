import React from 'react';

export interface ShimmerButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  shimmerColor?: string;
  shimmerSize?: string;
  shimmerDuration?: string;
  borderRadius?: string;
  background?: string;
  children?: React.ReactNode;
  className?: string;
}

export const ShimmerButton = React.forwardRef<
  HTMLButtonElement,
  ShimmerButtonProps
>(
  (
    {
      shimmerColor = '#ffffff',
      shimmerSize = '0.08em',
      shimmerDuration = '3s',
      borderRadius = '100px',
      background = '#111111',
      className = '',
      children,
      ...props
    },
    ref
  ) => {
    return (
      <button
        style={
          {
            '--spread': '90deg',
            '--shimmer-color': shimmerColor,
            '--radius': borderRadius,
            '--speed': shimmerDuration,
            '--cut': shimmerSize,
            '--bg': background,
          } as React.CSSProperties
        }
        className={`group relative z-0 flex cursor-pointer items-center justify-center overflow-hidden whitespace-nowrap border border-white/10 px-6 py-3 text-white [background:var(--bg)] [border-radius:var(--radius)] transition-transform duration-300 active:scale-95 hover:scale-[1.02] shadow-2xl ${className}`}
        ref={ref}
        {...props}
      >
        {/* spark container */}
        <div className="-z-30 blur-[2px] absolute inset-0 overflow-visible">
          {/* spark */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[200%] aspect-square animate-spin-around pointer-events-none">
            <div className="w-full h-full [background:conic-gradient(from_calc(270deg-(var(--spread)/2)),transparent_0,var(--shimmer-color)_var(--spread),transparent_var(--spread))]" />
          </div>
        </div>

        {/* Continuous shimmer sweep overlay */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden rounded-[var(--radius)]">
          <div className="absolute top-0 bottom-0 left-0 w-1/2 -skew-x-12 -translate-x-full group-hover:animate-shimmer bg-gradient-to-r from-transparent via-white/20 to-transparent" />
        </div>

        {/* Content */}
        <span className="relative z-10 flex items-center justify-center gap-2">
          {children}
        </span>

        {/* Backdrop layer */}
        <div className="absolute [background:var(--bg)] [border-radius:var(--radius)] [inset:var(--cut)] -z-20 transition-all duration-300 group-hover:shadow-[inset_0_0_12px_rgba(255,255,255,0.2)]" />
      </button>
    );
  }
);

ShimmerButton.displayName = 'ShimmerButton';

