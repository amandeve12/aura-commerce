import React from 'react';
import { Truck, ShieldCheck, Gem, RefreshCw } from 'lucide-react';
import { Highlighter } from './magicui/Highlighter';
import { Marquee } from './magicui/Marquee';

export const WhyChooseUs: React.FC = () => {
  const features = [
    {
      icon: Truck,
      title: 'Complimentary Shipping',
      description: 'Free express worldwide carbon-neutral delivery on all orders over $300.',
    },
    {
      icon: ShieldCheck,
      title: 'Encrypted Security',
      description: 'Bank-grade 256-bit SSL encryption with Apple Pay & biometric checkout.',
    },
    {
      icon: Gem,
      title: 'Uncompromised Quality',
      description: 'Traceable materials from Swiss watchmakers, Tuscan tanneries, and Portuguese mills.',
    },
    {
      icon: RefreshCw,
      title: 'Effortless Returns',
      description: '30-day hassle-free returns with prepaid return labels in every box.',
    },
  ];

  return (
    <section className="py-16 sm:py-24 bg-white dark:bg-neutral-950 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="text-center max-w-xl mx-auto mb-12">
          <span className="text-[11px] font-semibold tracking-[0.2em] text-[#666666] dark:text-neutral-400 uppercase">
            04 • THE AURA PROMISE
          </span>
          <h2 className="text-2xl sm:text-3xl font-light tracking-tight text-[#111111] dark:text-white mt-2">
            Why Discerning Collectors Choose{' '}
            <Highlighter action="underline" color="#0F766E">
              AURA
            </Highlighter>
          </h2>
        </div>

        {/* Single Row Marquee for the 4 Feature Boxes */}
        <div className="relative flex w-full flex-col items-center justify-center overflow-hidden py-2 -mx-4 sm:-mx-6 lg:-mx-8 px-4 sm:px-6 lg:px-8">
          <Marquee pauseOnHover className="[--duration:24s] py-3">
            {features.map((feature, idx) => {
              const IconComp = feature.icon;
              return (
                <div
                  key={idx}
                  className="w-72 sm:w-80 flex-shrink-0 p-6 sm:p-8 rounded-2xl bg-[#F8F8F8] dark:bg-neutral-900/60 border border-[#E5E7EB] dark:border-neutral-800 transition-all duration-300 hover:border-[#0F766E] dark:hover:border-teal-500 hover:shadow-lg text-left cursor-pointer"
                >
                  <div className="w-12 h-12 rounded-full border-2 border-[#111111] dark:border-white text-[#111111] dark:text-white flex items-center justify-center mb-6">
                    <IconComp className="w-5 h-5" />
                  </div>
                  <h3 className="text-base font-bold text-[#111111] dark:text-white mb-2">
                    {feature.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-[#666666] dark:text-neutral-400 leading-relaxed font-light">
                    {feature.description}
                  </p>
                </div>
              );
            })}
          </Marquee>

          {/* Smooth side gradient masks */}
          <div className="pointer-events-none absolute inset-y-0 left-0 w-16 sm:w-28 bg-gradient-to-r from-white dark:from-neutral-950 to-transparent z-10" />
          <div className="pointer-events-none absolute inset-y-0 right-0 w-16 sm:w-28 bg-gradient-to-l from-white dark:from-neutral-950 to-transparent z-10" />
        </div>

      </div>
    </section>
  );
};
