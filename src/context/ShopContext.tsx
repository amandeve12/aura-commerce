import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import {
  Product,
  Category,
  CartItem,
  FilterState,
  ViewType,
  UserProfile,
  Order,
  ProductColor,
  ShippingAddress,
} from '../types';
import { PRODUCTS, CATEGORIES, INITIAL_USER } from '../data/products';

interface ShopContextType {
  products: Product[];
  categories: Category[];
  cart: CartItem[];
  wishlist: string[];
  currentView: ViewType;
  selectedProductId: string | null;
  quickViewProduct: Product | null;
  isCartOpen: boolean;
  isSearchOpen: boolean;
  isMobileFilterOpen: boolean;
  user: UserProfile;
  filters: FilterState;
  appliedCoupon: { code: string; discountPercent: number } | null;
  
  // Actions
  setCurrentView: (view: ViewType) => void;
  navigateToProduct: (productId: string) => void;
  openQuickView: (product: Product) => void;
  closeQuickView: () => void;
  setIsCartOpen: (isOpen: boolean) => void;
  setIsSearchOpen: (isOpen: boolean) => void;
  setIsMobileFilterOpen: (isOpen: boolean) => void;
  
  addToCart: (product: Product, color?: ProductColor, size?: string, quantity?: number) => void;
  removeFromCart: (cartItemId: string) => void;
  updateCartQuantity: (cartItemId: string, delta: number) => void;
  clearCart: () => void;
  applyCoupon: (code: string) => boolean;
  
  toggleWishlist: (productId: string) => void;
  isInWishlist: (productId: string) => boolean;
  
  setFilters: React.Dispatch<React.SetStateAction<FilterState>>;
  resetFilters: () => void;
  
  placeOrder: (shipping: ShippingAddress, paymentMethod: string) => Order;
  addReviewToProduct: (productId: string, rating: number, title: string, comment: string) => void;
  
  // Computed values
  cartSubtotal: number;
  discountAmount: number;
  cartTotal: number;
  cartItemCount: number;
  freeShippingThreshold: number;
  freeShippingProgress: number;
}

const initialFilters: FilterState = {
  searchQuery: '',
  category: 'All',
  brand: 'All',
  minPrice: 0,
  maxPrice: 2000,
  rating: 0,
  sortBy: 'featured',
  inStockOnly: false,
};

const ShopContext = createContext<ShopContextType | undefined>(undefined);

