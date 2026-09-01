import React, { useState } from 'react';
import { Star, ChevronLeft, ChevronRight, CheckCircle2, Quote } from 'lucide-react';
import { Highlighter } from './magicui/Highlighter';
import { ShineBorder } from './magicui/ShineBorder';
import { Card, CardContent } from './ui/card';

export const Testimonials: React.FC = () => {
  const reviews = [
    {
      id: 't-1',
      name: 'Elena Rostova',
      role: 'Architect & Collector',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80',
      rating: 5,
      product: 'AURA One Headphones',
      comment:
        'AURA represents the rare intersection where sound engineering meets high architecture. The beryllium acoustic clarity is staggering, but the physical tactile feeling of the rotary ring is what makes me reach for them every single day.',
    },
    {
      id: 't-2',
      name: 'Marcus Vance',
      role: 'Creative Director, London',
      avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=200&q=80',
      rating: 5,
      product: 'Edition 01 Titanium Chronograph',
      comment:
        'Subtle, understated luxury. The grade 5 titanium casing holds zero fingerprints, and the Swiss movement keeps flawless timing. Delivery to London took only two days.',
    },
    {
      id: 't-3',
      name: 'Sora Takahashi',
      role: 'Industrial Designer, Tokyo',
      avatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=200&q=80',
      rating: 5,
      product: 'Form & Light Desk Vessel',
      comment:
        'I am deeply particular about ambient light quality in my studio. This aluminum lamp produces a buttery 2700K glow that completely alters my evening workflow.',
    },
  ];

  const [activeIndex, setActiveIndex] = useState(0);

  const nextSlide = () => setActiveIndex((prev) => (prev + 1) % reviews.length);
  const prevSlide = () => setActiveIndex((prev) => (prev - 1 + reviews.length) % reviews.length);

  const current = reviews[activeIndex];

  return (
    <section className="py-16 sm:py-24 bg-neutral-50 dark:bg-neutral-900/40 border-y border-neutral-200/60 dark:border-neutral-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="text-center max-w-xl mx-auto mb-12">
          <span className="text-xs font-mono tracking-widest text-neutral-400 uppercase font-semibold">
            05 • CLIENT VOICES
          </span>
          <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-neutral-900 dark:text-white mt-2">
            Verified Customer{' '}
            <Highlighter action="underline" color="#0F766E">
              Reviews
            </Highlighter>
          </h2>
        </div>

        {/* Testimonial Card */}
        <div className="max-w-3xl mx-auto relative">
          <Card className="relative w-full overflow-hidden p-8 sm:p-12 shadow-xl border border-neutral-200/80 dark:border-neutral-800 bg-white dark:bg-neutral-900 rounded-3xl">
          //  <ShineBorder shineColor={["#A07CFE", "#FE8FB5", "#FFBE7B"]} />s
            <Quote className="absolute top-6 right-8 w-20 h-20 text-neutral-100 dark:text-neutral-800 pointer-events-none -rotate-12" />

            <div className="relative z-10 flex flex-col items-center text-center space-y-6">
              {/* Rating Stars */}
              <div className="flex items-center gap-1 text-amber-400">
                {[...Array(current.rating)].map((_, i) => (
                  <Star key={i} className="w-5 h-5 fill-amber-400" />
                ))}
              </div>

              {/* Comment */}
              <p className="text-base sm:text-xl text-neutral-800 dark:text-neutral-100 font-sans leading-relaxed italic max-w-2xl">
                "{current.comment}"
              </p>

              {/* Customer info */}
              <div className="flex items-center gap-4 pt-2">
                <img
                  src={current.avatar}
                  alt={current.name}
                  className="w-12 h-12 rounded-full object-cover border-2 border-emerald-500"
                />
                <div className="text-left">
                  <div className="flex items-center gap-1.5">
                    <h4 className="text-sm font-bold text-neutral-900 dark:text-white">
                      {current.name}
                    </h4>
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-700 fill-emerald-100 dark:fill-emerald-950" />
                  </div>
                  <p className="text-xs text-neutral-500">
                    {current.role} • <span className="font-medium text-emerald-700 dark:text-emerald-400">{current.product}</span>
                  </p>
                </div>
              </div>
            </div>

            {/* Navigation Controls */}
            <div className="flex items-center justify-between mt-8 pt-6 border-t border-neutral-100 dark:border-neutral-800 relative z-10">
              <div className="flex items-center gap-2">
                {reviews.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => setActiveIndex(i)}
                    className={`h-2 rounded-full transition-all cursor-pointer ${
                      i === activeIndex
                        ? 'w-8 bg-neutral-900 dark:bg-white'
                        : 'w-2 bg-neutral-300 dark:bg-neutral-700'
                    }`}
                  />
                ))}
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={prevSlide}
                  className="p-2.5 rounded-full border border-neutral-200 dark:border-neutral-800 hover:bg-neutral-100 dark:hover:bg-neutral-800 text-neutral-700 dark:text-neutral-300 transition-colors cursor-pointer"
                  title="Previous review"
                >
                  <ChevronLeft className="w-4 h-4" />
                </button>
                <button
                  onClick={nextSlide}
                  className="p-2.5 rounded-full border border-neutral-200 dark:border-neutral-800 hover:bg-neutral-100 dark:hover:bg-neutral-800 text-neutral-700 dark:text-neutral-300 transition-colors cursor-pointer"
                  title="Next review"
                >
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          </Card>
        </div>

      </div>
    </section>
  );
};
