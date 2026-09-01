import React from 'react';
import { ArrowRight, Sparkles } from 'lucide-react';
import { useShop } from '../context/ShopContext';
import { ShimmerButton } from './magicui/ShimmerButton';
import { AnimatedShinyText } from './magicui/AnimatedShinyText';
import { BorderBeam } from './magicui/BorderBeam';
import { MorphingText } from './magicui/MorphingText';
import { ScrollVelocityContainer, ScrollVelocityRow } from './magicui/ScrollVelocity';

export const PromotionalBanner: React.FC = () => {
  const { setCurrentView } = useShop();

  const morphingTexts = [
    'Smoked Glass Vessels',
    'Acoustic Precision',
    'Tactile Minimalism',
    'Kyoto Glass Craft',
    'Pure Balance',
  ];

  return (
    <section className="relative overflow-hidden py-20 bg-neutral-950 text-white my-12 border-y border-[#0F766E]/30">
      <BorderBeam size={300} duration={14} colorFrom="#0F766E" colorTo="#5eead4" />

      {/* Background Editorial Image with dark gradient */}
      <div className="absolute inset-0 z-0">
        <img
          src="https://images.unsplash.com/photo-1507473885765-e6ed057f782c?auto=format&fit=crop&w=2000&q=80"
          alt="Seasonal Drop"
          className="w-full h-full object-cover opacity-30 scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-neutral-950 via-neutral-950/90 to-transparent" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-xl space-y-5 text-left">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#0F766E]/20 border border-[#0F766E]/40 text-teal-300 text-[11px] font-semibold tracking-[0.2em] uppercase shadow-inner">
            <Sparkles className="w-3.5 h-3.5 text-teal-300" />
            <AnimatedShinyText variant="teal">
              SEASONAL MONOGRAPH • AUTUMN 2026
            </AnimatedShinyText>
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-light tracking-tight text-white leading-tight font-sans">
            Architectural Light &{' '}
            <span className="font-medium text-teal-300 inline-block min-w-[280px]">
              <MorphingText texts={morphingTexts} />
            </span>
          </h2>

          <p className="text-neutral-300 text-sm sm:text-base leading-relaxed font-light">
            Limited release series engineered in collaboration with Kyoto glass masters. Hand-blown 24mm smoked flint glass paired with solid brushed aluminum bases.
          </p>

          <div className="pt-3 flex flex-wrap items-center gap-4">
            <ShimmerButton
              onClick={() => setCurrentView('shop')}
              background="bg-white text-[#111111]"
              className="px-8 py-3.5 text-xs font-semibold tracking-widest uppercase shadow-xl cursor-pointer"
            >
              <span>Explore The Drop</span>
              <ArrowRight className="w-4 h-4" />
            </ShimmerButton>
            <span className="text-xs font-mono text-neutral-400">
              Only 150 individually numbered pieces crafted
            </span>
          </div>
        </div>
      </div>


    </section>
  );
};