export const ShopProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [products, setProducts] = useState<Product[]>(PRODUCTS);
  const [categories] = useState<Category[]>(CATEGORIES);
  const [cart, setCart] = useState<CartItem[]>(() => {
    try {
      const saved = localStorage.getItem('aura_cart');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });
  const [wishlist, setWishlist] = useState<string[]>(() => {
    try {
      const saved = localStorage.getItem('aura_wishlist');
      return saved ? JSON.parse(saved) : INITIAL_USER.savedWishlist;
    } catch {
      return INITIAL_USER.savedWishlist;
    }
  });
  const [currentView, setCurrentView] = useState<ViewType>('home');
  const [selectedProductId, setSelectedProductId] = useState<string | null>('aura-01');
  const [quickViewProduct, setQuickViewProduct] = useState<Product | null>(null);
  
  const [isCartOpen, setIsCartOpen] = useState<boolean>(false);
  const [isSearchOpen, setIsSearchOpen] = useState<boolean>(false);
  const [isMobileFilterOpen, setIsMobileFilterOpen] = useState<boolean>(false);
  
  const [user, setUser] = useState<UserProfile>(INITIAL_USER);
  const [filters, setFilters] = useState<FilterState>(initialFilters);
  const [appliedCoupon, setAppliedCoupon] = useState<{ code: string; discountPercent: number } | null>(null);

  // Sync state to localStorage
  useEffect(() => {
    try {
      localStorage.setItem('aura_cart', JSON.stringify(cart));
    } catch {
      // ignore
    }
  }, [cart]);

  useEffect(() => {
    try {
      localStorage.setItem('aura_wishlist', JSON.stringify(wishlist));
    } catch {
      // ignore
    }
  }, [wishlist]);

  // View navigation helper
  const navigateToProduct = (productId: string) => {
    setSelectedProductId(productId);
    setCurrentView('product-detail');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const openQuickView = (product: Product) => {
    setQuickViewProduct(product);
  };

  const closeQuickView = () => {
    setQuickViewProduct(null);
  };

  // Cart Management
  const addToCart = (product: Product, color?: ProductColor, size?: string, quantity: number = 1) => {
    const selectedColor = color || product.colors[0];
    const selectedSize = size || product.sizes[0] || 'Standard';
    const cartItemId = `${product.id}-${selectedColor.name}-${selectedSize}`;

    setCart((prev) => {
      const existingIndex = prev.findIndex((item) => item.id === cartItemId);
      if (existingIndex > -1) {
        const updated = [...prev];
        updated[existingIndex].quantity += quantity;
        return updated;
      }
      return [
        ...prev,
        {
          id: cartItemId,
          product,
          selectedColor,
          selectedSize,
          quantity,
        },
      ];
    });

    setIsCartOpen(true);
  };

  const removeFromCart = (cartItemId: string) => {
    setCart((prev) => prev.filter((item) => item.id !== cartItemId));
  };

  const updateCartQuantity = (cartItemId: string, delta: number) => {
    setCart((prev) =>
      prev
        .map((item) => {
          if (item.id === cartItemId) {
            const newQty = item.quantity + delta;
            return newQty > 0 ? { ...item, quantity: newQty } : null;
          }
          return item;
        })
        .filter((item): item is CartItem => item !== null)
    );
  };

  const clearCart = () => {
    setCart([]);
    setAppliedCoupon(null);
  };

  const applyCoupon = (code: string): boolean => {
    const clean = code.trim().toUpperCase();
    if (clean === 'WELCOME15' || clean === 'AURA15') {
      setAppliedCoupon({ code: clean, discountPercent: 15 });
      return true;
    } else if (clean === 'LUXURY20' || clean === 'AURA20') {
      setAppliedCoupon({ code: clean, discountPercent: 20 });
      return true;
    }
    return false;
  };

  // Wishlist Management
  const toggleWishlist = (productId: string) => {
    setWishlist((prev) =>
      prev.includes(productId) ? prev.filter((id) => id !== productId) : [...prev, productId]
    );
  };

  const isInWishlist = (productId: string) => wishlist.includes(productId);

  // Filter Reset
  const resetFilters = () => setFilters(initialFilters);

  // Computations
  const cartSubtotal = cart.reduce((sum, item) => sum + item.product.price * item.quantity, 0);
  const discountAmount = appliedCoupon ? (cartSubtotal * appliedCoupon.discountPercent) / 100 : 0;
  const cartTotal = Math.max(0, cartSubtotal - discountAmount);
  const cartItemCount = cart.reduce((count, item) => count + item.quantity, 0);
  const freeShippingThreshold = 300;
  const freeShippingProgress = Math.min(100, (cartSubtotal / freeShippingThreshold) * 100);

  // Order Placement
  const placeOrder = (shipping: ShippingAddress, paymentMethod: string): Order => {
    const newOrder: Order = {
      id: `AURA-${Math.floor(10000 + Math.random() * 90000)}`,
      date: new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' }),
      total: cartTotal,
      status: 'Processing',
      items: [...cart],
      shippingAddress: shipping,
      paymentMethod,
      trackingNumber: `1Z${Math.floor(1000000000000000 + Math.random() * 9000000000000000)}`,
      estimatedDelivery: '3 - 5 Business Days',
    };

    setUser((prev) => ({
      ...prev,
      orders: [newOrder, ...prev.orders],
    }));

    clearCart();
    return newOrder;
  };

  const addReviewToProduct = (productId: string, rating: number, title: string, comment: string) => {
    setProducts((prev) =>
      prev.map((p) => {
        if (p.id === productId) {
          const newReview = {
            id: `rev-${Date.now()}`,
            author: user.name,
            rating,
            date: 'Just now',
            title,
            comment,
            avatar: user.avatar,
            verified: true,
          };
          const updatedReviews = [newReview, ...p.reviews];
          const newAvgRating = parseFloat(
            (updatedReviews.reduce((sum, r) => sum + r.rating, 0) / updatedReviews.length).toFixed(1)
          );
          return {
            ...p,
            reviews: updatedReviews,
            rating: newAvgRating,
            reviewCount: p.reviewCount + 1,
          };
        }
        return p;
      })
    );
  };

  return (
    <ShopContext.Provider
      value={{
        products,
        categories,
        cart,
        wishlist,
        currentView,
        selectedProductId,
        quickViewProduct,
        isCartOpen,
        isSearchOpen,
        isMobileFilterOpen,
        user,
        filters,
        appliedCoupon,
        setCurrentView,
        navigateToProduct,
        openQuickView,
        closeQuickView,
        setIsCartOpen,
        setIsSearchOpen,
        setIsMobileFilterOpen,
        addToCart,
        removeFromCart,
        updateCartQuantity,
        clearCart,
        applyCoupon,
        toggleWishlist,
        isInWishlist,
        setFilters,
        resetFilters,
        placeOrder,
        addReviewToProduct,
        cartSubtotal,
        discountAmount,
        cartTotal,
        cartItemCount,
        freeShippingThreshold,
        freeShippingProgress,
      }}
    >
      {children}
    </ShopContext.Provider>
  );
};

export const useShop = () => {
  const context = useContext(ShopContext);
  if (!context) {
    throw new Error('useShop must be used within a ShopProvider');
  }
  return context;
};
