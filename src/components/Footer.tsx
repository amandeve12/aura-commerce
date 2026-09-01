import React from 'react';
import { Globe, ArrowUpRight, Instagram, Twitter, Youtube, Linkedin } from 'lucide-react';
import { useShop } from '../context/ShopContext';

export const Footer: React.FC = () => {
  const { setCurrentView, setFilters } = useShop();

  const handleFooterNav = (category?: string) => {
    if (category) {
      setFilters((prev) => ({ ...prev, category }));
    }
    setCurrentView('shop');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-neutral-950 text-white pt-16 pb-12 border-t border-neutral-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 pb-12 border-b border-neutral-800">
          
          {/* Brand Info */}
          <div className="lg:col-span-2 space-y-4 pr-6">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-full bg-white text-neutral-950 font-bold flex items-center justify-center text-sm font-sans">
                A
              </div>
              <span className="text-xl font-bold tracking-[0.25em] font-sans text-white uppercase">
                AURA
              </span>
            </div>
            <p className="text-xs text-neutral-400 max-w-sm leading-relaxed font-normal">
              A minimalist design atelier crafting timeless acoustic objects, matte titanium timepieces, and organic textiles. Made for living with intention.
            </p>
            <div className="pt-2 flex items-center gap-3 text-neutral-400">
              <a href="#instagram" className="p-2 rounded-full bg-neutral-900 hover:bg-neutral-800 hover:text-white transition-colors" title="Instagram">
                <Instagram className="w-4 h-4" />
              </a>
              <a href="#twitter" className="p-2 rounded-full bg-neutral-900 hover:bg-neutral-800 hover:text-white transition-colors" title="Twitter">
                <Twitter className="w-4 h-4" />
              </a>
              <a href="#youtube" className="p-2 rounded-full bg-neutral-900 hover:bg-neutral-800 hover:text-white transition-colors" title="YouTube">
                <Youtube className="w-4 h-4" />
              </a>
              <a href="#linkedin" className="p-2 rounded-full bg-neutral-900 hover:bg-neutral-800 hover:text-white transition-colors" title="LinkedIn">
                <Linkedin className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Shop Column */}
          <div>
            <h4 className="text-[11px] font-semibold tracking-[0.2em] text-[#0F766E] dark:text-teal-400 uppercase mb-4">
              Collections
            </h4>
            <ul className="space-y-2.5 text-xs text-neutral-300">
              <li>
                <button onClick={() => handleFooterNav('Audio & Objects')} className="hover:text-teal-300 transition-colors cursor-pointer">
                  Audio & Acoustic Objects
                </button>
              </li>
              <li>
                <button onClick={() => handleFooterNav('Timepieces')} className="hover:text-teal-300 transition-colors cursor-pointer">
                  Matte Titanium Timepieces
                </button>
              </li>
              <li>
                <button onClick={() => handleFooterNav('Apparel & Studio')} className="hover:text-teal-300 transition-colors cursor-pointer">
                  Apparel & Studio Textiles
                </button>
              </li>
              <li>
                <button onClick={() => handleFooterNav('Leather Goods')} className="hover:text-teal-300 transition-colors cursor-pointer">
                  Tuscan Leather Goods
                </button>
              </li>
              <li>
                <button onClick={() => handleFooterNav('Home & Fragrance')} className="hover:text-teal-300 transition-colors cursor-pointer">
                  Home Fragrance & Vessels
                </button>
              </li>
            </ul>
          </div>

          {/* Studio & Company */}
          <div>
            <h4 className="text-[11px] font-semibold tracking-[0.2em] text-[#0F766E] dark:text-teal-400 uppercase mb-4">
              Atelier
            </h4>
            <ul className="space-y-2.5 text-xs text-neutral-300">
              <li>
                <button onClick={() => { setCurrentView('about'); window.scrollTo({ top: 0, behavior: 'smooth' }); }} className="hover:text-teal-300 transition-colors cursor-pointer">
                  Brand Philosophy
                </button>
              </li>
              <li>
                <a href="#sustainability" className="hover:text-teal-300 transition-colors">
                  Material Traceability
                </a>
              </li>
              <li>
                <a href="#flagship" className="hover:text-teal-300 transition-colors">
                  Kyoto & SF Flagships
                </a>
              </li>
              <li>
                <a href="#careers" className="hover:text-teal-300 transition-colors">
                  Careers & Studio
                </a>
              </li>
              <li>
                <a href="#press" className="hover:text-teal-300 transition-colors">
                  Press Monograph
                </a>
              </li>
            </ul>
          </div>

          {/* Customer Care */}
          <div>
            <h4 className="text-[11px] font-semibold tracking-[0.2em] text-[#0F766E] dark:text-teal-400 uppercase mb-4">
              Client Care
            </h4>
            <ul className="space-y-2.5 text-xs text-neutral-300">
              <li>
                <button onClick={() => { setCurrentView('dashboard'); window.scrollTo({ top: 0, behavior: 'smooth' }); }} className="hover:text-teal-300 transition-colors cursor-pointer">
                  Order Tracking & History
                </button>
              </li>
              <li>
                <a href="#shipping" className="hover:text-teal-300 transition-colors">
                  Shipping & Customs
                </a>
              </li>
              <li>
                <a href="#warranty" className="hover:text-teal-300 transition-colors">
                  2-Year Studio Warranty
                </a>
              </li>
              <li>
                <a href="#returns" className="hover:text-teal-300 transition-colors">
                  Returns Portal
                </a>
              </li>
              <li>
                <a href="#contact" className="hover:text-teal-300 transition-colors">
                  Concierge Support
                </a>
              </li>
            </ul>
          </div>

        </div>

        {/* Bottom Bar: Payment methods & Copyright */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-neutral-500 font-mono">
          <div className="flex items-center gap-2">
            <Globe className="w-3.5 h-3.5" />
            <span>United States ($ USD)</span>
            <span>•</span>
            <span>English</span>
          </div>

          {/* Payment Badges */}
          <div className="flex items-center gap-2 text-[10px] uppercase tracking-wider text-neutral-400 font-bold">
            <span className="px-2 py-1 rounded bg-neutral-900 border border-neutral-800">Apple Pay</span>
            <span className="px-2 py-1 rounded bg-neutral-900 border border-neutral-800">Visa</span>
            <span className="px-2 py-1 rounded bg-neutral-900 border border-neutral-800">Mastercard</span>
            <span className="px-2 py-1 rounded bg-neutral-900 border border-neutral-800">Amex</span>
            <span className="px-2 py-1 rounded bg-neutral-900 border border-neutral-800">Klarna</span>
          </div>

          <p>© 2026 AURA Design Studio Inc. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};
