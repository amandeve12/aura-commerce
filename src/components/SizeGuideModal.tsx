import React from 'react';
import { X, Ruler } from 'lucide-react';

interface SizeGuideModalProps {
  isOpen: boolean;
  onClose: () => void;
  category: string;
}

export const SizeGuideModal: React.FC<SizeGuideModalProps> = ({ isOpen, onClose, category }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-md animate-in fade-in duration-200">
      <div
        className="w-full max-w-lg bg-white dark:bg-neutral-900 rounded-3xl p-6 sm:p-8 border border-neutral-200 dark:border-neutral-800 shadow-2xl relative"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 rounded-full hover:bg-neutral-100 dark:hover:bg-neutral-800 text-neutral-500 cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="flex items-center gap-2 text-xs font-mono text-emerald-700 dark:text-emerald-400 font-bold uppercase mb-2">
          <Ruler className="w-4 h-4" />
          <span>Sizing & Measurement Guide</span>
        </div>

        <h3 className="text-xl font-bold text-neutral-900 dark:text-white mb-4">
          {category} Sizing Specifications
        </h3>

        <div className="overflow-x-auto text-xs font-mono">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-neutral-200 dark:border-neutral-800 text-neutral-400">
                <th className="py-2.5 px-3">Size</th>
                <th className="py-2.5 px-3">Chest (in)</th>
                <th className="py-2.5 px-3">Length (in)</th>
                <th className="py-2.5 px-3">Shoulder (in)</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-neutral-100 dark:divide-neutral-800/60 text-neutral-700 dark:text-neutral-300">
              <tr>
                <td className="py-2.5 px-3 font-bold">Small (S)</td>
                <td className="py-2.5 px-3">38 - 40"</td>
                <td className="py-2.5 px-3">27.5"</td>
                <td className="py-2.5 px-3">18.0"</td>
              </tr>
              <tr>
                <td className="py-2.5 px-3 font-bold">Medium (M)</td>
                <td className="py-2.5 px-3">40 - 42"</td>
                <td className="py-2.5 px-3">28.5"</td>
                <td className="py-2.5 px-3">18.8"</td>
              </tr>
              <tr>
                <td className="py-2.5 px-3 font-bold">Large (L)</td>
                <td className="py-2.5 px-3">42 - 44"</td>
                <td className="py-2.5 px-3">29.5"</td>
                <td className="py-2.5 px-3">19.5"</td>
              </tr>
              <tr>
                <td className="py-2.5 px-3 font-bold">X-Large (XL)</td>
                <td className="py-2.5 px-3">44 - 46"</td>
                <td className="py-2.5 px-3">30.5"</td>
                <td className="py-2.5 px-3">20.2"</td>
              </tr>
            </tbody>
          </table>
        </div>

        <p className="text-xs text-neutral-500 mt-6 leading-relaxed">
          * AURA apparel is cut with a relaxed, architectural silhouette. For a closer fit, we recommend sizing down.
        </p>
      </div>
    </div>
  );
};
