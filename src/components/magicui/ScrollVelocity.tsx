import React, { useRef } from 'react';
import {
  motion,
  useScroll,
  useSpring,
  useTransform,
  useMotionValue,
  useVelocity,
  useAnimationFrame,
} from 'motion/react';

interface ScrollVelocityContainerProps {
  children: React.ReactNode;
  className?: string;
}

export const ScrollVelocityContainer: React.FC<ScrollVelocityContainerProps> = ({
  children,
  className = '',
}) => {
  return (
    <div className={`relative flex w-full flex-col items-center justify-center overflow-hidden ${className}`}>
      {children}
      <div className="pointer-events-none absolute inset-y-0 left-0 w-12 bg-gradient-to-r from-white dark:from-neutral-950 to-transparent z-10" />
      <div className="pointer-events-none absolute inset-y-0 right-0 w-12 bg-gradient-to-l from-white dark:from-neutral-950 to-transparent z-10" />
    </div>
  );
};

interface ScrollVelocityRowProps {
  children: React.ReactNode;
  baseVelocity?: number;
  direction?: 1 | -1;
  className?: string;
}

function wrap(min: number, max: number, v: number) {
  const rangeSize = max - min;
  return ((((v - min) % rangeSize) + rangeSize) % rangeSize) + min;
}

export const ScrollVelocityRow: React.FC<ScrollVelocityRowProps> = ({
  children,
  baseVelocity = 2,
  direction = 1,
  className = '',
}) => {
  const baseX = useMotionValue(0);
  const { scrollY } = useScroll();
  const scrollVelocity = useVelocity(scrollY);
  const smoothVelocity = useSpring(scrollVelocity, {
    damping: 60,
    stiffness: 300,
  });
  const velocityFactor = useTransform(smoothVelocity, [0, 1000], [0, 1.5], {
    clamp: true,
  });

  // Seamless wrap across repeated children spans (4 spans = 25% period)
  const x = useTransform(baseX, (v) => `${wrap(-25, 0, v)}%`);

  const directionFactor = useRef<number>(1);
  useAnimationFrame((t, delta) => {
    let moveBy = directionFactor.current * baseVelocity * (delta / 1000);

    if (velocityFactor.get() < 0) {
      directionFactor.current = -1;
    } else if (velocityFactor.get() > 0) {
      directionFactor.current = 1;
    }

    moveBy += directionFactor.current * velocityFactor.get() * (delta / 1000);

    baseX.set(baseX.get() - moveBy * direction);
  });

  return (
    <div className="flex flex-nowrap overflow-hidden whitespace-nowrap">
      <motion.div
        className={`flex flex-nowrap whitespace-nowrap text-xs sm:text-sm uppercase tracking-widest font-semibold py-2.5 ${className}`}
        style={{ x }}
      >
        <span className="flex items-center gap-8 mx-4">{children}</span>
        <span className="flex items-center gap-8 mx-4">{children}</span>
        <span className="flex items-center gap-8 mx-4">{children}</span>
        <span className="flex items-center gap-8 mx-4">{children}</span>
      </motion.div>
    </div>
  );
};
