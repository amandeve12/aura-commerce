import React, { useState, useEffect } from 'react';
import { ShopProvider, useShop } from './context/ShopContext';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { CategoryGrid } from './components/CategoryGrid';
import { FeaturedProducts } from './components/FeaturedProducts';
import { BestSellers } from './components/BestSellers';
import { PromotionalBanner } from './components/PromotionalBanner';
import { WhyChooseUs } from './components/WhyChooseUs';
import { Testimonials } from './components/Testimonials';
import { Newsletter } from './components/Newsletter';
import { Footer } from './components/Footer';

import { ShopPage } from './components/ShopPage';
import { ProductDetailPage } from './components/ProductDetailPage';
import { CheckoutPage } from './components/CheckoutPage';
import { UserDashboard } from './components/UserDashboard';
import { AboutPage } from './components/AboutPage';

import { SearchModal } from './components/SearchModal';
import { QuickViewModal } from './components/QuickViewModal';
import { CartDrawer } from './components/CartDrawer';

function AppContent() {
  const { currentView } = useShop();

  const [darkMode, setDarkMode] = useState<boolean>(() => {
    try {
      const saved = localStorage.getItem('aura_theme');
      return saved === 'dark';
    } catch {
      return false;
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem('aura_theme', darkMode ? 'dark' : 'light');
    } catch {
      // ignore
    }
  }, [darkMode]);

  return (
    <div className={darkMode ? 'dark bg-neutral-950 text-white min-h-screen font-sans selection:bg-emerald-500 selection:text-white' : 'light bg-white text-neutral-900 min-h-screen font-sans selection:bg-emerald-800 selection:text-white'}>
      <div className="min-h-screen flex flex-col justify-between antialiased">
        
        {/* Sticky Header Navigation */}
        <Navbar darkMode={darkMode} setDarkMode={setDarkMode} />

        {/* Dynamic View Router */}
        <main className="flex-1">
          {currentView === 'home' && (
            <div className="animate-in fade-in duration-300">
              <Hero />
              <CategoryGrid />
              <FeaturedProducts />
              <BestSellers />
              <PromotionalBanner />
              <WhyChooseUs />
              <Testimonials />
              <Newsletter />
            </div>
          )}

          {currentView === 'shop' && (
            <div className="animate-in fade-in duration-300">
              <ShopPage />
            </div>
          )}

          {currentView === 'product-detail' && (
            <div className="animate-in fade-in duration-300">
              <ProductDetailPage />
            </div>
          )}

          {currentView === 'checkout' && (
            <div className="animate-in fade-in duration-300">
              <CheckoutPage />
            </div>
          )}

          {currentView === 'dashboard' && (
            <div className="animate-in fade-in duration-300">
              <UserDashboard />
            </div>
          )}

          {currentView === 'about' && (
            <div className="animate-in fade-in duration-300">
              <AboutPage />
            </div>
          )}
        </main>

        {/* Global Overlays & Modals */}
        <SearchModal />
        <QuickViewModal />
        <CartDrawer />

        {/* Global Footer */}
        <Footer />

      </div>
    </div>
  );
}

export default function App() {
  return (
    <ShopProvider>
      <AppContent />
    </ShopProvider>
  );
}
