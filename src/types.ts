export interface ProductColor {
  name: string;
  hex: string;
  image?: string;
}

export interface Specification {
  label: string;
  value: string;
}

export interface Review {
  id: string;
  author: string;
  rating: number;
  date: string;
  title: string;
  comment: string;
  avatar?: string;
  verified: boolean;
}

export interface Product {
  id: string;
  name: string;
  subtitle: string;
  price: number;
  originalPrice?: number;
  rating: number;
  reviewCount: number;
  category: string;
  brand: string;
  isNew?: boolean;
  isBestSeller?: boolean;
  discountPercentage?: number;
  description: string;
  specifications: Specification[];
  colors: ProductColor[];
  sizes: string[];
  images: string[];
  stock: number;
  tags: string[];
  reviews: Review[];
}

export interface Category {
  id: string;
  name: string;
  description: string;
  image: string;
  itemCount: number;
  slug: string;
}

export interface CartItem {
  id: string; // unique ID combining product.id + color + size
  product: Product;
  selectedColor: ProductColor;
  selectedSize: string;
  quantity: number;
}

export interface ShippingAddress {
  fullName: string;
  street: string;
  city: string;
  state: string;
  zipCode: string;
  country: string;
  phone: string;
}

export interface PaymentMethod {
  id: string;
  type: 'card' | 'applepay' | 'klarna';
  last4?: string;
  brand?: string;
  expiry?: string;
  isDefault?: boolean;
}

export interface Order {
  id: string;
  date: string;
  total: number;
  status: 'Processing' | 'In Transit' | 'Delivered' | 'Cancelled';
  items: CartItem[];
  shippingAddress: ShippingAddress;
  paymentMethod: string;
  trackingNumber: string;
  estimatedDelivery: string;
}

export interface UserProfile {
  name: string;
  email: string;
  avatar: string;
  phone: string;
  addresses: ShippingAddress[];
  orders: Order[];
  savedWishlist: string[];
}

export interface FilterState {
  searchQuery: string;
  category: string;
  brand: string;
  minPrice: number;
  maxPrice: number;
  rating: number;
  sortBy: 'featured' | 'price-asc' | 'price-desc' | 'rating' | 'newest';
  inStockOnly: boolean;
}

export type ViewType = 'home' | 'shop' | 'product-detail' | 'checkout' | 'dashboard' | 'about';
