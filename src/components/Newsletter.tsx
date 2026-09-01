import React, { useState } from 'react';
import { Mail, Check, Sparkles, ArrowRight } from 'lucide-react';
import { ShimmerButton } from './magicui/ShimmerButton';
import { AnimatedShinyText } from './magicui/AnimatedShinyText';
import { BorderBeam } from './magicui/BorderBeam';

export const Newsletter: React.FC = () => {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email.trim()) {
      setSubscribed(true);
    }
  };

  return (
    <section className="py-16 sm:py-24 bg-white dark:bg-neutral-950 border-t border-neutral-100 dark:border-neutral-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative rounded-3xl bg-neutral-900 text-white p-8 sm:p-14 overflow-hidden shadow-2xl border border-neutral-800">
          <BorderBeam size={220} duration={12} colorFrom="#0F766E" colorTo="#5eead4" />

          {/* Subtle Ambient Background Light */}
          <div className="absolute -top-24 -right-24 w-96 h-96 bg-emerald-500/20 rounded-full blur-3xl pointer-events-none" />

          <div className="relative z-10 max-w-xl mx-auto text-center space-y-5">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/10 border border-white/20 text-[11px] font-semibold tracking-[0.2em] text-teal-300 uppercase">
              <Sparkles className="w-3.5 h-3.5 text-amber-300" />
              <AnimatedShinyText variant="teal">
                THE MONOGRAPH JOURNAL
              </AnimatedShinyText>
            </div>

            <h2 className="text-2xl sm:text-4xl font-light tracking-tight text-white font-sans">
              Join the <span className="font-medium text-teal-300">Inner Circle</span>
            </h2>

            <p className="text-neutral-300 text-sm sm:text-base leading-relaxed font-light">
              Receive private invitations to confidential product drops, material stories, and <strong>15% off</strong> your inaugural order.
            </p>

            {subscribed ? (
              <div className="p-6 rounded-2xl bg-teal-950/80 border border-[#0F766E]/60 text-teal-200 animate-in zoom-in-95 duration-200">
                <div className="flex items-center justify-center gap-2 text-teal-300 font-bold mb-1">
                  <Check className="w-5 h-5" />
                  <span>Subscription Confirmed</span>
                </div>
                <p className="text-xs text-teal-200">
                  Your 15% discount code is <strong>WELCOME15</strong>. It has been applied to your session!
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="pt-2 flex flex-col sm:flex-row items-center gap-3">
                <div className="relative w-full">
                  <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-400" />
                  <input
                    type="email"
                    required
                    placeholder="Enter your email address..."
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full pl-11 pr-4 py-3.5 rounded-full bg-white/10 border border-white/20 text-white placeholder-neutral-400 text-xs focus:outline-none focus:border-white transition-all"
                  />
                </div>
                <ShimmerButton
                  type="submit"
                  background="bg-white text-[#111111]"
                  className="w-full sm:w-auto px-8 py-3.5 font-semibold text-xs tracking-widest uppercase transition-all shadow-md flex-shrink-0 cursor-pointer"
                >
                  <span>Subscribe</span>
                  <ArrowRight className="w-4 h-4" />
                </ShimmerButton>
              </form>
            )}

            <p className="text-[11px] text-neutral-500 font-mono">
              Unsubscribe anytime with one click. Zero spam policy.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

