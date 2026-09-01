import React from 'react';
import { useShop } from '../context/ShopContext';
import { ArrowRight, Sparkles } from 'lucide-react';
import { KineticText } from './magicui/KineticText';

interface MegaMenuProps {
  isOpen: boolean;
  onSelectCategory: (categoryName: string) => void;
  darkMode: boolean;
}

export const MegaMenu: React.FC<MegaMenuProps> = ({ isOpen, onSelectCategory, darkMode }) => {
  const { categories, products } = useShop();
  const [hoveredCatId, setHoveredCatId] = React.useState<string | null>(null);

  if (!isOpen) return null;

  const featuredProduct = products[0];

  return (
    <div
      className={`absolute top-full left-1/2 -translate-x-1/2 w-screen max-w-5xl rounded-3xl p-8 border shadow-2xl transition-all duration-200 z-50 ${
        darkMode
          ? 'bg-neutral-900/95 backdrop-blur-xl border-neutral-800 text-white'
          : 'bg-white/95 backdrop-blur-xl border-neutral-200 text-neutral-900'
      }`}
      style={{ marginTop: '0.25rem' }}
    >
      <div className="grid grid-cols-12 gap-8">
        {/* Left Column: Categories List */}
        <div className="col-span-7 pr-6 border-r border-neutral-200 dark:border-neutral-800">
          <div className="flex items-center justify-between mb-4">
            <span className="text-xs font-mono tracking-widest text-neutral-400 uppercase">
              Curated Collections
            </span>
            <button
              onClick={() => onSelectCategory('All')}
              className="text-xs font-semibold text-emerald-700 dark:text-emerald-400 hover:underline flex items-center gap-1 cursor-pointer"
            >
              <span>View All ({products.length} Products)</span>
              <ArrowRight className="w-3 h-3" />
            </button>
          </div>

          <div className="grid grid-cols-2 gap-3">
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => onSelectCategory(cat.name)}
                onMouseEnter={() => setHoveredCatId(cat.id)}
                onMouseLeave={() => setHoveredCatId(null)}
                className="group flex items-center gap-3 p-2.5 rounded-2xl hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-all text-left cursor-pointer"
              >
                <div className="w-12 h-12 rounded-xl overflow-hidden bg-neutral-100 dark:bg-neutral-800 flex-shrink-0">
                  <img
                    src={cat.image}
                    alt={cat.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                  />
                </div>
                <div>
                  <h4 className="text-xs font-semibold group-hover:text-emerald-700 dark:group-hover:text-emerald-400 transition-colors">
                    <KineticText text={cat.name} isHovered={hoveredCatId === cat.id} />
                  </h4>
                  <p className="text-[11px] text-neutral-500 line-clamp-1 mt-0.5">
                    {cat.itemCount} items
                  </p>
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Right Column: Featured Spotlight Card */}
        <div className="col-span-5 flex flex-col justify-between">
          <div className="flex items-center gap-1.5 mb-2">
            <Sparkles className="w-3.5 h-3.5 text-amber-500" />
            <span className="text-xs font-mono uppercase tracking-wider text-amber-600 dark:text-amber-400 font-medium">
              Featured Edition
            </span>
          </div>

          {featuredProduct && (
            <div
              onClick={() => onSelectCategory('All')}
              className="group relative rounded-2xl overflow-hidden bg-neutral-900 text-white p-6 flex flex-col justify-end h-56 cursor-pointer"
            >
              <img
                src={featuredProduct.images[0]}
                alt={featuredProduct.name}
                className="absolute inset-0 w-full h-full object-cover opacity-60 group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent" />
              <div className="relative z-10">
                <span className="text-[10px] font-mono tracking-widest text-emerald-400 uppercase">
                  {featuredProduct.category}
                </span>
                <h3 className="text-base font-bold text-white mt-1 group-hover:underline">
                  {featuredProduct.name}
                </h3>
                <p className="text-xs text-neutral-300 line-clamp-1 mt-1">
                  ${featuredProduct.price} • {featuredProduct.subtitle}
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
