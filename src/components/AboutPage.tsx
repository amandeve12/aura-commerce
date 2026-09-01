import React from 'react';
import { ArrowRight, Sparkles, ShieldCheck, Gem, Compass, RefreshCw, Sliders, Clock, LucideIcon } from 'lucide-react';
import { useShop } from '../context/ShopContext';
import { Marquee } from './magicui/Marquee';
import { Highlighter } from './magicui/Highlighter';
import { MorphingText } from './magicui/MorphingText';
import { cn } from '../lib/utils';

interface PhilosophyItem {
  id: string;
  icon: LucideIcon;
  title: string;
  subtitle: string;
  description: string;
}

const philosophyItems: PhilosophyItem[] = [
  {
    id: 'material',
    icon: Gem,
    title: 'Material Traceability',
    subtitle: 'Pure Origin',
    description:
      'Grade 5 titanium from Swiss horology suppliers, organic GOTS French terry from Portugal, and full-grain vegetable-tanned Italian calfskin.',
  },
  {
    id: 'ergonomics',
    icon: Compass,
    title: 'Quiet Ergonomics',
    subtitle: 'Human Harmony',
    description:
      'Every curve, weight distribution, and tactile click is engineered for natural harmony with the human hand and workspace.',
  },
  {
    id: 'noise',
    icon: ShieldCheck,
    title: 'Zero Artificial Noise',
    subtitle: 'Subtle Presence',
    description:
      'No hyper-flashy logos or planned obsolescence. Designed to age gracefully and develop a personal patina over time.',
  },
  {
    id: 'longevity',
    icon: Clock,
    title: 'Enduring Longevity',
    subtitle: 'Generational Craft',
    description:
      'Constructed to withstand decades of daily rituals with serviceable modular components and lifetime studio restoration.',
  },
  {
    id: 'calibration',
    icon: Sliders,
    title: 'Tactile Calibration',
    subtitle: 'Micro Tolerances',
    description:
      'Micro-milled tolerances under 0.02mm for acoustic damping and haptic feedback calibrated to precise mechanical resistance.',
  },
  {
    id: 'circularity',
    icon: RefreshCw,
    title: 'Circular Substrates',
    subtitle: 'Zero Synthetic Waste',
    description:
      '100% natural, recycled, and bio-based core substrate materials with zero single-use polymers throughout packaging.',
  },
];

const firstRow = philosophyItems.slice(0, 3);
const secondRow = philosophyItems.slice(3, 6);

const morphingTexts = [
  'artifact, timepiece, and acoustic enclosure.',
  'precision-milled horology instrument.',
  'tactile sensory enclosure.',
  'hand-finished titanium creation.',
];

const PhilosophyCard: React.FC<PhilosophyItem> = ({
  icon: Icon,
  title,
  subtitle,
  description,
}) => {
  return (
    <figure
      className={cn(
        'relative w-72 sm:w-80 cursor-pointer overflow-hidden rounded-3xl p-6 transition-all duration-300 text-left',
        // light styles
        'border border-neutral-200/80 bg-neutral-50/90 hover:bg-white hover:border-[#0F766E]/40 hover:shadow-lg',
        // dark styles
        'dark:border-neutral-800 dark:bg-neutral-900/60 dark:hover:bg-neutral-900 dark:hover:border-teal-500/40 dark:hover:shadow-teal-950/20'
      )}
    >
      <div className="flex items-center gap-3 mb-3">
        <div className="w-10 h-10 rounded-2xl bg-emerald-50 dark:bg-teal-950/60 border border-emerald-200/60 dark:border-teal-800/60 flex items-center justify-center flex-shrink-0">
          <Icon className="w-5 h-5 text-emerald-700 dark:text-teal-400" />
        </div>
        <div>
          <span className="text-[10px] font-mono font-semibold tracking-wider text-emerald-700 dark:text-teal-400 uppercase">
            {subtitle}
          </span>
          <h3 className="text-sm sm:text-base font-bold text-neutral-900 dark:text-white font-sans line-clamp-1">
            {title}
          </h3>
        </div>
      </div>
      <p className="text-xs text-neutral-600 dark:text-neutral-400 leading-relaxed font-light line-clamp-3">
        {description}
      </p>
    </figure>
  );
};

