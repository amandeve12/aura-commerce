import React, { useState, useEffect } from 'react';
import {
  Search,
  ShoppingBag,
  Heart,
  User,
  Sun,
  Moon,
  Menu,
  X,
  ChevronDown,
  Sparkles,
  Package,
  LogOut,
  SlidersHorizontal,
} from 'lucide-react';
import { useShop } from '../context/ShopContext';
import { MegaMenu } from './MegaMenu';
import { ScrollVelocityContainer, ScrollVelocityRow } from './magicui/ScrollVelocity';

interface NavbarProps {
  darkMode: boolean;
  setDarkMode: (val: boolean) => void;
}

export const Navbar: React.FC<NavbarProps> = ({ darkMode, setDarkMode }) => {
  const {
    currentView,
    setCurrentView,
    cartItemCount,
    wishlist,
    setIsCartOpen,
    setIsSearchOpen,
    user,
    setFilters,
  } = useShop();

  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isUserDropdownOpen, setIsUserDropdownOpen] = useState(false);
  const [isMegaMenuHovered, setIsMegaMenuHovered] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNavClick = (view: typeof currentView, categoryFilter?: string) => {
    if (categoryFilter) {
      setFilters((prev) => ({ ...prev, category: categoryFilter }));
    }
    setCurrentView(view);
    setIsMobileMenuOpen(false);
    setIsUserDropdownOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <header
      className={`sticky top-0 z-40 transition-all duration-300 ${
        isScrolled
          ? darkMode
            ? 'bg-neutral-950/85 backdrop-blur-md border-b border-neutral-800 shadow-xl'
            : 'bg-white/85 backdrop-blur-md border-b border-neutral-200/80 shadow-xs'
          : darkMode
          ? 'bg-neutral-950/90 border-b border-neutral-900'
          : 'bg-white border-b border-neutral-100'
      }`}
    >
      {/* Top Announcement Bar with Scroll Velocity */}
      <div
        className={`py-1.5 px-2 text-xs font-medium border-b overflow-hidden transition-colors ${
          darkMode
            ? 'bg-neutral-900 border-neutral-800 text-neutral-300'
            : 'bg-neutral-900 border-neutral-800 text-white'
        }`}
      >
        <ScrollVelocityContainer>
          <ScrollVelocityRow baseVelocity={1.5} direction={1}>
            <span className="inline-flex items-center gap-2 font-sans tracking-widest text-[11px] uppercase">
              <Sparkles className="w-3.5 h-3.5 text-teal-400 inline" />
              Complimentary Express Worldwide Shipping on Orders Over $300
              <span className="mx-2 text-teal-400">•</span>
              Use code <strong className="text-teal-300 font-bold underline">WELCOME15</strong> for 15% off
            </span>
          </ScrollVelocityRow>
        </ScrollVelocityContainer>
      </div>

      {/* Main Bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-18 flex items-center justify-between gap-4">
        {/* Left: Logo */}
        <div className="flex items-center gap-8">
          <button
            onClick={() => handleNavClick('home')}
            className="group flex items-center gap-2 text-left cursor-pointer focus:outline-none"
            id="brand-logo"
          >
            <div className="w-8 h-8 rounded-full bg-neutral-900 dark:bg-white flex items-center justify-center text-white dark:text-neutral-950 font-semibold tracking-tighter text-sm transition-transform group-hover:scale-105">
              A
            </div>
            <div className="flex flex-col">
              <span className="text-xl font-bold tracking-[0.25em] font-sans text-neutral-900 dark:text-white uppercase leading-none">
                AURA
              </span>
              <span className="text-[9px] tracking-[0.2em] text-neutral-500 uppercase font-mono mt-0.5">
                STUDIO • EDITIONS
              </span>
            </div>
          </button>

          {/* Desktop Nav Links */}
          <nav className="hidden md:flex items-center gap-7">
            {/* Shop + MegaMenu Trigger */}
            <div
              className="relative py-4"
              onMouseEnter={() => setIsMegaMenuHovered(true)}
              onMouseLeave={() => setIsMegaMenuHovered(false)}
            >
              <button
                onClick={() => handleNavClick('shop')}
                className={`flex items-center gap-1 text-sm tracking-wider font-medium transition-colors cursor-pointer ${
                  currentView === 'shop'
                    ? 'text-black dark:text-white font-semibold'
                    : 'text-neutral-600 dark:text-neutral-400 hover:text-black dark:hover:text-white'
                }`}
              >
                <span>Collections</span>
                <ChevronDown
                  className={`w-3.5 h-3.5 transition-transform duration-200 ${
                    isMegaMenuHovered ? 'rotate-180 text-black dark:text-white' : ''
                  }`}
                />
              </button>

              {/* Mega Menu Dropdown */}
              <MegaMenu
                isOpen={isMegaMenuHovered}
                onSelectCategory={(catName) => {
                  handleNavClick('shop', catName);
                  setIsMegaMenuHovered(false);
                }}
                darkMode={darkMode}
              />
            </div>

            <button
              onClick={() => handleNavClick('shop', 'Best Sellers')}
              className="text-sm tracking-wider font-medium text-neutral-600 dark:text-neutral-400 hover:text-black dark:hover:text-white transition-colors cursor-pointer"
            >
              Best Sellers
            </button>

            <button
              onClick={() => handleNavClick('about')}
              className={`text-sm tracking-wider font-medium transition-colors cursor-pointer ${
                currentView === 'about'
                  ? 'text-black dark:text-white font-semibold'
                  : 'text-neutral-600 dark:text-neutral-400 hover:text-black dark:hover:text-white'
              }`}
            >
              Philosophy
            </button>
          </nav>
        </div>

        {/* Right Actions */}
        <div className="flex items-center gap-3 sm:gap-4">
          {/* Search Trigger */}
          <button
            onClick={() => setIsSearchOpen(true)}
            className="p-2.5 rounded-full text-neutral-700 dark:text-neutral-300 hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-all flex items-center gap-2 cursor-pointer"
            title="Search products"
            id="nav-search-button"
          >
            <Search className="w-4 h-4" />
            <span className="hidden lg:inline text-xs font-mono text-neutral-400 bg-neutral-100 dark:bg-neutral-800 px-2 py-0.5 rounded-md border border-neutral-200 dark:border-neutral-700">
              ⌘K
            </span>
          </button>

          {/* Wishlist Icon */}
          <button
            onClick={() => handleNavClick('dashboard')}
            className="relative p-2.5 rounded-full text-neutral-700 dark:text-neutral-300 hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-all cursor-pointer"
            title="Wishlist"
            id="nav-wishlist-button"
          >
            <Heart className="w-4 h-4" />
            {wishlist.length > 0 && (
              <span className="absolute top-1.5 right-1.5 w-4 h-4 rounded-full bg-[#0F766E] text-white text-[10px] font-bold flex items-center justify-center">
                {wishlist.length}
              </span>
            )}
          </button>

          {/* Cart Icon */}
          <button
            onClick={() => setIsCartOpen(true)}
            className="relative p-2.5 rounded-full text-neutral-700 dark:text-neutral-300 hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-all cursor-pointer flex items-center gap-1.5"
            title="Shopping Cart"
            id="nav-cart-button"
          >
            <ShoppingBag className="w-4 h-4" />
            <span className="hidden sm:inline text-xs font-medium font-mono">
              Cart
            </span>
            {cartItemCount > 0 && (
              <span className="w-5 h-5 rounded-full bg-[#0F766E] text-white text-[11px] font-bold flex items-center justify-center ml-0.5 shadow-xs">
                {cartItemCount}
              </span>
            )}
          </button>

          {/* Dark Mode Toggle */}
          <button
            onClick={() => setDarkMode(!darkMode)}
            className="p-2.5 rounded-full text-neutral-700 dark:text-neutral-300 hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-all cursor-pointer"
            title={darkMode ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
            id="theme-toggle-button"
          >
            {darkMode ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
          </button>

          {/* User Profile Dropdown */}
          <div className="relative">
            <button
              onClick={() => setIsUserDropdownOpen(!isUserDropdownOpen)}
              className="p-1 rounded-full border border-neutral-200 dark:border-neutral-800 hover:border-neutral-400 transition-all cursor-pointer flex items-center gap-2"
              id="user-profile-button"
            >
              <img
                src={user.avatar}
                alt={user.name}
                className="w-7 h-7 rounded-full object-cover"
              />
            </button>

            {isUserDropdownOpen && (
              <div
                className={`absolute right-0 mt-3 w-56 rounded-2xl p-2 border shadow-2xl z-50 animate-in fade-in slide-in-from-top-2 ${
                  darkMode
                    ? 'bg-neutral-900 border-neutral-800 text-white'
                    : 'bg-white border-neutral-200 text-neutral-900'
                }`}
              >
                <div className="p-3 border-b border-neutral-100 dark:border-neutral-800">
                  <p className="text-sm font-semibold truncate">{user.name}</p>
                  <p className="text-xs text-neutral-500 truncate mt-0.5">{user.email}</p>
                </div>
                <div className="py-1">
                  <button
                    onClick={() => handleNavClick('dashboard')}
                    className="w-full flex items-center gap-2 px-3 py-2 text-xs font-medium rounded-xl hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors text-left"
                  >
                    <User className="w-3.5 h-3.5" />
                    <span>My Account</span>
                  </button>
                  <button
                    onClick={() => handleNavClick('dashboard')}
                    className="w-full flex items-center gap-2 px-3 py-2 text-xs font-medium rounded-xl hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors text-left"
                  >
                    <Package className="w-3.5 h-3.5" />
                    <span>Orders & Tracking ({user.orders.length})</span>
                  </button>
                  <button
                    onClick={() => handleNavClick('dashboard')}
                    className="w-full flex items-center gap-2 px-3 py-2 text-xs font-medium rounded-xl hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors text-left"
                  >
                    <Heart className="w-3.5 h-3.5" />
                    <span>Wishlist ({wishlist.length})</span>
                  </button>
                </div>
                <div className="pt-1 border-t border-neutral-100 dark:border-neutral-800">
                  <button
                    onClick={() => {
                      setIsUserDropdownOpen(false);
                      handleNavClick('home');
                    }}
                    className="w-full flex items-center gap-2 px-3 py-2 text-xs font-medium text-rose-600 dark:text-rose-400 rounded-xl hover:bg-rose-50 dark:hover:bg-rose-950/30 transition-colors text-left"
                  >
                    <LogOut className="w-3.5 h-3.5" />
                    <span>Sign Out</span>
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Mobile Menu Toggle Button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden p-2 rounded-xl text-neutral-800 dark:text-neutral-200 hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors"
            id="mobile-menu-toggle"
          >
            {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden border-t border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-950 px-6 py-6 space-y-4">
          <button
            onClick={() => handleNavClick('shop')}
            className="block w-full text-left py-2 text-base font-medium text-neutral-900 dark:text-white"
          >
            Collections & All Products
          </button>
          <button
            onClick={() => handleNavClick('shop', 'Best Sellers')}
            className="block w-full text-left py-2 text-base font-medium text-neutral-900 dark:text-white"
          >
            Best Sellers
          </button>
          <button
            onClick={() => handleNavClick('about')}
            className="block w-full text-left py-2 text-base font-medium text-neutral-900 dark:text-white"
          >
            Brand Philosophy
          </button>
          <button
            onClick={() => handleNavClick('dashboard')}
            className="block w-full text-left py-2 text-base font-medium text-emerald-700 dark:text-emerald-400"
          >
            My Dashboard & Orders
          </button>
        </div>
      )}
    </header>
  );
};
