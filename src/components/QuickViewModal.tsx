import React, { useState } from 'react';
import { X, Star, ShoppingBag, Heart, ArrowRight, Check } from 'lucide-react';
import { useShop } from '../context/ShopContext';
import { Product } from '../types';

interface QuickViewContentProps {
  product: Product;
}

const QuickViewContent: React.FC<QuickViewContentProps> = ({ product }) => {
  const {
    closeQuickView,
    addToCart,
    toggleWishlist,
    isInWishlist,
    navigateToProduct,
  } = useShop();

  const inWishlist = isInWishlist(product.id);

  const [selectedColor, setSelectedColor] = useState(product.colors[0] || { name: 'Default', hex: '#000000' });
  const [selectedSize, setSelectedSize] = useState(product.sizes[0] || 'Standard Fit');
  const [quantity, setQuantity] = useState(1);
  const [added, setAdded] = useState(false);
  const [activeImageIndex, setActiveImageIndex] = useState(0);

  const handleAddToCart = () => {
    addToCart(product, selectedColor, selectedSize, quantity);
    setAdded(true);
    setTimeout(() => {
      setAdded(false);
      closeQuickView();
    }, 1200);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/60 backdrop-blur-md animate-in fade-in duration-200">
      <div
        className="relative w-full max-w-4xl bg-white dark:bg-neutral-900 rounded-3xl border border-neutral-200 dark:border-neutral-800 shadow-2xl overflow-hidden animate-in zoom-in-95 duration-200"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close button */}
        <button
          onClick={closeQuickView}
          className="absolute top-4 right-4 z-20 p-2.5 rounded-full bg-white/80 dark:bg-neutral-800/80 backdrop-blur-md text-neutral-600 dark:text-neutral-300 hover:text-black dark:hover:text-white transition-colors cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="grid grid-cols-1 md:grid-cols-2 max-h-[85vh] overflow-y-auto">
          {/* Left Column: Image Showcase */}
          <div className="p-6 bg-[#F8F8F8] dark:bg-neutral-800/40 flex flex-col justify-between">
            <div className="aspect-square rounded-2xl overflow-hidden bg-white dark:bg-neutral-800 mb-4 shadow-sm">
              <img
                src={product.images[activeImageIndex] || product.images[0]}
                alt={product.name}
                className="w-full h-full object-cover"
              />
            </div>

            {/* Thumbnail switcher */}
            {product.images.length > 1 && (
              <div className="flex items-center gap-2 overflow-x-auto pb-1">
                {product.images.map((img, idx) => (
                  <button
                    key={idx}
                    onClick={() => setActiveImageIndex(idx)}
                    className={`w-14 h-14 rounded-xl overflow-hidden border-2 transition-all cursor-pointer flex-shrink-0 ${
                      idx === activeImageIndex
                        ? 'border-[#111111] dark:border-white'
                        : 'border-transparent opacity-60 hover:opacity-100'
                    }`}
                  >
                    <img src={img} alt="" className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Right Column: Product Config & Actions */}
          <div className="p-6 sm:p-8 flex flex-col justify-between space-y-6">
            <div className="space-y-4">
              <div className="flex items-center justify-between text-xs font-mono text-neutral-400">
                <span className="uppercase">{product.brand}</span>
                <div className="flex items-center gap-1 text-amber-500 font-bold">
                  <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                  <span>{product.rating}</span>
                  <span className="text-neutral-400 font-normal">({product.reviewCount})</span>
                </div>
              </div>

              <h2 className="text-xl sm:text-2xl font-bold text-[#111111] dark:text-white font-sans">
                {product.name}
              </h2>

              <p className="text-xs text-[#666666] dark:text-neutral-300 leading-relaxed line-clamp-2">
                {product.description}
              </p>

              <div className="flex items-baseline gap-3">
                <span className="text-2xl font-bold font-mono text-[#111111] dark:text-white">
                  ${product.price}
                </span>
                {product.originalPrice && (
                  <span className="text-sm text-neutral-400 line-through font-mono">
                    ${product.originalPrice}
                  </span>
                )}
              </div>

              {/* Color Swatch Selector */}
              {product.colors.length > 0 && (
                <div className="space-y-2">
                  <label className="block text-xs font-semibold text-neutral-700 dark:text-neutral-300 font-mono">
                    COLOR: <span className="text-neutral-500 font-normal">{selectedColor.name}</span>
                  </label>
                  <div className="flex items-center gap-2">
                    {product.colors.map((c) => (
                      <button
                        key={c.name}
                        onClick={() => setSelectedColor(c)}
                        className={`w-7 h-7 rounded-full border-2 transition-all cursor-pointer p-0.5 ${
                          selectedColor.name === c.name
                            ? 'border-[#111111] dark:border-white scale-110'
                            : 'border-transparent'
                        }`}
                        title={c.name}
                      >
                        <span
                          className="block w-full h-full rounded-full border border-neutral-300 dark:border-neutral-700"
                          style={{ backgroundColor: c.hex }}
                        />
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Size Selector */}
              {product.sizes.length > 0 && (
                <div className="space-y-2">
                  <label className="block text-xs font-semibold text-neutral-700 dark:text-neutral-300 font-mono">
                    SIZE / EDITION
                  </label>
                  <div className="flex flex-wrap gap-2">
                    {product.sizes.map((sz) => (
                      <button
                        key={sz}
                        onClick={() => setSelectedSize(sz)}
                        className={`px-3 py-1.5 rounded-full text-xs font-medium border transition-all cursor-pointer ${
                          selectedSize === sz
                            ? 'bg-[#111111] dark:bg-white text-white dark:text-neutral-900 border-[#111111] dark:border-white'
                            : 'bg-[#F8F8F8] dark:bg-neutral-800 text-neutral-700 dark:text-neutral-300 border-[#E5E7EB] dark:border-neutral-700 hover:border-neutral-400'
                        }`}
                      >
                        {sz}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Quantity Selector */}
              <div className="space-y-2">
                <label className="block text-xs font-semibold text-neutral-700 dark:text-neutral-300 font-mono">
                  QUANTITY
                </label>
                <div className="inline-flex items-center rounded-full border border-[#E5E7EB] dark:border-neutral-700 bg-[#F8F8F8] dark:bg-neutral-800">
                  <button
                    onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                    className="px-3 py-1.5 text-xs font-bold text-neutral-600 dark:text-neutral-300 hover:text-black dark:hover:text-white"
                  >
                    -
                  </button>
                  <span className="px-4 py-1.5 text-xs font-mono font-bold text-[#111111] dark:text-white">
                    {quantity}
                  </span>
                  <button
                    onClick={() => setQuantity((q) => q + 1)}
                    className="px-3 py-1.5 text-xs font-bold text-neutral-600 dark:text-neutral-300 hover:text-black dark:hover:text-white"
                  >
                    +
                  </button>
                </div>
              </div>
            </div>

            {/* Actions */}
            <div className="pt-4 border-t border-[#E5E7EB] dark:border-neutral-800 space-y-3">
              <div className="flex items-center gap-3">
                <button
                  onClick={handleAddToCart}
                  className={`flex-1 py-3.5 px-6 rounded-full text-xs font-bold tracking-wider uppercase transition-all shadow-md flex items-center justify-center gap-2 cursor-pointer ${
                    added
                      ? 'bg-[#0F766E] text-white'
                      : 'bg-[#111111] dark:bg-white text-white dark:text-neutral-900 hover:bg-[#0F766E] dark:hover:bg-white'
                  }`}
                >
                  {added ? (
                    <>
                      <Check className="w-4 h-4" />
                      <span>Added to Bag</span>
                    </>
                  ) : (
                    <>
                      <ShoppingBag className="w-4 h-4" />
                      <span>Add To Cart • ${(product.price * quantity).toFixed(2)}</span>
                    </>
                  )}
                </button>

                <button
                  onClick={() => toggleWishlist(product.id)}
                  className={`p-3.5 rounded-full border transition-all cursor-pointer ${
                    inWishlist
                      ? 'bg-rose-500 text-white border-rose-500'
                      : 'border-[#E5E7EB] dark:border-neutral-700 text-neutral-700 dark:text-neutral-300 hover:border-neutral-400'
                  }`}
                  title={inWishlist ? 'Remove from Wishlist' : 'Add to Wishlist'}
                >
                  <Heart className={`w-4 h-4 ${inWishlist ? 'fill-white' : ''}`} />
                </button>
              </div>

              <button
                onClick={() => {
                  closeQuickView();
                  navigateToProduct(product.id);
                }}
                className="w-full text-center text-xs font-semibold text-[#666666] dark:text-neutral-400 hover:text-[#0F766E] dark:hover:text-teal-300 flex items-center justify-center gap-1 cursor-pointer py-1"
              >
                <span>View Full Technical Specification Page</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export const QuickViewModal: React.FC = () => {
  const { quickViewProduct } = useShop();

  if (!quickViewProduct) return null;

  return <QuickViewContent key={quickViewProduct.id} product={quickViewProduct} />;
};

