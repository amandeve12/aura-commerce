import React, { useState } from 'react';
import {
  SlidersHorizontal,
  X,
  Search,
  Grid3X3,
  List,
  RotateCcw,
  Star,
  ChevronDown,
} from 'lucide-react';
import { useShop } from '../context/ShopContext';
import { ProductCard } from './ProductCard';
import { Product, FilterState } from '../types';

export const ShopPage: React.FC = () => {
  const {
    products,
    categories,
    filters,
    setFilters,
    resetFilters,
    isMobileFilterOpen,
    setIsMobileFilterOpen,
    navigateToProduct,
  } = useShop();

  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;

  // Available unique brands
  const allBrands = Array.from(new Set(products.map((p) => p.brand)));

  // Filter application
  const filteredProducts = products.filter((p) => {
    // Search query
    if (
      filters.searchQuery.trim() &&
      !p.name.toLowerCase().includes(filters.searchQuery.toLowerCase()) &&
      !p.category.toLowerCase().includes(filters.searchQuery.toLowerCase()) &&
      !p.brand.toLowerCase().includes(filters.searchQuery.toLowerCase())
    ) {
      return false;
    }

    // Category
    if (filters.category !== 'All' && p.category !== filters.category) {
      return false;
    }

    // Brand
    if (filters.brand !== 'All' && p.brand !== filters.brand) {
      return false;
    }

    // Price range
    if (p.price < filters.minPrice || p.price > filters.maxPrice) {
      return false;
    }

    // Rating
    if (filters.rating > 0 && p.rating < filters.rating) {
      return false;
    }

    // In stock
    if (filters.inStockOnly && p.stock <= 0) {
      return false;
    }

    return true;
  });

  // Sorting
  const sortedProducts = [...filteredProducts].sort((a, b) => {
    if (filters.sortBy === 'price-asc') return a.price - b.price;
    if (filters.sortBy === 'price-desc') return b.price - a.price;
    if (filters.sortBy === 'rating') return b.rating - a.rating;
    if (filters.sortBy === 'newest') return (b.isNew ? 1 : 0) - (a.isNew ? 1 : 0);
    return 0; // featured default
  });

  // Pagination
  const totalPages = Math.ceil(sortedProducts.length / itemsPerPage);
  const paginatedProducts = sortedProducts.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const activeFiltersCount =
    (filters.category !== 'All' ? 1 : 0) +
    (filters.brand !== 'All' ? 1 : 0) +
    (filters.rating > 0 ? 1 : 0) +
    (filters.maxPrice < 2000 ? 1 : 0) +
    (filters.inStockOnly ? 1 : 0) +
    (filters.searchQuery ? 1 : 0);

  return (
    <div className="py-10 bg-white dark:bg-neutral-950 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Page Header Breadcrumbs */}
        <div className="mb-8 space-y-2">
          <span className="text-xs font-mono tracking-widest text-neutral-400 uppercase font-semibold">
            CATALOG • ALL EDITIONS
          </span>
          <h1 className="text-3xl sm:text-4xl font-bold tracking-tight text-neutral-900 dark:text-white font-sans">
            Curated Design Objects
          </h1>
          <p className="text-sm text-neutral-500 max-w-xl">
            Explore our collection of acoustic instruments, horological masterpieces, and organic architectural apparel.
          </p>
        </div>

        {/* Layout Grid: Sidebar + Product Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Desktop Filter Sidebar */}
          <aside className="hidden lg:block lg:col-span-3 sticky top-28 p-6 rounded-3xl bg-neutral-50 dark:bg-neutral-900/50 border border-neutral-200/80 dark:border-neutral-800 space-y-6">
            <div className="flex items-center justify-between pb-4 border-b border-neutral-200 dark:border-neutral-800">
              <div className="flex items-center gap-2">
                <SlidersHorizontal className="w-4 h-4 text-neutral-900 dark:text-white" />
                <h3 className="text-sm font-bold text-neutral-900 dark:text-white font-sans">
                  Refine Collection
                </h3>
              </div>
              {activeFiltersCount > 0 && (
                <button
                  onClick={resetFilters}
                  className="text-xs text-rose-600 dark:text-rose-400 font-medium flex items-center gap-1 hover:underline cursor-pointer"
                >
                  <RotateCcw className="w-3 h-3" />
                  <span>Reset</span>
                </button>
              )}
            </div>

            {/* Search Filter */}
            <div className="space-y-2">
              <label className="text-xs font-mono font-semibold text-neutral-700 dark:text-neutral-300 uppercase">
                Search Term
              </label>
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-400" />
                <input
                  type="text"
                  placeholder="Keywords..."
                  value={filters.searchQuery}
                  onChange={(e) => setFilters((p) => ({ ...p, searchQuery: e.target.value }))}
                  className="w-full pl-9 pr-3 py-2 rounded-xl bg-white dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 text-xs text-neutral-900 dark:text-white placeholder-neutral-400 focus:outline-none"
                />
              </div>
            </div>

            {/* Categories Checklist */}
            <div className="space-y-2">
              <label className="text-xs font-mono font-semibold text-neutral-700 dark:text-neutral-300 uppercase">
                Categories
              </label>
              <div className="space-y-1.5">
                <button
                  onClick={() => setFilters((p) => ({ ...p, category: 'All' }))}
                  className={`w-full text-left px-3 py-1.5 rounded-xl text-xs font-medium transition-colors cursor-pointer ${
                    filters.category === 'All'
                      ? 'bg-neutral-900 dark:bg-white text-white dark:text-neutral-900 font-bold'
                      : 'text-neutral-600 dark:text-neutral-400 hover:bg-neutral-200/60 dark:hover:bg-neutral-800'
                  }`}
                >
                  All Categories ({products.length})
                </button>
                {categories.map((cat) => (
                  <button
                    key={cat.id}
                    onClick={() => setFilters((p) => ({ ...p, category: cat.name }))}
                    className={`w-full text-left px-3 py-1.5 rounded-xl text-xs font-medium transition-colors cursor-pointer flex justify-between items-center ${
                      filters.category === cat.name
                        ? 'bg-neutral-900 dark:bg-white text-white dark:text-neutral-900 font-bold'
                        : 'text-neutral-600 dark:text-neutral-400 hover:bg-neutral-200/60 dark:hover:bg-neutral-800'
                    }`}
                  >
                    <span>{cat.name}</span>
                    <span className="text-[10px] font-mono opacity-70">{cat.itemCount}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Brand Filter */}
            <div className="space-y-2">
              <label className="text-xs font-mono font-semibold text-neutral-700 dark:text-neutral-300 uppercase">
                Studio & Brand
              </label>
              <select
                value={filters.brand}
                onChange={(e) => setFilters((p) => ({ ...p, brand: e.target.value }))}
                className="w-full px-3 py-2 rounded-xl bg-white dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 text-xs text-neutral-900 dark:text-white focus:outline-none"
              >
                <option value="All">All Brands</option>
                {allBrands.map((b) => (
                  <option key={b} value={b}>
                    {b}
                  </option>
                ))}
              </select>
            </div>

            {/* Max Price Slider */}
            <div className="space-y-2">
              <div className="flex justify-between text-xs font-mono font-semibold text-neutral-700 dark:text-neutral-300 uppercase">
                <span>Max Price</span>
                <span>${filters.maxPrice}</span>
              </div>
              <input
                type="range"
                min="50"
                max="2000"
                step="50"
                value={filters.maxPrice}
                onChange={(e) =>
                  setFilters((p) => ({ ...p, maxPrice: Number(e.target.value) }))
                }
                className="w-full accent-emerald-700 cursor-pointer"
              />
            </div>

            {/* Minimum Rating */}
            <div className="space-y-2">
              <label className="text-xs font-mono font-semibold text-neutral-700 dark:text-neutral-300 uppercase">
                Minimum Rating
              </label>
              <div className="flex items-center gap-1">
                {[0, 4, 4.5, 4.8].map((stars) => (
                  <button
                    key={stars}
                    onClick={() => setFilters((p) => ({ ...p, rating: stars }))}
                    className={`px-2.5 py-1 rounded-lg text-xs font-mono transition-colors cursor-pointer ${
                      filters.rating === stars
                        ? 'bg-amber-500 text-white font-bold'
                        : 'bg-white dark:bg-neutral-800 text-neutral-600 dark:text-neutral-400 hover:bg-neutral-200'
                    }`}
                  >
                    {stars === 0 ? 'Any' : `${stars}+ ★`}
                  </button>
                ))}
              </div>
            </div>
          </aside>

          {/* Main Product Area */}
          <main className="lg:col-span-9 space-y-6">
            
            {/* Top Toolbar: Sorting & View Toggle */}
            <div className="p-4 rounded-2xl bg-neutral-50 dark:bg-neutral-900/50 border border-neutral-200/80 dark:border-neutral-800 flex flex-wrap items-center justify-between gap-4">
              
              <div className="flex items-center gap-3">
                {/* Mobile Filter Button */}
                <button
                  onClick={() => setIsMobileFilterOpen(true)}
                  className="lg:hidden px-3.5 py-2 rounded-xl bg-neutral-900 dark:bg-white text-white dark:text-neutral-900 text-xs font-semibold flex items-center gap-2 cursor-pointer"
                >
                  <SlidersHorizontal className="w-3.5 h-3.5" />
                  <span>Filters {activeFiltersCount > 0 ? `(${activeFiltersCount})` : ''}</span>
                </button>

                <p className="text-xs font-mono text-neutral-500">
                  Showing <strong>{sortedProducts.length}</strong> design items
                </p>
              </div>

              <div className="flex items-center gap-4">
                {/* Sorting Select */}
                <div className="flex items-center gap-2 text-xs font-mono">
                  <span className="text-neutral-400 hidden sm:inline">SORT BY:</span>
                  <select
                    value={filters.sortBy}
                    onChange={(e) =>
                      setFilters((p) => ({
                        ...p,
                        sortBy: e.target.value as FilterState['sortBy'],
                      }))
                    }
                    className="px-3 py-1.5 rounded-xl bg-white dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 text-xs font-sans text-neutral-900 dark:text-white focus:outline-none cursor-pointer"
                  >
                    <option value="featured">Featured Releases</option>
                    <option value="price-asc">Price: Low to High</option>
                    <option value="price-desc">Price: High to Low</option>
                    <option value="rating">Highest Rated</option>
                    <option value="newest">New Arrivals</option>
                  </select>
                </div>

                {/* View Mode Toggle */}
                <div className="hidden sm:flex items-center gap-1 p-1 rounded-xl bg-white dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700">
                  <button
                    onClick={() => setViewMode('grid')}
                    className={`p-1.5 rounded-lg transition-colors cursor-pointer ${
                      viewMode === 'grid'
                        ? 'bg-neutral-900 dark:bg-white text-white dark:text-neutral-900'
                        : 'text-neutral-400 hover:text-black dark:hover:text-white'
                    }`}
                    title="Grid View"
                  >
                    <Grid3X3 className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => setViewMode('list')}
                    className={`p-1.5 rounded-lg transition-colors cursor-pointer ${
                      viewMode === 'list'
                        ? 'bg-neutral-900 dark:bg-white text-white dark:text-neutral-900'
                        : 'text-neutral-400 hover:text-black dark:hover:text-white'
                    }`}
                    title="List View"
                  >
                    <List className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>

            {/* Active Filters Bar */}
            {activeFiltersCount > 0 && (
              <div className="flex flex-wrap items-center gap-2 text-xs font-mono">
                <span className="text-neutral-400">ACTIVE FILTERS:</span>
                {filters.category !== 'All' && (
                  <span className="px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-700 dark:text-emerald-400 flex items-center gap-1.5">
                    Category: {filters.category}
                    <button
                      onClick={() => setFilters((p) => ({ ...p, category: 'All' }))}
                      className="hover:text-rose-500"
                    >
                      <X className="w-3 h-3" />
                    </button>
                  </span>
                )}
                {filters.brand !== 'All' && (
                  <span className="px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-700 dark:text-emerald-400 flex items-center gap-1.5">
                    Brand: {filters.brand}
                    <button
                      onClick={() => setFilters((p) => ({ ...p, brand: 'All' }))}
                      className="hover:text-rose-500"
                    >
                      <X className="w-3 h-3" />
                    </button>
                  </span>
                )}
                {filters.rating > 0 && (
                  <span className="px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-700 dark:text-emerald-400 flex items-center gap-1.5">
                    Rating: {filters.rating}+ ★
                    <button
                      onClick={() => setFilters((p) => ({ ...p, rating: 0 }))}
                      className="hover:text-rose-500"
                    >
                      <X className="w-3 h-3" />
                    </button>
                  </span>
                )}
                <button
                  onClick={resetFilters}
                  className="text-rose-600 underline hover:text-rose-700 cursor-pointer"
                >
                  Clear All
                </button>
              </div>
            )}

            {/* Product Grid / List Container */}
            {paginatedProducts.length === 0 ? (
              <div className="py-20 text-center space-y-4 bg-neutral-50 dark:bg-neutral-900/30 rounded-3xl border border-neutral-200/80 dark:border-neutral-800">
                <p className="text-base font-bold text-neutral-800 dark:text-neutral-200">
                  No products match your selected filters
                </p>
                <button
                  onClick={resetFilters}
                  className="px-6 py-2.5 rounded-full bg-neutral-900 dark:bg-white text-white dark:text-neutral-900 text-xs font-bold uppercase tracking-wider cursor-pointer"
                >
                  Reset All Filters
                </button>
              </div>
            ) : viewMode === 'grid' ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {paginatedProducts.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            ) : (
              <div className="space-y-4">
                {paginatedProducts.map((product) => (
                  <div
                    key={product.id}
                    onClick={() => navigateToProduct(product.id)}
                    className="p-4 rounded-2xl bg-white dark:bg-neutral-900 border border-neutral-200/80 dark:border-neutral-800 hover:shadow-lg transition-all flex flex-col sm:flex-row items-center gap-6 cursor-pointer group"
                  >
                    <img
                      src={product.images[0]}
                      alt={product.name}
                      className="w-full sm:w-40 h-40 rounded-xl object-cover"
                    />
                    <div className="flex-1 space-y-2 text-left">
                      <div className="flex items-center gap-2 text-xs font-mono text-neutral-400">
                        <span>{product.brand}</span>
                        <span>•</span>
                        <span>{product.category}</span>
                      </div>
                      <h3 className="text-lg font-bold text-neutral-900 dark:text-white group-hover:text-emerald-700 dark:group-hover:text-emerald-400 transition-colors">
                        {product.name}
                      </h3>
                      <p className="text-xs text-neutral-500 line-clamp-2">
                        {product.description}
                      </p>
                      <div className="flex items-center gap-2 text-amber-500 text-xs font-bold">
                        <Star className="w-3.5 h-3.5 fill-amber-400" />
                        <span>{product.rating}</span>
                        <span className="text-neutral-400 font-normal">({product.reviewCount} reviews)</span>
                      </div>
                    </div>
                    <div className="sm:text-right flex sm:flex-col justify-between items-center sm:items-end w-full sm:w-auto gap-2 border-t sm:border-t-0 pt-3 sm:pt-0">
                      <span className="text-xl font-bold font-mono text-neutral-900 dark:text-white">
                        ${product.price}
                      </span>
                      <button className="px-4 py-2 rounded-xl bg-neutral-900 dark:bg-white text-white dark:text-neutral-900 text-xs font-semibold uppercase tracking-wider">
                        View Product
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* Pagination */}
            {totalPages > 1 && (
              <div className="pt-8 flex items-center justify-center gap-2 font-mono text-xs">
                {Array.from({ length: totalPages }).map((_, idx) => {
                  const pageNum = idx + 1;
                  return (
                    <button
                      key={pageNum}
                      onClick={() => {
                        setCurrentPage(pageNum);
                        window.scrollTo({ top: 200, behavior: 'smooth' });
                      }}
                      className={`w-9 h-9 rounded-xl font-bold transition-all cursor-pointer ${
                        currentPage === pageNum
                          ? 'bg-neutral-900 dark:bg-white text-white dark:text-neutral-900 shadow-md'
                          : 'bg-neutral-100 dark:bg-neutral-800 text-neutral-600 dark:text-neutral-400 hover:bg-neutral-200'
                      }`}
                    >
                      {pageNum}
                    </button>
                  );
                })}
              </div>
            )}

          </main>
        </div>

      </div>

      {/* Mobile Filters Drawer Modal */}
      {isMobileFilterOpen && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex justify-end">
          <div className="w-full max-w-xs bg-white dark:bg-neutral-900 h-full p-6 overflow-y-auto space-y-6">
            <div className="flex items-center justify-between pb-4 border-b border-neutral-200 dark:border-neutral-800">
              <h3 className="text-base font-bold text-neutral-900 dark:text-white">Filters</h3>
              <button
                onClick={() => setIsMobileFilterOpen(false)}
                className="p-1 rounded-full text-neutral-500 hover:text-black dark:hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Category */}
            <div className="space-y-2">
              <label className="text-xs font-mono font-bold text-neutral-500">CATEGORY</label>
              <div className="space-y-1">
                <button
                  onClick={() => setFilters((p) => ({ ...p, category: 'All' }))}
                  className={`w-full text-left px-3 py-1.5 rounded-lg text-xs font-semibold ${
                    filters.category === 'All' ? 'bg-neutral-900 text-white dark:bg-white dark:text-black' : ''
                  }`}
                >
                  All
                </button>
                {categories.map((cat) => (
                  <button
                    key={cat.id}
                    onClick={() => setFilters((p) => ({ ...p, category: cat.name }))}
                    className={`w-full text-left px-3 py-1.5 rounded-lg text-xs font-semibold ${
                      filters.category === cat.name ? 'bg-neutral-900 text-white dark:bg-white dark:text-black' : ''
                    }`}
                  >
                    {cat.name}
                  </button>
                ))}
              </div>
            </div>

            <button
              onClick={() => setIsMobileFilterOpen(false)}
              className="w-full py-3 rounded-2xl bg-neutral-900 dark:bg-white text-white dark:text-neutral-900 text-xs font-bold uppercase tracking-wider"
            >
              Apply Filters
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
