import React, { useState } from 'react';
import { ArrowRight } from 'lucide-react';
import { useShop } from '../context/ShopContext';
import { ProductCard } from './ProductCard';
import { ShimmerButton } from './magicui/ShimmerButton';
import { Highlighter } from './magicui/Highlighter';

export const FeaturedProducts: React.FC = () => {
  const { products, setCurrentView } = useShop();
  const [activeTab, setActiveTab] = useState<'all' | 'new' | 'bestsellers'>('all');

  const filteredProducts = products.filter((p) => {
    if (activeTab === 'new') return p.isNew;
    if (activeTab === 'bestsellers') return p.isBestSeller;
    return true;
  });

  return (
    <section className="py-16 sm:py-24 bg-white dark:bg-neutral-950">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header & Tab Controls */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div>
            <span className="text-[11px] font-semibold tracking-[0.2em] text-[#666666] dark:text-neutral-400 uppercase">
              02 • CURATED SELECTIONS
            </span>
            <h2 className="text-2xl sm:text-3xl font-light tracking-tight text-[#111111] dark:text-white mt-2">
              Featured{' '}
              <Highlighter action="underline" color="#0F766E">
                Objects
              </Highlighter>
            </h2>
          </div>

          {/* Filter Tabs */}
          <div className="flex items-center gap-1.5 p-1 rounded-full bg-[#F8F8F8] dark:bg-neutral-900 border border-[#E5E7EB] dark:border-neutral-800 self-start md:self-auto">
            <button
              onClick={() => setActiveTab('all')}
              className={`px-4 py-2 rounded-full text-xs font-semibold tracking-wider uppercase transition-all cursor-pointer ${
                activeTab === 'all'
                  ? 'bg-[#111111] dark:bg-white text-white dark:text-neutral-900 shadow-xs'
                  : 'text-[#666666] dark:text-neutral-400 hover:text-[#0F766E] dark:hover:text-teal-300'
              }`}
            >
              All Releases
            </button>
            <button
              onClick={() => setActiveTab('new')}
              className={`px-4 py-2 rounded-full text-xs font-semibold tracking-wider uppercase transition-all cursor-pointer ${
                activeTab === 'new'
                  ? 'bg-[#111111] dark:bg-white text-white dark:text-neutral-900 shadow-xs'
                  : 'text-[#666666] dark:text-neutral-400 hover:text-[#0F766E] dark:hover:text-teal-300'
              }`}
            >
              New Arrivals
            </button>
            <button
              onClick={() => setActiveTab('bestsellers')}
              className={`px-4 py-2 rounded-full text-xs font-semibold tracking-wider uppercase transition-all cursor-pointer ${
                activeTab === 'bestsellers'
                  ? 'bg-[#111111] dark:bg-white text-white dark:text-neutral-900 shadow-xs'
                  : 'text-[#666666] dark:text-neutral-400 hover:text-[#0F766E] dark:hover:text-teal-300'
              }`}
            >
              Best Sellers
            </button>
          </div>
        </div>

        {/* Product Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
          {filteredProducts.slice(0, 8).map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>

        {/* Bottom CTA Link */}
        <div className="mt-12 flex justify-center">
          <ShimmerButton
            onClick={() => setCurrentView('shop')}
            className="px-8 py-3.5 text-xs font-bold tracking-widest uppercase cursor-pointer"
          >
            <span>View Full Catalog</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </ShimmerButton>
        </div>

      </div>
    </section>
  );
};