export const AboutPage: React.FC = () => {
  const { setCurrentView } = useShop();

  return (
    <div className="py-16 sm:py-24 bg-white dark:bg-neutral-950 min-h-screen text-left">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        
        {/* Header */}
        <div className="space-y-4">
          <span className="text-xs font-mono tracking-widest text-neutral-400 uppercase font-semibold">
            THE AURA MONOGRAPH
          </span>
          <h1 className="text-3xl sm:text-5xl font-bold tracking-tight text-neutral-900 dark:text-white font-sans leading-tight">
            Design reduced to pure intention,{' '}
          <Highlighter action="underline" color="#0F766E">
              crafted without friction.
            </Highlighter>
          </h1>
          <p className="text-base sm:text-lg text-neutral-600 dark:text-neutral-300 leading-relaxed font-normal">
            Founded in 2024 between Kyoto and San Francisco, AURA is an independent design laboratory dedicated to creating objects that exist beyond seasonal trend cycles.
          </p>
        </div>

        {/* Feature Hero Photo */}
        <div className="relative rounded-3xl overflow-hidden h-96 sm:h-[480px] bg-neutral-900 shadow-2xl">
          <img
            src="https://images.unsplash.com/photo-1507473885765-e6ed057f782c?auto=format&fit=crop&w=1600&q=80"
            alt="Atelier Craft"
            className="w-full h-full object-cover opacity-80"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
          <div className="absolute bottom-8 left-8 right-8 text-white">
            <span className="text-xs font-mono text-emerald-400 uppercase font-bold tracking-widest">
              ATELIER KYOTO • JAPAN
            </span>
            <p className="text-lg font-bold mt-1">Hand-finished by second-generation metal and glass artisans.</p>
          </div>
        </div>

        {/* Philosophy Marquee Section */}
        <div className="space-y-6">
          <div className="text-center sm:text-left">
            <span className="text-xs font-mono font-semibold tracking-widest text-emerald-700 dark:text-teal-400 uppercase">
              OUR PILLARS
            </span>
            <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-neutral-900 dark:text-white mt-1">
              Core Design Philosophy
            </h2>
            <p className="text-xs sm:text-sm text-neutral-500 dark:text-neutral-400 mt-1 flex flex-wrap items-center gap-1.5">
              <span>Guiding principles embedded into every</span>
              <span className="font-medium  dark:text-teal-300 inline-block min-w-[280px]">
                <MorphingText texts={morphingTexts} />
              </span>
            </p>
          </div>

          <div className="relative flex w-full flex-col items-center justify-center overflow-hidden py-4 -mx-4 sm:-mx-6 lg:-mx-8 px-4 sm:px-6 lg:px-8">
            <Marquee pauseOnHover className="[--duration:28s] py-2">
              {firstRow.map((item) => (
                <PhilosophyCard key={item.id} {...item} />
              ))}
            </Marquee>
            <Marquee reverse pauseOnHover className="[--duration:28s] py-2">
              {secondRow.map((item) => (
                <PhilosophyCard key={item.id} {...item} />
              ))}
            </Marquee>

            {/* Gradient Fades on Edges */}
            <div className="pointer-events-none absolute inset-y-0 left-0 w-16 sm:w-28 bg-gradient-to-r from-white dark:from-neutral-950 to-transparent z-10" />
            <div className="pointer-events-none absolute inset-y-0 right-0 w-16 sm:w-28 bg-gradient-to-l from-white dark:from-neutral-950 to-transparent z-10" />
          </div>
        </div>

        {/* CTA */}
        <div className="p-8 rounded-3xl bg-neutral-900 text-white text-center space-y-4">
          <h2 className="text-2xl font-bold font-sans">Ready to experience AURA?</h2>
          <p className="text-xs text-neutral-400 max-w-md mx-auto">
            Explore our latest releases or contact our concierge for custom studio commissions.
          </p>
          <button
            onClick={() => {
              setCurrentView('shop');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            className="inline-flex items-center gap-2 px-8 py-3.5 rounded-full bg-white text-neutral-900 text-xs font-bold uppercase tracking-wider hover:bg-neutral-100 cursor-pointer"
          >
            <span>Explore Collection</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

      </div>
    </div>
  );
};

