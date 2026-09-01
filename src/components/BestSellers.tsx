import React from 'react';
import { Award, ArrowRight } from 'lucide-react';
import { useShop } from '../context/ShopContext';
import { ProductCard } from './ProductCard';
import { Highlighter } from './magicui/Highlighter';

export const BestSellers: React.FC = () => {
  const { products, setCurrentView } = useShop();

  const bestSellerProducts = products.filter((p) => p.isBestSeller).slice(0, 4);

  return (
    <section className="py-16 sm:py-24 bg-[#F8F8F8] dark:bg-neutral-900/40 border-y border-[#E5E7EB] dark:border-neutral-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-12">
          <div>
            <div className="flex items-center gap-2 text-[11px] font-semibold tracking-[0.2em] text-[#0F766E] dark:text-teal-400 uppercase">
              <Award className="w-3.5 h-3.5" />
              <span>03 • COMMUNITY FAVORITES</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-light tracking-tight text-[#111111] dark:text-white mt-2">
              Best{' '}
              <Highlighter action="underline" color="#0F766E">
                Sellers
              </Highlighter>
            </h2>
          </div>

          <button
            onClick={() => setCurrentView('shop')}
            className="text-xs font-semibold tracking-widest uppercase text-[#666666] dark:text-neutral-400 hover:text-[#0F766E] dark:hover:text-teal-300 flex items-center gap-1 cursor-pointer transition-colors"
          >
            <span>View All Best Sellers</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

        {/* Product Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
          {bestSellerProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>

      </div>
    </section>
  );
};
