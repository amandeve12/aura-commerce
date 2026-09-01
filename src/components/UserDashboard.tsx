import React, { useState } from 'react';
import {
  User,
  Package,
  Heart,
  MapPin,
  CreditCard,
  Bell,
  LogOut,
  ShoppingBag,
  ExternalLink,
  Plus,
  Trash2,
  CheckCircle2,
  Truck,
  Clock,
  ArrowRight,
} from 'lucide-react';
import { useShop } from '../context/ShopContext';

export const UserDashboard: React.FC = () => {
  const { user, wishlist, products, toggleWishlist, addToCart, navigateToProduct, setCurrentView } = useShop();

  const [activeTab, setActiveTab] = useState<'orders' | 'wishlist' | 'profile' | 'addresses'>('orders');

  const wishlistProducts = products.filter((p) => wishlist.includes(p.id));

  return (
    <div className="py-10 bg-white dark:bg-neutral-950 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        
        {/* Profile Banner */}
        <div className="p-6 sm:p-8 rounded-3xl bg-neutral-50 dark:bg-neutral-900/60 border border-neutral-200/80 dark:border-neutral-800 flex flex-col sm:flex-row items-center justify-between gap-6 text-left">
          <div className="flex items-center gap-4">
            <img
              src={user.avatar}
              alt={user.name}
              className="w-16 h-16 rounded-full object-cover border-2 border-neutral-900 dark:border-white shadow-md"
            />
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-xl sm:text-2xl font-bold text-neutral-900 dark:text-white font-sans">
                  {user.name}
                </h1>
                <span className="px-2.5 py-0.5 rounded-full bg-emerald-500/10 text-emerald-700 dark:text-emerald-400 text-[10px] font-mono font-bold uppercase">
                  VIP COLLECTOR
                </span>
              </div>
              <p className="text-xs text-neutral-500 font-mono mt-0.5">{user.email} • {user.phone}</p>
            </div>
          </div>

          <button
            onClick={() => setCurrentView('shop')}
            className="px-6 py-2.5 rounded-full bg-neutral-900 dark:bg-white text-white dark:text-neutral-900 text-xs font-bold uppercase tracking-wider hover:bg-black cursor-pointer"
          >
            Explore New Releases
          </button>
        </div>

        {/* Dashboard Tabs & Content */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Sidebar Nav (3 Cols) */}
          <div className="lg:col-span-3 p-3 rounded-2xl bg-neutral-50 dark:bg-neutral-900/50 border border-neutral-200/80 dark:border-neutral-800 space-y-1 text-left">
            <button
              onClick={() => setActiveTab('orders')}
              className={`w-full flex items-center justify-between p-3 rounded-xl text-xs font-bold font-mono transition-colors cursor-pointer ${
                activeTab === 'orders'
                  ? 'bg-neutral-900 text-white dark:bg-white dark:text-neutral-900 shadow-sm'
                  : 'text-neutral-600 dark:text-neutral-400 hover:bg-neutral-200/60 dark:hover:bg-neutral-800'
              }`}
            >
              <div className="flex items-center gap-2.5">
                <Package className="w-4 h-4" />
                <span>Orders & Tracking</span>
              </div>
              <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-neutral-200/50 dark:bg-neutral-800">
                {user.orders.length}
              </span>
            </button>

            <button
              onClick={() => setActiveTab('wishlist')}
              className={`w-full flex items-center justify-between p-3 rounded-xl text-xs font-bold font-mono transition-colors cursor-pointer ${
                activeTab === 'wishlist'
                  ? 'bg-neutral-900 text-white dark:bg-white dark:text-neutral-900 shadow-sm'
                  : 'text-neutral-600 dark:text-neutral-400 hover:bg-neutral-200/60 dark:hover:bg-neutral-800'
              }`}
            >
              <div className="flex items-center gap-2.5">
                <Heart className="w-4 h-4" />
                <span>Saved Wishlist</span>
              </div>
              <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-neutral-200/50 dark:bg-neutral-800">
                {wishlist.length}
              </span>
            </button>

            <button
              onClick={() => setActiveTab('addresses')}
              className={`w-full flex items-center gap-2.5 p-3 rounded-xl text-xs font-bold font-mono transition-colors cursor-pointer ${
                activeTab === 'addresses'
                  ? 'bg-neutral-900 text-white dark:bg-white dark:text-neutral-900 shadow-sm'
                  : 'text-neutral-600 dark:text-neutral-400 hover:bg-neutral-200/60 dark:hover:bg-neutral-800'
              }`}
            >
              <MapPin className="w-4 h-4" />
              <span>Saved Addresses</span>
            </button>

            <button
              onClick={() => setActiveTab('profile')}
              className={`w-full flex items-center gap-2.5 p-3 rounded-xl text-xs font-bold font-mono transition-colors cursor-pointer ${
                activeTab === 'profile'
                  ? 'bg-neutral-900 text-white dark:bg-white dark:text-neutral-900 shadow-sm'
                  : 'text-neutral-600 dark:text-neutral-400 hover:bg-neutral-200/60 dark:hover:bg-neutral-800'
              }`}
            >
              <User className="w-4 h-4" />
              <span>Profile Settings</span>
            </button>
          </div>

          {/* Main Content Pane (9 Cols) */}
          <div className="lg:col-span-9 space-y-6 text-left">
            
            {/* Orders Tab */}
            {activeTab === 'orders' && (
              <div className="space-y-4">
                <h3 className="text-lg font-bold text-neutral-900 dark:text-white font-sans">
                  Order History & Real-Time Tracking
                </h3>

                {user.orders.length === 0 ? (
                  <p className="text-xs text-neutral-500 py-8">No order history available yet.</p>
                ) : (
                  user.orders.map((order) => (
                    <div
                      key={order.id}
                      className="p-6 rounded-3xl bg-neutral-50 dark:bg-neutral-900/60 border border-neutral-200/80 dark:border-neutral-800 space-y-4 shadow-sm"
                    >
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 border-b border-neutral-200 dark:border-neutral-800 text-xs font-mono">
                        <div>
                          <span className="text-neutral-400">ORDER NO:</span>{' '}
                          <span className="font-bold text-neutral-900 dark:text-white">{order.id}</span>
                          <span className="mx-2 text-neutral-300">•</span>
                          <span className="text-neutral-500">{order.date}</span>
                        </div>

                        <div className="flex items-center gap-2">
                          <span
                            className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase ${
                              order.status === 'Delivered'
                                ? 'bg-emerald-500/10 text-emerald-700 dark:text-emerald-400'
                                : 'bg-amber-500/10 text-amber-600 dark:text-amber-400'
                            }`}
                          >
                            {order.status === 'In Transit' ? '🚚 In Transit' : '✓ Delivered'}
                          </span>
                        </div>
                      </div>

                      <div className="space-y-3">
                        {order.items.map((item) => (
                          <div key={item.id} className="flex items-center justify-between gap-4 text-xs">
                            <div className="flex items-center gap-3">
                              <img
                                src={item.product.images[0]}
                                alt={item.product.name}
                                className="w-12 h-12 rounded-xl object-cover bg-white dark:bg-neutral-800"
                              />
                              <div>
                                <h4 className="font-bold text-neutral-900 dark:text-white">
                                  {item.product.name}
                                </h4>
                                <p className="text-[11px] text-neutral-500">
                                  {item.selectedColor.name} • Qty {item.quantity}
                                </p>
                              </div>
                            </div>

                            <button
                              onClick={() => navigateToProduct(item.product.id)}
                              className="text-xs font-semibold text-emerald-700 dark:text-emerald-400 hover:underline cursor-pointer"
                            >
                              View Product
                            </button>
                          </div>
                        ))}
                      </div>

                      <div className="pt-3 border-t border-neutral-200 dark:border-neutral-800 flex items-center justify-between text-xs font-mono">
                        <span className="text-neutral-500">
                          Tracking: <strong className="text-neutral-900 dark:text-white">{order.trackingNumber}</strong>
                        </span>
                        <span className="font-bold text-neutral-900 dark:text-white text-sm">
                          Total: ${order.total.toFixed(2)}
                        </span>
                      </div>
                    </div>
                  ))
                )}
              </div>
            )}

            {/* Wishlist Tab */}
            {activeTab === 'wishlist' && (
              <div className="space-y-4">
                <h3 className="text-lg font-bold text-neutral-900 dark:text-white font-sans">
                  Saved Wishlist ({wishlistProducts.length})
                </h3>

                {wishlistProducts.length === 0 ? (
                  <div className="py-12 text-center space-y-2">
                    <p className="text-xs text-neutral-500">Your wishlist is currently empty.</p>
                    <button
                      onClick={() => setCurrentView('shop')}
                      className="px-6 py-2.5 rounded-full bg-neutral-900 dark:bg-white text-white dark:text-neutral-900 text-xs font-bold uppercase cursor-pointer"
                    >
                      Browse Catalog
                    </button>
                  </div>
                ) : (
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {wishlistProducts.map((p) => (
                      <div
                        key={p.id}
                        className="p-4 rounded-2xl bg-neutral-50 dark:bg-neutral-900/60 border border-neutral-200/80 dark:border-neutral-800 space-y-3"
                      >
                        <div
                          onClick={() => navigateToProduct(p.id)}
                          className="aspect-square rounded-xl overflow-hidden bg-white dark:bg-neutral-800 cursor-pointer"
                        >
                          <img src={p.images[0]} alt={p.name} className="w-full h-full object-cover" />
                        </div>

                        <div>
                          <h4 className="text-xs font-bold text-neutral-900 dark:text-white truncate">
                            {p.name}
                          </h4>
                          <p className="text-xs font-mono text-neutral-500">${p.price}</p>
                        </div>

                        <div className="flex gap-2">
                          <button
                            onClick={() => addToCart(p, p.colors[0], p.sizes[0] || 'Standard Fit', 1)}
                            className="flex-1 py-2 rounded-xl bg-neutral-900 dark:bg-white text-white dark:text-neutral-900 text-[11px] font-bold uppercase cursor-pointer"
                          >
                            Move to Bag
                          </button>
                          <button
                            onClick={() => toggleWishlist(p.id)}
                            className="p-2 rounded-xl border border-neutral-300 dark:border-neutral-700 text-rose-500 hover:bg-rose-50 cursor-pointer"
                            title="Remove"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}

            {/* Saved Addresses Tab */}
            {activeTab === 'addresses' && (
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-bold text-neutral-900 dark:text-white font-sans">
                    Saved Addresses
                  </h3>
                  <button className="px-4 py-2 rounded-xl bg-neutral-900 dark:bg-white text-white dark:text-neutral-900 text-xs font-bold uppercase flex items-center gap-1.5 cursor-pointer">
                    <Plus className="w-3.5 h-3.5" />
                    <span>Add Address</span>
                  </button>
                </div>

                {user.addresses.map((addr, i) => (
                  <div
                    key={i}
                    className="p-5 rounded-2xl bg-neutral-50 dark:bg-neutral-900/60 border border-neutral-200/80 dark:border-neutral-800 space-y-1 text-xs font-mono"
                  >
                    <div className="flex justify-between items-center mb-2">
                      <span className="font-bold text-neutral-900 dark:text-white text-sm">{addr.fullName}</span>
                      <span className="px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-700 dark:text-emerald-400 text-[10px] font-bold">DEFAULT</span>
                    </div>
                    <p className="text-neutral-600 dark:text-neutral-400">{addr.street}</p>
                    <p className="text-neutral-600 dark:text-neutral-400">{addr.city}, {addr.state} {addr.zipCode}</p>
                    <p className="text-neutral-500">{addr.country} • {addr.phone}</p>
                  </div>
                ))}
              </div>
            )}

            {/* Profile Tab */}
            {activeTab === 'profile' && (
              <div className="p-6 rounded-3xl bg-neutral-50 dark:bg-neutral-900/60 border border-neutral-200/80 dark:border-neutral-800 space-y-4">
                <h3 className="text-base font-bold text-neutral-900 dark:text-white font-sans">
                  Personal Information
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                  <div>
                    <label className="block font-mono font-bold text-neutral-400 uppercase mb-1">NAME</label>
                    <input
                      type="text"
                      disabled
                      value={user.name}
                      className="w-full px-4 py-2.5 rounded-xl bg-white dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 text-neutral-900 dark:text-white"
                    />
                  </div>
                  <div>
                    <label className="block font-mono font-bold text-neutral-400 uppercase mb-1">EMAIL</label>
                    <input
                      type="email"
                      disabled
                      value={user.email}
                      className="w-full px-4 py-2.5 rounded-xl bg-white dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 text-neutral-900 dark:text-white"
                    />
                  </div>
                </div>
              </div>
            )}

          </div>
        </div>

      </div>
    </div>
  );
};
