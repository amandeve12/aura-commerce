import React, { useState } from 'react';
import { ArrowUpRight } from 'lucide-react';
import { useShop } from '../context/ShopContext';
import { Highlighter } from './magicui/Highlighter';
import { KineticText } from './magicui/KineticText';

export const CategoryGrid: React.FC = () => {
  const { categories, setFilters, setCurrentView } = useShop();
  const [hoveredCategoryId, setHoveredCategoryId] = useState<string | null>(null);

  const handleCategoryClick = (categoryName: string) => {
    setFilters((prev) => ({ ...prev, category: categoryName }));
    setCurrentView('shop');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <section className="py-16 sm:py-24 bg-[#F8F8F8] dark:bg-neutral-900/40 border-y border-[#E5E7EB] dark:border-neutral-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-12">
          <div>
            <span className="text-[11px] font-semibold tracking-[0.2em] text-[#666666] dark:text-neutral-400 uppercase">
              01 • ARCHETYPES
            </span>
            <h2 className="text-2xl sm:text-3xl font-light tracking-tight text-[#111111] dark:text-white mt-2">
              Featured{' '}
              <Highlighter action="underline" color="#0F766E">
                Categories
              </Highlighter>
            </h2>
          </div>
          <button
            onClick={() => handleCategoryClick('All')}
            className="text-xs font-semibold tracking-widest uppercase text-[#666666] dark:text-neutral-400 hover:text-[#0F766E] dark:hover:text-teal-300 flex items-center gap-1 cursor-pointer transition-colors"
          >
            <span>Explore All Categories</span>
            <ArrowUpRight className="w-4 h-4" />
          </button>
        </div>

        {/* Categories Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {categories.map((category) => (
            <div
              key={category.id}
              onClick={() => handleCategoryClick(category.name)}
              onMouseEnter={() => setHoveredCategoryId(category.id)}
              onMouseLeave={() => setHoveredCategoryId(null)}
              className="group relative rounded-3xl overflow-hidden bg-neutral-900 text-white h-80 sm:h-96 cursor-pointer shadow-md hover:shadow-2xl transition-all duration-500"
            >
              {/* Image with zoom effect */}
              <img
                src={category.image}
                alt={category.name}
                className="absolute inset-0 w-full h-full object-cover opacity-80 group-hover:scale-105 group-hover:opacity-90 transition-all duration-700 ease-out"
              />

              {/* Gradient Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent transition-opacity group-hover:opacity-90" />

              {/* Content */}
              <div className="relative z-10 h-full p-6 sm:p-8 flex flex-col justify-between">
                <div className="flex justify-between items-start">
                  <span className="text-[11px] font-mono tracking-widest uppercase bg-white/20 dark:bg-black/30 backdrop-blur-md px-3 py-1 rounded-full text-white border border-white/20">
                    {category.itemCount} Products
                  </span>
                  <div className="w-10 h-10 rounded-full bg-white/10 backdrop-blur-md flex items-center justify-center text-white group-hover:bg-white group-hover:text-black transition-all duration-300">
                    <ArrowUpRight className="w-5 h-5" />
                  </div>
                </div>

                <div>
                  <h3 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
                    <KineticText text={category.name} isHovered={hoveredCategoryId === category.id} />
                  </h3>
                  <p className="text-xs text-neutral-300 line-clamp-2 mt-1.5 opacity-90">
                    {category.description}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
