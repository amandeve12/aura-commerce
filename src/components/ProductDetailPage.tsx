import React, { useState } from 'react';
import {
  Star,
  ShoppingBag,
  Heart,
  Truck,
  ShieldCheck,
  RotateCcw,
  Ruler,
  Check,
  ChevronRight,
  Maximize2,
  X,
  MessageSquare,
  Zap,
} from 'lucide-react';
import { useShop } from '../context/ShopContext';
import { ProductCard } from './ProductCard';
import { SizeGuideModal } from './SizeGuideModal';
import { WriteReviewModal } from './WriteReviewModal';

export const ProductDetailPage: React.FC = () => {
  const {
    selectedProductId,
    products,
    addToCart,
    toggleWishlist,
    isInWishlist,
    setCurrentView,
  } = useShop();

  const product = products.find((p) => p.id === selectedProductId) || products[0];
  const inWishlist = isInWishlist(product.id);

  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [selectedColor, setSelectedColor] = useState(product.colors[0]);
  const [selectedSize, setSelectedSize] = useState(product.sizes[0] || 'Standard Fit');
  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState<'description' | 'specs' | 'reviews'>('description');

  const [isLightboxOpen, setIsLightboxOpen] = useState(false);
  const [isSizeGuideOpen, setIsSizeGuideOpen] = useState(false);
  const [isReviewModalOpen, setIsReviewModalOpen] = useState(false);
  const [added, setAdded] = useState(false);

  const handleAddToCart = () => {
    addToCart(product, selectedColor, selectedSize, quantity);
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  };

  const handleBuyNow = () => {
    addToCart(product, selectedColor, selectedSize, quantity);
    setCurrentView('checkout');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const relatedProducts = products
    .filter((p) => p.id !== product.id && p.category === product.category)
    .concat(products.filter((p) => p.id !== product.id))
    .slice(0, 4);

  return (
    <div className="py-10 bg-white dark:bg-neutral-950 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        
        {/* Breadcrumb Navigation */}
        <nav className="flex items-center gap-2 text-xs font-mono text-neutral-400">
          <button
            onClick={() => setCurrentView('home')}
            className="hover:text-black dark:hover:text-white cursor-pointer"
          >
            Home
          </button>
          <ChevronRight className="w-3 h-3" />
          <button
            onClick={() => setCurrentView('shop')}
            className="hover:text-black dark:hover:text-white cursor-pointer"
          >
            {product.category}
          </button>
          <ChevronRight className="w-3 h-3" />
          <span className="text-neutral-900 dark:text-white font-semibold truncate">
            {product.name}
          </span>
        </nav>

        {/* Main Product Showcase Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          
          {/* Left Column: Image Gallery (7 Cols) */}
          <div className="lg:col-span-7 space-y-4">
            {/* Main Stage Image */}
            <div className="relative aspect-square rounded-3xl overflow-hidden bg-neutral-100 dark:bg-neutral-900 border border-neutral-200/80 dark:border-neutral-800 shadow-md group">
              <img
                src={product.images[activeImageIndex] || product.images[0]}
                alt={product.name}
                className="w-full h-full object-cover"
              />

              {/* Lightbox Trigger */}
              <button
                onClick={() => setIsLightboxOpen(true)}
                className="absolute top-4 right-4 p-3 rounded-2xl bg-white/80 dark:bg-neutral-900/80 backdrop-blur-md text-neutral-800 dark:text-neutral-200 hover:bg-white dark:hover:bg-neutral-900 transition-colors cursor-pointer shadow-md"
                title="Expand Gallery"
              >
                <Maximize2 className="w-4 h-4" />
              </button>

              {/* Badges */}
              <div className="absolute top-4 left-4 flex flex-col gap-1.5">
                {product.isNew && (
                  <span className="px-3 py-1 rounded-full bg-neutral-900 dark:bg-white text-white dark:text-neutral-900 text-[10px] font-mono font-bold uppercase">
                    NEW RELEASE
                  </span>
                )}
                {product.discountPercentage && (
                  <span className="px-3 py-1 rounded-full bg-emerald-700 text-white text-[10px] font-mono font-bold uppercase">
                    -{product.discountPercentage}% OFF
                  </span>
                )}
              </div>
            </div>

            {/* Thumbnail Row */}
            {product.images.length > 1 && (
              <div className="flex items-center gap-3 overflow-x-auto pb-2">
                {product.images.map((img, idx) => (
                  <button
                    key={idx}
                    onClick={() => setActiveImageIndex(idx)}
                    className={`w-20 h-20 rounded-2xl overflow-hidden border-2 transition-all cursor-pointer flex-shrink-0 ${
                      idx === activeImageIndex
                        ? 'border-neutral-900 dark:border-white scale-105 shadow-md'
                        : 'border-transparent opacity-60 hover:opacity-100'
                    }`}
                  >
                    <img src={img} alt="" className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Right Column: Product Configurator (5 Cols) */}
          <div className="lg:col-span-5 space-y-6 text-left">
            <div>
              <div className="flex items-center justify-between text-xs font-mono text-neutral-400 mb-2">
                <span className="uppercase tracking-widest font-semibold">{product.brand}</span>
                <div className="flex items-center gap-1.5 text-amber-500 font-bold">
                  <Star className="w-4 h-4 fill-amber-400 text-amber-400" />
                  <span>{product.rating}</span>
                  <a
                    href="#reviews-section"
                    onClick={() => setActiveTab('reviews')}
                    className="text-neutral-400 underline font-normal hover:text-black dark:hover:text-white"
                  >
                    ({product.reviewCount} reviews)
                  </a>
                </div>
              </div>

              <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-neutral-900 dark:text-white font-sans">
                {product.name}
              </h1>

              <p className="text-sm text-neutral-500 mt-2 leading-relaxed">
                {product.subtitle}
              </p>
            </div>

            {/* Price Bar */}
            <div className="p-4 rounded-2xl bg-neutral-50 dark:bg-neutral-900/60 border border-neutral-200/80 dark:border-neutral-800 flex items-center justify-between">
              <div className="flex items-baseline gap-3">
                <span className="text-2xl sm:text-3xl font-bold font-mono text-neutral-900 dark:text-white">
                  ${product.price}
                </span>
                {product.originalPrice && (
                  <span className="text-sm text-neutral-400 line-through font-mono">
                    ${product.originalPrice}
                  </span>
                )}
              </div>
              <span className="text-xs font-mono text-emerald-700 dark:text-emerald-400 font-bold bg-emerald-500/10 px-2.5 py-1 rounded-md">
                In Stock ({product.stock} units ready)
              </span>
            </div>

            {/* Color Selection */}
            {product.colors.length > 0 && (
              <div className="space-y-2">
                <div className="flex justify-between items-center text-xs font-mono">
                  <span className="font-bold text-neutral-700 dark:text-neutral-300 uppercase">
                    Color Finish
                  </span>
                  <span className="text-neutral-500">{selectedColor.name}</span>
                </div>
                <div className="flex items-center gap-2.5">
                  {product.colors.map((c) => (
                    <button
                      key={c.name}
                      onClick={() => setSelectedColor(c)}
                      className={`w-8 h-8 rounded-full border-2 transition-all cursor-pointer p-0.5 ${
                        selectedColor.name === c.name
                          ? 'border-neutral-900 dark:border-white scale-110 shadow-md'
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

            {/* Size Selection */}
            {product.sizes.length > 0 && (
              <div className="space-y-2">
                <div className="flex justify-between items-center text-xs font-mono">
                  <span className="font-bold text-neutral-700 dark:text-neutral-300 uppercase">
                    Select Edition / Size
                  </span>
                  <button
                    onClick={() => setIsSizeGuideOpen(true)}
                    className="text-emerald-700 dark:text-emerald-400 font-semibold flex items-center gap-1 hover:underline cursor-pointer"
                  >
                    <Ruler className="w-3.5 h-3.5" />
                    <span>Size Guide</span>
                  </button>
                </div>
                <div className="flex flex-wrap gap-2">
                  {product.sizes.map((sz) => (
                    <button
                      key={sz}
                      onClick={() => setSelectedSize(sz)}
                      className={`px-4 py-2 rounded-xl text-xs font-medium border transition-all cursor-pointer ${
                        selectedSize === sz
                          ? 'bg-neutral-900 dark:bg-white text-white dark:text-neutral-900 border-neutral-900 dark:border-white font-bold shadow-xs'
                          : 'bg-neutral-50 dark:bg-neutral-800 text-neutral-700 dark:text-neutral-300 border-neutral-200 dark:border-neutral-700 hover:border-neutral-400'
                      }`}
                    >
                      {sz}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Quantity Controls */}
            <div className="space-y-2">
              <label className="block text-xs font-mono font-bold text-neutral-700 dark:text-neutral-300 uppercase">
                QUANTITY
              </label>
              <div className="inline-flex items-center rounded-xl border border-neutral-200 dark:border-neutral-700 bg-neutral-50 dark:bg-neutral-800 p-1">
                <button
                  onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                  className="px-3 py-1 text-sm font-bold text-neutral-600 dark:text-neutral-300 hover:text-black dark:hover:text-white"
                >
                  -
                </button>
                <span className="px-4 py-1 text-sm font-mono font-bold text-neutral-900 dark:text-white">
                  {quantity}
                </span>
                <button
                  onClick={() => setQuantity((q) => q + 1)}
                  className="px-3 py-1 text-sm font-bold text-neutral-600 dark:text-neutral-300 hover:text-black dark:hover:text-white"
                >
                  +
                </button>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="space-y-3 pt-2">
              <div className="flex items-center gap-3">
                <button
                  onClick={handleAddToCart}
                  className={`flex-1 py-4 px-6 rounded-2xl text-xs font-bold tracking-widest uppercase transition-all shadow-lg flex items-center justify-center gap-2 cursor-pointer ${
                    added
                      ? 'bg-emerald-700 text-white'
                      : 'bg-neutral-900 dark:bg-white text-white dark:text-neutral-900 hover:bg-black dark:hover:bg-neutral-100'
                  }`}
                  id="product-add-to-cart"
                >
                  {added ? (
                    <>
                      <Check className="w-4 h-4" />
                      <span>Added to Shopping Bag</span>
                    </>
                  ) : (
                    <>
                      <ShoppingBag className="w-4 h-4" />
                      <span>Add to Bag • ${(product.price * quantity).toFixed(2)}</span>
                    </>
                  )}
                </button>

                <button
                  onClick={() => toggleWishlist(product.id)}
                  className={`p-4 rounded-2xl border transition-all cursor-pointer ${
                    inWishlist
                      ? 'bg-rose-500 text-white border-rose-500 shadow-md'
                      : 'border-neutral-200 dark:border-neutral-700 text-neutral-700 dark:text-neutral-300 hover:border-neutral-400'
                  }`}
                  title={inWishlist ? 'Remove from Wishlist' : 'Add to Wishlist'}
                >
                  <Heart className={`w-4 h-4 ${inWishlist ? 'fill-white' : ''}`} />
                </button>
              </div>

              <button
                onClick={handleBuyNow}
                className="w-full py-3.5 rounded-2xl border border-emerald-700 dark:border-emerald-500 text-emerald-700 dark:text-emerald-400 hover:bg-emerald-50 dark:hover:bg-emerald-950/40 text-xs font-bold tracking-widest uppercase transition-all flex items-center justify-center gap-2 cursor-pointer"
                id="product-buy-now"
              >
                <Zap className="w-4 h-4" />
                <span>Instant Express Checkout</span>
              </button>
            </div>

            {/* Guarantee Cards */}
            <div className="pt-4 grid grid-cols-3 gap-3 text-center border-t border-neutral-100 dark:border-neutral-800">
              <div className="p-3 rounded-2xl bg-neutral-50 dark:bg-neutral-900/50">
                <Truck className="w-4 h-4 text-emerald-700 dark:text-emerald-400 mx-auto mb-1" />
                <span className="text-[10px] font-mono text-neutral-500 block">Free Shipping</span>
              </div>
              <div className="p-3 rounded-2xl bg-neutral-50 dark:bg-neutral-900/50">
                <ShieldCheck className="w-4 h-4 text-emerald-700 dark:text-emerald-400 mx-auto mb-1" />
                <span className="text-[10px] font-mono text-neutral-500 block">2-Yr Warranty</span>
              </div>
              <div className="p-3 rounded-2xl bg-neutral-50 dark:bg-neutral-900/50">
                <RotateCcw className="w-4 h-4 text-emerald-700 dark:text-emerald-400 mx-auto mb-1" />
                <span className="text-[10px] font-mono text-neutral-500 block">30-Day Returns</span>
              </div>
            </div>

          </div>
        </div>

        {/* Detailed Tabs: Overview / Specs / Reviews */}
        <div id="reviews-section" className="pt-10 border-t border-neutral-200 dark:border-neutral-800">
          <div className="flex items-center gap-6 border-b border-neutral-200 dark:border-neutral-800 pb-3">
            <button
              onClick={() => setActiveTab('description')}
              className={`text-sm font-bold tracking-wider font-mono uppercase pb-3 -mb-3 transition-colors cursor-pointer ${
                activeTab === 'description'
                  ? 'border-b-2 border-neutral-900 dark:border-white text-neutral-900 dark:text-white'
                  : 'text-neutral-400 hover:text-neutral-700'
              }`}
            >
              Description & Craft
            </button>
            <button
              onClick={() => setActiveTab('specs')}
              className={`text-sm font-bold tracking-wider font-mono uppercase pb-3 -mb-3 transition-colors cursor-pointer ${
                activeTab === 'specs'
                  ? 'border-b-2 border-neutral-900 dark:border-white text-neutral-900 dark:text-white'
                  : 'text-neutral-400 hover:text-neutral-700'
              }`}
            >
              Technical Specifications
            </button>
            <button
              onClick={() => setActiveTab('reviews')}
              className={`text-sm font-bold tracking-wider font-mono uppercase pb-3 -mb-3 transition-colors cursor-pointer ${
                activeTab === 'reviews'
                  ? 'border-b-2 border-neutral-900 dark:border-white text-neutral-900 dark:text-white'
                  : 'text-neutral-400 hover:text-neutral-700'
              }`}
            >
              Client Reviews ({product.reviews.length})
            </button>
          </div>

          <div className="py-8">
            {activeTab === 'description' && (
              <div className="max-w-3xl space-y-4 text-sm text-neutral-700 dark:text-neutral-300 leading-relaxed font-normal">
                <p>{product.description}</p>
                <p>
                  Every piece undergoes multi-stage hand finishing before being individually inspected at our San Francisco atelier. Uncompromising design created for quiet elegance.
                </p>
              </div>
            )}

            {activeTab === 'specs' && (
              <div className="max-w-2xl overflow-hidden rounded-2xl border border-neutral-200 dark:border-neutral-800">
                <table className="w-full text-left border-collapse text-xs">
                  <tbody className="divide-y divide-neutral-200 dark:divide-neutral-800">
                    {product.specifications.map((spec, i) => (
                      <tr key={i} className={i % 2 === 0 ? 'bg-neutral-50 dark:bg-neutral-900/50' : 'bg-white dark:bg-neutral-900'}>
                        <td className="py-3 px-4 font-mono font-bold text-neutral-500 w-1/3">
                          {spec.label}
                        </td>
                        <td className="py-3 px-4 text-neutral-900 dark:text-white font-medium">
                          {spec.value}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}

            {activeTab === 'reviews' && (
              <div className="space-y-8">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-6 rounded-2xl bg-neutral-50 dark:bg-neutral-900/50 border border-neutral-200/80 dark:border-neutral-800">
                  <div className="flex items-center gap-4">
                    <div className="text-3xl font-bold font-mono text-neutral-900 dark:text-white">
                      {product.rating}
                    </div>
                    <div>
                      <div className="flex items-center gap-1 text-amber-400">
                        {[...Array(5)].map((_, i) => (
                          <Star key={i} className="w-4 h-4 fill-amber-400" />
                        ))}
                      </div>
                      <p className="text-xs text-neutral-500 mt-1">
                        Based on {product.reviewCount} verified purchases
                      </p>
                    </div>
                  </div>

                  <button
                    onClick={() => setIsReviewModalOpen(true)}
                    className="px-6 py-3 rounded-xl bg-neutral-900 dark:bg-white text-white dark:text-neutral-900 text-xs font-bold uppercase tracking-wider flex items-center gap-2 cursor-pointer self-start sm:self-auto"
                  >
                    <MessageSquare className="w-4 h-4" />
                    <span>Write a Review</span>
                  </button>
                </div>

                <div className="space-y-4">
                  {product.reviews.map((rev) => (
                    <div
                      key={rev.id}
                      className="p-6 rounded-2xl bg-white dark:bg-neutral-900 border border-neutral-200/80 dark:border-neutral-800 space-y-3"
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <img
                            src={rev.avatar || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=100&q=80'}
                            alt={rev.author}
                            className="w-9 h-9 rounded-full object-cover"
                          />
                          <div>
                            <h4 className="text-xs font-bold text-neutral-900 dark:text-white">
                              {rev.author}
                            </h4>
                            <span className="text-[10px] text-emerald-700 dark:text-emerald-400 font-mono">
                              Verified Client • {rev.date}
                            </span>
                          </div>
                        </div>

                        <div className="flex items-center gap-0.5 text-amber-400">
                          {[...Array(rev.rating)].map((_, i) => (
                            <Star key={i} className="w-3.5 h-3.5 fill-amber-400" />
                          ))}
                        </div>
                      </div>

                      <h5 className="text-sm font-bold text-neutral-900 dark:text-white">
                        {rev.title}
                      </h5>
                      <p className="text-xs text-neutral-600 dark:text-neutral-400 leading-relaxed">
                        {rev.comment}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Related Products */}
        <div className="pt-12 border-t border-neutral-200 dark:border-neutral-800">
          <div className="mb-8">
            <span className="text-xs font-mono tracking-widest text-neutral-400 uppercase font-semibold">
              COMPLETE THE LOOK
            </span>
            <h2 className="text-2xl font-bold tracking-tight text-neutral-900 dark:text-white mt-1">
              Related Design Objects
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {relatedProducts.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        </div>

      </div>

      {/* Lightbox Modal */}
      {isLightboxOpen && (
        <div
          className="fixed inset-0 z-50 bg-black/90 backdrop-blur-lg flex items-center justify-center p-4"
          onClick={() => setIsLightboxOpen(false)}
        >
          <button
            onClick={() => setIsLightboxOpen(false)}
            className="absolute top-6 right-6 p-3 rounded-full bg-white/10 text-white hover:bg-white/20 transition-colors"
          >
            <X className="w-6 h-6" />
          </button>
          <img
            src={product.images[activeImageIndex] || product.images[0]}
            alt={product.name}
            className="max-w-full max-h-[90vh] object-contain rounded-2xl"
          />
        </div>
      )}

      {/* Size Guide Modal */}
      <SizeGuideModal
        isOpen={isSizeGuideOpen}
        onClose={() => setIsSizeGuideOpen(false)}
        category={product.category}
      />

      {/* Write Review Modal */}
      <WriteReviewModal
        isOpen={isReviewModalOpen}
        onClose={() => setIsReviewModalOpen(false)}
        productId={product.id}
      />
    </div>
  );
};
