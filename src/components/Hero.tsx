import React from 'react';
import { ArrowRight, ShieldCheck, RefreshCw, Truck } from 'lucide-react';
import { useShop } from '../context/ShopContext';
import { ShimmerButton } from './magicui/ShimmerButton';
import { AnimatedShinyText } from './magicui/AnimatedShinyText';
import { BorderBeam } from './magicui/BorderBeam';
import { NumberTicker } from './magicui/NumberTicker';
import { PixelImage } from './magicui/PixelImage';
import { Highlighter } from './magicui/Highlighter';

export const Hero: React.FC = () => {
  const { setCurrentView, navigateToProduct, products } = useShop();

  const heroProduct = products[0]; // AURA One Wireless Headphones

  return (
    <section className="relative overflow-hidden bg-white dark:bg-neutral-950 transition-colors">
      {/* Background Geometric Accent Shapes */}
      <div className="absolute top-12 left-10 w-72 h-72 border border-neutral-200/50 dark:border-neutral-800/50 rounded-full pointer-events-none opacity-40" />
      <div className="absolute bottom-10 right-10 w-96 h-96 border border-neutral-200/40 dark:border-neutral-800/40 rounded-full pointer-events-none opacity-30" />
      <div className="absolute top-1/3 right-1/4 w-40 h-40 border border-[#0F766E]/20 rotate-45 pointer-events-none hidden lg:block" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-12 pb-16 lg:pt-20 lg:pb-28">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          
          {/* Left Column: Text & CTAs */}
          <div className="lg:col-span-6 space-y-6 text-left z-10">
            {/* Tagline Badge */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#F8F8F8] dark:bg-neutral-900 border border-[#E5E7EB] dark:border-neutral-800 shadow-2xs">
              <span className="w-2 h-2 rounded-full bg-[#0F766E] animate-pulse" />
              <span className="text-[11px] font-semibold tracking-[0.2em] uppercase">
                <AnimatedShinyText variant="teal">
                  The 2026 Geometric Balance Series
                </AnimatedShinyText>
              </span>
            </div>

            {/* Main Headline with Magic UI Highlighter */}
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-light tracking-tight text-[#111111] dark:text-white leading-[1.08] font-sans">
              Form stripped to its{' '}
              <Highlighter action="underline" color="#0F766E">
                essential balance.
              </Highlighter>
            </h1>

            {/* Short Luxury Description */}
            <p className="text-base sm:text-lg text-[#666666] dark:text-neutral-300 max-w-xl font-light leading-relaxed">
              Curated acoustic objects, matte horology, and organic textiles designed without noise or artificial compromise. Built to endure a lifetime.
            </p>

            {/* Action Buttons */}
            <div className="pt-2 flex flex-col sm:flex-row items-stretch sm:items-center gap-4">
              <ShimmerButton
                onClick={() => setCurrentView('shop')}
                className="px-8 py-4 text-xs font-semibold tracking-widest uppercase text-white cursor-pointer"
                id="hero-shop-cta"
              >
                <span>Shop Collection</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </ShimmerButton>

              <ShimmerButton
                onClick={() => navigateToProduct(heroProduct.id)}
                background="#0F766E"
                shimmerColor="#5eead4"
                className="px-8 py-4 text-xs font-semibold tracking-widest uppercase text-white cursor-pointer"
                id="hero-explore-cta"
              >
                <span>Explore AURA One</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </ShimmerButton>
            </div>

            {/* Trust Badges */}
            <div className="pt-8 grid grid-cols-3 gap-4 border-t border-[#E5E7EB] dark:border-neutral-800/80">
              <div className="flex items-center gap-2 text-neutral-600 dark:text-neutral-400">
                <Truck className="w-4 h-4 text-[#0F766E] dark:text-teal-400 flex-shrink-0" />
                <span className="text-xs font-medium">Free Global Shipping</span>
              </div>
              <div className="flex items-center gap-2 text-neutral-600 dark:text-neutral-400">
                <ShieldCheck className="w-4 h-4 text-[#0F766E] dark:text-teal-400 flex-shrink-0" />
                <span className="text-xs font-medium">2-Year Warranty</span>
              </div>
              <div className="flex items-center gap-2 text-neutral-600 dark:text-neutral-400">
                <RefreshCw className="w-4 h-4 text-[#0F766E] dark:text-teal-400 flex-shrink-0" />
                <span className="text-xs font-medium">30-Day Returns</span>
              </div>
            </div>
          </div>

          {/* Right Column: Hero Visual Showcase */}
          <div className="lg:col-span-6 relative">
            <div className="relative mx-auto max-w-md lg:max-w-none">
              {/* Product Card Container with Magic UI BorderBeam & PixelImage */}
              <div className="relative rounded-3xl overflow-hidden bg-[#F8F8F8] dark:bg-neutral-900 border border-[#E5E7EB] dark:border-neutral-800 shadow-2xl group">
                <BorderBeam size={250} duration={10} colorFrom="#0F766E" colorTo="#5eead4" />
                
                <PixelImage
                  src={heroProduct.images[0]}
                  alt={heroProduct.name}
                  customGrid={{ rows: 4, cols: 6 }}
                  grayscaleAnimation
                  className="w-full h-[460px] sm:h-[540px]"
                />

                {/* Floating Product Tag */}
                <div className="absolute bottom-6 left-6 right-6 p-5 rounded-2xl bg-white/95 dark:bg-neutral-950/95 backdrop-blur-xl border border-[#E5E7EB] dark:border-neutral-800 shadow-xl flex items-center justify-between gap-4 z-20">
                  <div>
                    <span className="text-[10px] font-mono tracking-widest text-[#0F766E] dark:text-teal-400 uppercase font-semibold">
                      EDITION 01 • SPOTLIGHT
                    </span>
                    <h3 className="text-sm sm:text-base font-bold text-[#111111] dark:text-white mt-0.5">
                      {heroProduct.name}
                    </h3>
                    <p className="text-xs text-[#666666] line-clamp-1 mt-0.5">
                      {heroProduct.subtitle}
                    </p>
                  </div>
                  <div className="text-right flex-shrink-0">
                    <span className="text-base sm:text-lg font-bold font-mono text-[#111111] dark:text-white flex items-center justify-end">
                      $<NumberTicker value={heroProduct.price} />
                    </span>
                    <button
                      onClick={() => navigateToProduct(heroProduct.id)}
                      className="block text-[11px] font-semibold text-[#0F766E] dark:text-teal-400 hover:underline mt-1 cursor-pointer"
                    >
                      View Specs →
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

