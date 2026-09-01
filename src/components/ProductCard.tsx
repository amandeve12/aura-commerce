import React, { useState } from 'react';
import { Heart, Eye, ShoppingBag, Star, Check } from 'lucide-react';
import { Product } from '../types';
import { useShop } from '../context/ShopContext';
import { KineticText } from './magicui/KineticText';

interface ProductCardProps {
  product: Product;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const {
    navigateToProduct,
    openQuickView,
    addToCart,
    toggleWishlist,
    isInWishlist,
  } = useShop();

  const [isHovered, setIsHovered] = useState(false);
  const [addedFeedback, setAddedFeedback] = useState(false);

  const inWishlist = isInWishlist(product.id);
  const secondImage = product.images[1] || product.images[0];

  const handleAddToCart = (e: React.MouseEvent) => {
    e.stopPropagation();
    addToCart(product, product.colors[0], product.sizes[0] || 'Standard Fit', 1);
    setAddedFeedback(true);
    setTimeout(() => setAddedFeedback(false), 1800);
  };

  const handleToggleWishlist = (e: React.MouseEvent) => {
    e.stopPropagation();
    toggleWishlist(product.id);
  };

  const handleQuickView = (e: React.MouseEvent) => {
    e.stopPropagation();
    openQuickView(product);
  };

  return (
    <div
      onClick={() => navigateToProduct(product.id)}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="group relative flex flex-col rounded-2xl bg-white dark:bg-neutral-900 border border-[#E5E7EB] dark:border-neutral-800/80 overflow-hidden shadow-xs hover:shadow-xl transition-all duration-300 cursor-pointer"
      id={`product-card-${product.id}`}
    >
      {/* Image Container */}
      <div className="relative aspect-square w-full overflow-hidden bg-[#F8F8F8] dark:bg-neutral-800/50">
        <img
          src={isHovered ? secondImage : product.images[0]}
          alt={product.name}
          className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500 ease-out"
        />

        {/* Badges Overlay */}
        <div className="absolute top-3 left-3 flex flex-col gap-1.5 z-10">
          {product.isNew && (
            <span className="px-2.5 py-1 rounded-full bg-[#111111] dark:bg-white text-white dark:text-neutral-900 text-[10px] font-mono font-bold tracking-wider uppercase">
              NEW
            </span>
          )}
          {product.discountPercentage && (
            <span className="px-2.5 py-1 rounded-full bg-[#0F766E] text-white text-[10px] font-mono font-bold tracking-wider uppercase">
              -{product.discountPercentage}%
            </span>
          )}
        </div>

        {/* Wishlist Button */}
        <button
          onClick={handleToggleWishlist}
          className={`absolute top-3 right-3 p-2 rounded-full backdrop-blur-md transition-all z-10 cursor-pointer ${
            inWishlist
              ? 'bg-rose-500 text-white shadow-md'
              : 'bg-white/80 dark:bg-neutral-900/80 text-neutral-700 dark:text-neutral-300 hover:bg-white dark:hover:bg-neutral-900 hover:text-rose-500'
          }`}
          title={inWishlist ? 'Remove from Wishlist' : 'Add to Wishlist'}
        >
          <Heart className={`w-4 h-4 ${inWishlist ? 'fill-white' : ''}`} />
        </button>

        {/* Quick View Button (Shows on hover) */}
        <div className="absolute inset-x-3 bottom-3 z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-200 hidden sm:flex gap-2">
          <button
            onClick={handleQuickView}
            className="flex-1 py-2.5 px-3 rounded-full bg-white/90 dark:bg-neutral-900/90 hover:bg-[#111111] hover:text-white dark:hover:bg-white dark:hover:text-neutral-900 text-neutral-900 dark:text-white text-xs font-semibold backdrop-blur-md border border-[#E5E7EB] dark:border-neutral-700 shadow-md flex items-center justify-center gap-1.5 transition-all cursor-pointer"
          >
            <Eye className="w-3.5 h-3.5" />
            <span>Quick View</span>
          </button>
        </div>
      </div>

      {/* Product Information */}
      <div className="p-4 sm:p-5 flex flex-col flex-grow justify-between gap-3">
        <div>
          <div className="flex items-center justify-between gap-2 text-xs font-mono text-[#666666] mb-1">
            <span className="uppercase tracking-wider truncate">{product.brand}</span>
            <div className="flex items-center gap-1 text-amber-500 font-semibold text-[11px]">
              <Star className="w-3 h-3 fill-amber-400 text-amber-400" />
              <span>{product.rating}</span>
            </div>
          </div>

          <h3 className="text-sm sm:text-base font-bold text-[#111111] dark:text-white group-hover:text-[#0F766E] dark:group-hover:text-teal-400 transition-colors line-clamp-1">
            <KineticText text={product.name} isHovered={isHovered} />
          </h3>

          <p className="text-xs text-[#666666] line-clamp-1 mt-0.5">
            {product.subtitle}
          </p>
        </div>

        {/* Price & Add To Cart Bar */}
        <div className="pt-2 border-t border-[#E5E7EB] dark:border-neutral-800 flex items-center justify-between gap-2">
          <div className="flex items-baseline gap-2">
            <span className="text-sm sm:text-base font-bold font-mono text-[#111111] dark:text-white">
              ${product.price}
            </span>
            {product.originalPrice && (
              <span className="text-xs text-neutral-400 line-through font-mono">
                ${product.originalPrice}
              </span>
            )}
          </div>

          <button
            onClick={handleAddToCart}
            className={`px-3 py-2 rounded-full text-xs font-semibold tracking-wider transition-all cursor-pointer flex items-center gap-1.5 ${
              addedFeedback
                ? 'bg-[#0F766E] text-white'
                : 'bg-[#F8F8F8] dark:bg-neutral-800 hover:bg-[#111111] dark:hover:bg-white text-[#111111] dark:text-white hover:text-white dark:hover:text-neutral-900'
            }`}
          >
            {addedFeedback ? (
              <>
                <Check className="w-3.5 h-3.5" />
                <span>Added</span>
              </>
            ) : (
              <>
                <ShoppingBag className="w-3.5 h-3.5" />
                <span>Add</span>
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};
