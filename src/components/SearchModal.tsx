import React, { useState, useEffect } from 'react';
import { Search, X, ArrowRight, Sparkles, Tag, TrendingUp } from 'lucide-react';
import { useShop } from '../context/ShopContext';

export const SearchModal: React.FC = () => {
  const { isSearchOpen, setIsSearchOpen, products, navigateToProduct } = useShop();
  const [query, setQuery] = useState('');

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        setIsSearchOpen(true);
      }
      if (e.key === 'Escape' && isSearchOpen) {
        setIsSearchOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isSearchOpen, setIsSearchOpen]);

  if (!isSearchOpen) return null;

  const filteredProducts = query.trim()
    ? products.filter(
        (p) =>
          p.name.toLowerCase().includes(query.toLowerCase()) ||
          p.category.toLowerCase().includes(query.toLowerCase()) ||
          p.tags.some((t) => t.toLowerCase().includes(query.toLowerCase())) ||
          p.subtitle.toLowerCase().includes(query.toLowerCase())
      )
    : [];

  const popularSearches = ['Wireless Audio', 'Titanium Watch', 'French Terry Hoodie', 'Sandalwood', 'Calfskin Tote', 'Desk Lamp'];

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-16 sm:pt-24 px-4 bg-black/60 backdrop-blur-md animate-in fade-in duration-200">
      <div
        className="w-full max-w-2xl bg-white dark:bg-neutral-900 rounded-3xl border border-neutral-200 dark:border-neutral-800 shadow-2xl overflow-hidden animate-in zoom-in-95 duration-200"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Search Input Bar */}
        <div className="p-4 sm:p-5 border-b border-neutral-200 dark:border-neutral-800 flex items-center gap-3">
          <Search className="w-5 h-5 text-neutral-400 flex-shrink-0" />
          <input
            type="text"
            placeholder="Search products, materials, or collections..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            autoFocus
            className="w-full bg-transparent text-base sm:text-lg text-neutral-900 dark:text-white placeholder-neutral-400 focus:outline-none"
          />
          {query && (
            <button
              onClick={() => setQuery('')}
              className="text-xs font-medium text-neutral-400 hover:text-neutral-600 dark:hover:text-neutral-200 px-2 py-1 rounded-md"
            >
              Clear
            </button>
          )}
          <button
            onClick={() => setIsSearchOpen(false)}
            className="p-2 rounded-full hover:bg-neutral-100 dark:hover:bg-neutral-800 text-neutral-500 cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Results / Empty state */}
        <div className="p-6 max-h-[60vh] overflow-y-auto">
          {query.trim() === '' ? (
            <div>
              <div className="flex items-center gap-2 text-xs font-mono tracking-widest text-neutral-400 uppercase mb-3">
                <TrendingUp className="w-3.5 h-3.5 text-emerald-600" />
                <span>Trending Searches</span>
              </div>
              <div className="flex flex-wrap gap-2 mb-6">
                {popularSearches.map((term) => (
                  <button
                    key={term}
                    onClick={() => setQuery(term)}
                    className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-neutral-100 dark:bg-neutral-800 text-xs font-medium text-neutral-700 dark:text-neutral-300 hover:bg-neutral-200 dark:hover:bg-neutral-700 transition-colors cursor-pointer"
                  >
                    <Tag className="w-3 h-3 text-neutral-400" />
                    <span>{term}</span>
                  </button>
                ))}
              </div>

              <div className="flex items-center gap-2 text-xs font-mono tracking-widest text-neutral-400 uppercase mb-3">
                <Sparkles className="w-3.5 h-3.5 text-amber-500" />
                <span>Quick Recommendations</span>
              </div>
              <div className="space-y-2">
                {products.slice(0, 3).map((product) => (
                  <button
                    key={product.id}
                    onClick={() => {
                      setIsSearchOpen(false);
                      navigateToProduct(product.id);
                    }}
                    className="w-full flex items-center justify-between p-2.5 rounded-2xl hover:bg-neutral-100 dark:hover:bg-neutral-800/60 transition-colors text-left cursor-pointer group"
                  >
                    <div className="flex items-center gap-3">
                      <img
                        src={product.images[0]}
                        alt={product.name}
                        className="w-10 h-10 rounded-xl object-cover"
                      />
                      <div>
                        <h4 className="text-xs font-bold text-neutral-900 dark:text-white group-hover:text-emerald-700 dark:group-hover:text-emerald-400 transition-colors">
                          {product.name}
                        </h4>
                        <p className="text-[11px] text-neutral-500">{product.category}</p>
                      </div>
                    </div>
                    <span className="text-xs font-semibold text-neutral-900 dark:text-white font-mono">
                      ${product.price}
                    </span>
                  </button>
                ))}
              </div>
            </div>
          ) : filteredProducts.length > 0 ? (
            <div className="space-y-3">
              <p className="text-xs font-mono text-neutral-400 mb-2">
                Found {filteredProducts.length} matching result{filteredProducts.length > 1 ? 's' : ''}
              </p>
              {filteredProducts.map((product) => (
                <button
                  key={product.id}
                  onClick={() => {
                    setIsSearchOpen(false);
                    navigateToProduct(product.id);
                  }}
                  className="w-full flex items-center justify-between p-3 rounded-2xl hover:bg-neutral-100 dark:hover:bg-neutral-800/80 transition-colors text-left cursor-pointer group"
                >
                  <div className="flex items-center gap-3.5">
                    <img
                      src={product.images[0]}
                      alt={product.name}
                      className="w-12 h-12 rounded-xl object-cover flex-shrink-0"
                    />
                    <div>
                      <h4 className="text-xs font-bold text-neutral-900 dark:text-white group-hover:text-emerald-700 dark:group-hover:text-emerald-400 transition-colors">
                        {product.name}
                      </h4>
                      <p className="text-[11px] text-neutral-500 line-clamp-1">
                        {product.subtitle}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-bold font-mono text-neutral-900 dark:text-white">
                      ${product.price}
                    </span>
                    <ArrowRight className="w-3.5 h-3.5 text-neutral-400 group-hover:text-emerald-700 transition-transform group-hover:translate-x-1" />
                  </div>
                </button>
              ))}
            </div>
          ) : (
            <div className="py-8 text-center">
              <p className="text-sm font-medium text-neutral-600 dark:text-neutral-400">
                No matching products found for "{query}"
              </p>
              <p className="text-xs text-neutral-400 mt-1">
                Try searching for 'watch', 'audio', 'hoodie', or 'leather'.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
