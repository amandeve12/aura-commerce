import React, { useState } from 'react';
import {
  ShieldCheck,
  CheckCircle2,
  Lock,
  ArrowRight,
  Truck,
  CreditCard,
  ShoppingBag,
  ArrowLeft,
  Check,
  PackageCheck,
} from 'lucide-react';
import { useShop } from '../context/ShopContext';
import { ShippingAddress, Order } from '../types';

export const CheckoutPage: React.FC = () => {
  const {
    cart,
    cartSubtotal,
    discountAmount,
    cartTotal,
    user,
    placeOrder,
    setCurrentView,
    freeShippingThreshold,
  } = useShop();

  const [step, setStep] = useState<'shipping' | 'delivery' | 'payment' | 'review' | 'success'>('shipping');

  const [shippingAddress, setShippingAddress] = useState<ShippingAddress>(
    user.addresses[0] || {
      fullName: 'Adrian Vance',
      street: '742 Minimalist Way, Suite 4B',
      city: 'San Francisco',
      state: 'CA',
      zipCode: '94107',
      country: 'United States',
      phone: '+1 (555) 234-8901',
    }
  );

  const [deliveryMethod, setDeliveryMethod] = useState<'express' | 'overnight'>('express');
  const [paymentType, setPaymentType] = useState<'card' | 'applepay' | 'klarna'>('applepay');

  const [cardNumber, setCardNumber] = useState('•••• •••• •••• 4092');
  const [cardExpiry, setCardExpiry] = useState('08/28');
  const [cardCvc, setCardCvc] = useState('884');

  const [createdOrder, setCreatedOrder] = useState<Order | null>(null);

  const deliveryCost = cartSubtotal >= freeShippingThreshold ? 0 : deliveryMethod === 'overnight' ? 25 : 15;
  const finalOrderTotal = cartTotal + deliveryCost;

  const handleCompleteOrder = () => {
    const paymentLabel =
      paymentType === 'applepay'
        ? 'Apple Pay (•••• 4092)'
        : paymentType === 'klarna'
        ? 'Klarna 4-Pay Installments'
        : `Visa ending in ${cardNumber.slice(-4)}`;

    const order = placeOrder(shippingAddress, paymentLabel);
    setCreatedOrder(order);
    setStep('success');
  };

  if (cart.length === 0 && step !== 'success') {
    return (
      <div className="py-20 text-center space-y-4 max-w-md mx-auto">
        <div className="w-16 h-16 rounded-full bg-neutral-100 dark:bg-neutral-800 flex items-center justify-center text-neutral-400 mx-auto">
          <ShoppingBag className="w-8 h-8" />
        </div>
        <h2 className="text-xl font-bold text-neutral-900 dark:text-white">
          Your cart is empty
        </h2>
        <p className="text-xs text-neutral-500">
          Add some items to your bag before proceeding to checkout.
        </p>
        <button
          onClick={() => setCurrentView('shop')}
          className="px-6 py-3 rounded-full bg-neutral-900 dark:bg-white text-white dark:text-neutral-900 text-xs font-bold uppercase tracking-wider cursor-pointer"
        >
          Return to Collection
        </button>
      </div>
    );
  }

  return (
    <div className="py-10 bg-white dark:bg-neutral-950 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Step Indicator Header (if not success) */}
        {step !== 'success' && (
          <div className="mb-10 text-left space-y-4">
            <button
              onClick={() => setCurrentView('shop')}
              className="text-xs font-mono text-neutral-400 hover:text-black dark:hover:text-white flex items-center gap-1.5 cursor-pointer"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Continue Shopping</span>
            </button>

            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-neutral-900 dark:text-white font-sans">
                Secure Express Checkout
              </h1>

              {/* Progress Steps Pills */}
              <div className="flex items-center gap-2 font-mono text-xs">
                <span
                  className={`px-3 py-1.5 rounded-full font-bold ${
                    step === 'shipping'
                      ? 'bg-neutral-900 text-white dark:bg-white dark:text-neutral-900'
                      : 'bg-neutral-100 text-neutral-500 dark:bg-neutral-800'
                  }`}
                >
                  1. Shipping
                </span>
                <span className="text-neutral-300">•</span>
                <span
                  className={`px-3 py-1.5 rounded-full font-bold ${
                    step === 'delivery'
                      ? 'bg-neutral-900 text-white dark:bg-white dark:text-neutral-900'
                      : 'bg-neutral-100 text-neutral-500 dark:bg-neutral-800'
                  }`}
                >
                  2. Delivery
                </span>
                <span className="text-neutral-300">•</span>
                <span
                  className={`px-3 py-1.5 rounded-full font-bold ${
                    step === 'payment' || step === 'review'
                      ? 'bg-neutral-900 text-white dark:bg-white dark:text-neutral-900'
                      : 'bg-neutral-100 text-neutral-500 dark:bg-neutral-800'
                  }`}
                >
                  3. Payment
                </span>
              </div>
            </div>
          </div>
        )}

        {/* Success Screen */}
        {step === 'success' && createdOrder ? (
          <div className="max-w-2xl mx-auto space-y-8 text-left py-6">
            <div className="p-8 sm:p-12 rounded-3xl bg-neutral-50 dark:bg-neutral-900/60 border border-neutral-200/80 dark:border-neutral-800 text-center space-y-4 shadow-xl">
              <div className="w-16 h-16 rounded-full bg-emerald-100 dark:bg-emerald-950 text-emerald-600 dark:text-emerald-400 mx-auto flex items-center justify-center">
                <CheckCircle2 className="w-8 h-8" />
              </div>

              <span className="text-xs font-mono tracking-widest text-emerald-700 dark:text-emerald-400 uppercase font-bold">
                ORDER CONFIRMED • {createdOrder.id}
              </span>

              <h2 className="text-2xl sm:text-3xl font-bold text-neutral-900 dark:text-white font-sans">
                Thank you for your order, {createdOrder.shippingAddress.fullName}
              </h2>

              <p className="text-xs sm:text-sm text-neutral-500 max-w-md mx-auto">
                We have received your request. Your order is being hand-packaged at our San Francisco atelier.
              </p>

              {/* Order Details Grid */}
              <div className="pt-6 grid grid-cols-2 gap-4 text-left border-t border-neutral-200 dark:border-neutral-800 text-xs font-mono">
                <div>
                  <span className="text-neutral-400 block">ESTIMATED DELIVERY</span>
                  <span className="text-neutral-900 dark:text-white font-bold">{createdOrder.estimatedDelivery}</span>
                </div>
                <div>
                  <span className="text-neutral-400 block">TRACKING REFERENCE</span>
                  <span className="text-neutral-900 dark:text-white font-bold">{createdOrder.trackingNumber}</span>
                </div>
                <div>
                  <span className="text-neutral-400 block">PAYMENT METHOD</span>
                  <span className="text-neutral-900 dark:text-white font-bold">{createdOrder.paymentMethod}</span>
                </div>
                <div>
                  <span className="text-neutral-400 block">TOTAL PAID</span>
                  <span className="text-emerald-700 dark:text-emerald-400 font-bold">${createdOrder.total.toFixed(2)}</span>
                </div>
              </div>

              {/* Items Summary */}
              <div className="pt-4 space-y-2 border-t border-neutral-200 dark:border-neutral-800 text-left">
                <span className="text-xs font-mono font-bold text-neutral-400 uppercase block">ORDERED ITEMS</span>
                {createdOrder.items.map((item) => (
                  <div key={item.id} className="flex items-center justify-between text-xs">
                    <span className="text-neutral-900 dark:text-white font-medium">
                      {item.quantity}x {item.product.name} ({item.selectedColor.name})
                    </span>
                    <span className="font-mono text-neutral-500">${(item.product.price * item.quantity).toFixed(2)}</span>
                  </div>
                ))}
              </div>

              <div className="pt-6 flex flex-col sm:flex-row gap-3">
                <button
                  onClick={() => setCurrentView('dashboard')}
                  className="flex-1 py-3.5 px-6 rounded-2xl bg-neutral-900 dark:bg-white text-white dark:text-neutral-900 text-xs font-bold uppercase tracking-wider hover:bg-black cursor-pointer"
                >
                  View Order in Dashboard
                </button>
                <button
                  onClick={() => setCurrentView('shop')}
                  className="flex-1 py-3.5 px-6 rounded-2xl border border-neutral-300 dark:border-neutral-700 text-neutral-900 dark:text-white text-xs font-bold uppercase tracking-wider hover:border-black cursor-pointer"
                >
                  Return to Collection
                </button>
              </div>
            </div>
          </div>
        ) : (
          /* Multi-step checkout form + summary */
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
            
            {/* Left Steps Form (7 Cols) */}
            <div className="lg:col-span-7 space-y-8 text-left">
              
              {/* Step 1: Shipping Address */}
              <div
                className={`p-6 sm:p-8 rounded-3xl border transition-all ${
                  step === 'shipping'
                    ? 'bg-white dark:bg-neutral-900 border-neutral-900 dark:border-white shadow-lg'
                    : 'bg-neutral-50 dark:bg-neutral-900/40 border-neutral-200/80 dark:border-neutral-800'
                }`}
              >
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-base font-bold text-neutral-900 dark:text-white font-sans flex items-center gap-2">
                    <span className="w-6 h-6 rounded-full bg-neutral-900 dark:bg-white text-white dark:text-neutral-900 text-xs flex items-center justify-center font-mono">
                      1
                    </span>
                    <span>Shipping Address</span>
                  </h3>
                  {step !== 'shipping' && (
                    <button
                      onClick={() => setStep('shipping')}
                      className="text-xs font-semibold text-emerald-700 dark:text-emerald-400 hover:underline cursor-pointer"
                    >
                      Edit
                    </button>
                  )}
                </div>

                {step === 'shipping' ? (
                  <div className="space-y-4">
                    <div>
                      <label className="block text-xs font-mono font-bold text-neutral-500 uppercase mb-1">
                        FULL NAME
                      </label>
                      <input
                        type="text"
                        value={shippingAddress.fullName}
                        onChange={(e) => setShippingAddress((p) => ({ ...p, fullName: e.target.value }))}
                        className="w-full px-4 py-2.5 rounded-xl bg-neutral-100 dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 text-xs text-neutral-900 dark:text-white focus:outline-none"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-mono font-bold text-neutral-500 uppercase mb-1">
                        STREET ADDRESS
                      </label>
                      <input
                        type="text"
                        value={shippingAddress.street}
                        onChange={(e) => setShippingAddress((p) => ({ ...p, street: e.target.value }))}
                        className="w-full px-4 py-2.5 rounded-xl bg-neutral-100 dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 text-xs text-neutral-900 dark:text-white focus:outline-none"
                      />
                    </div>

                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <label className="block text-xs font-mono font-bold text-neutral-500 uppercase mb-1">
                          CITY
                        </label>
                        <input
                          type="text"
                          value={shippingAddress.city}
                          onChange={(e) => setShippingAddress((p) => ({ ...p, city: e.target.value }))}
                          className="w-full px-4 py-2.5 rounded-xl bg-neutral-100 dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 text-xs text-neutral-900 dark:text-white focus:outline-none"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-mono font-bold text-neutral-500 uppercase mb-1">
                          ZIP CODE
                        </label>
                        <input
                          type="text"
                          value={shippingAddress.zipCode}
                          onChange={(e) => setShippingAddress((p) => ({ ...p, zipCode: e.target.value }))}
                          className="w-full px-4 py-2.5 rounded-xl bg-neutral-100 dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 text-xs text-neutral-900 dark:text-white focus:outline-none"
                        />
                      </div>
                    </div>

                    <button
                      onClick={() => setStep('delivery')}
                      className="w-full py-3.5 rounded-2xl bg-neutral-900 dark:bg-white text-white dark:text-neutral-900 text-xs font-bold uppercase tracking-wider cursor-pointer"
                    >
                      Continue to Delivery
                    </button>
                  </div>
                ) : (
                  <p className="text-xs text-neutral-600 dark:text-neutral-400 font-mono">
                    {shippingAddress.fullName}, {shippingAddress.street}, {shippingAddress.city} {shippingAddress.zipCode}
                  </p>
                )}
              </div>

              {/* Step 2: Delivery Options */}
              <div
                className={`p-6 sm:p-8 rounded-3xl border transition-all ${
                  step === 'delivery'
                    ? 'bg-white dark:bg-neutral-900 border-neutral-900 dark:border-white shadow-lg'
                    : 'bg-neutral-50 dark:bg-neutral-900/40 border-neutral-200/80 dark:border-neutral-800'
                }`}
              >
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-base font-bold text-neutral-900 dark:text-white font-sans flex items-center gap-2">
                    <span className="w-6 h-6 rounded-full bg-neutral-900 dark:bg-white text-white dark:text-neutral-900 text-xs flex items-center justify-center font-mono">
                      2
                    </span>
                    <span>Delivery Options</span>
                  </h3>
                  {step !== 'delivery' && step !== 'shipping' && (
                    <button
                      onClick={() => setStep('delivery')}
                      className="text-xs font-semibold text-emerald-700 dark:text-emerald-400 hover:underline cursor-pointer"
                    >
                      Edit
                    </button>
                  )}
                </div>

                {step === 'delivery' ? (
                  <div className="space-y-3">
                    <div
                      onClick={() => setDeliveryMethod('express')}
                      className={`p-4 rounded-2xl border cursor-pointer flex items-center justify-between transition-all ${
                        deliveryMethod === 'express'
                          ? 'border-neutral-900 dark:border-white bg-neutral-100/60 dark:bg-neutral-800'
                          : 'border-neutral-200 dark:border-neutral-700'
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <Truck className="w-5 h-5 text-neutral-700 dark:text-neutral-300" />
                        <div>
                          <h4 className="text-xs font-bold text-neutral-900 dark:text-white">
                            AURA Express Courier (3 - 5 Days)
                          </h4>
                          <p className="text-[11px] text-neutral-500">Fully tracked & signature required</p>
                        </div>
                      </div>
                      <span className="text-xs font-mono font-bold text-neutral-900 dark:text-white">
                        {cartSubtotal >= freeShippingThreshold ? 'FREE' : '$15.00'}
                      </span>
                    </div>

                    <div
                      onClick={() => setDeliveryMethod('overnight')}
                      className={`p-4 rounded-2xl border cursor-pointer flex items-center justify-between transition-all ${
                        deliveryMethod === 'overnight'
                          ? 'border-neutral-900 dark:border-white bg-neutral-100/60 dark:bg-neutral-800'
                          : 'border-neutral-200 dark:border-neutral-700'
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <PackageCheck className="w-5 h-5 text-neutral-700 dark:text-neutral-300" />
                        <div>
                          <h4 className="text-xs font-bold text-neutral-900 dark:text-white">
                            Overnight Air Dispatch (1 - 2 Days)
                          </h4>
                          <p className="text-[11px] text-neutral-500">Priority handoff before 10 AM</p>
                        </div>
                      </div>
                      <span className="text-xs font-mono font-bold text-neutral-900 dark:text-white">$25.00</span>
                    </div>

                    <button
                      onClick={() => setStep('payment')}
                      className="w-full py-3.5 rounded-2xl bg-neutral-900 dark:bg-white text-white dark:text-neutral-900 text-xs font-bold uppercase tracking-wider cursor-pointer mt-2"
                    >
                      Continue to Payment
                    </button>
                  </div>
                ) : (
                  step !== 'shipping' && (
                    <p className="text-xs text-neutral-600 dark:text-neutral-400 font-mono">
                      {deliveryMethod === 'express' ? 'AURA Express Courier (3-5 Days)' : 'Overnight Air Dispatch'}
                    </p>
                  )
                )}
              </div>

              {/* Step 3: Payment Method */}
              <div
                className={`p-6 sm:p-8 rounded-3xl border transition-all ${
                  step === 'payment' || step === 'review'
                    ? 'bg-white dark:bg-neutral-900 border-neutral-900 dark:border-white shadow-lg'
                    : 'bg-neutral-50 dark:bg-neutral-900/40 border-neutral-200/80 dark:border-neutral-800'
                }`}
              >
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-base font-bold text-neutral-900 dark:text-white font-sans flex items-center gap-2">
                    <span className="w-6 h-6 rounded-full bg-neutral-900 dark:bg-white text-white dark:text-neutral-900 text-xs flex items-center justify-center font-mono">
                      3
                    </span>
                    <span>Payment Selection</span>
                  </h3>
                </div>

                {step === 'payment' || step === 'review' ? (
                  <div className="space-y-4">
                    {/* Express Options */}
                    <div className="grid grid-cols-2 gap-3">
                      <button
                        onClick={() => setPaymentType('applepay')}
                        className={`p-3 rounded-2xl border text-xs font-bold tracking-wider uppercase transition-all flex items-center justify-center gap-2 cursor-pointer ${
                          paymentType === 'applepay'
                            ? 'bg-neutral-900 text-white border-black dark:bg-white dark:text-neutral-900'
                            : 'bg-neutral-100 dark:bg-neutral-800 text-neutral-700 dark:text-neutral-300 border-neutral-200 dark:border-neutral-700'
                        }`}
                      >
                        <span> Pay</span>
                      </button>
                      <button
                        onClick={() => setPaymentType('card')}
                        className={`p-3 rounded-2xl border text-xs font-bold tracking-wider uppercase transition-all flex items-center justify-center gap-2 cursor-pointer ${
                          paymentType === 'card'
                            ? 'bg-neutral-900 text-white border-black dark:bg-white dark:text-neutral-900'
                            : 'bg-neutral-100 dark:bg-neutral-800 text-neutral-700 dark:text-neutral-300 border-neutral-200 dark:border-neutral-700'
                        }`}
                      >
                        <CreditCard className="w-4 h-4" />
                        <span>Credit Card</span>
                      </button>
                    </div>

                    {paymentType === 'card' && (
                      <div className="space-y-3 p-4 rounded-2xl bg-neutral-50 dark:bg-neutral-800/50 border border-neutral-200 dark:border-neutral-700">
                        <div>
                          <label className="block text-xs font-mono font-bold text-neutral-500 uppercase mb-1">
                            CARD NUMBER
                          </label>
                          <input
                            type="text"
                            value={cardNumber}
                            onChange={(e) => setCardNumber(e.target.value)}
                            className="w-full px-4 py-2 rounded-xl bg-white dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 text-xs font-mono text-neutral-900 dark:text-white focus:outline-none"
                          />
                        </div>

                        <div className="grid grid-cols-2 gap-3">
                          <div>
                            <label className="block text-xs font-mono font-bold text-neutral-500 uppercase mb-1">
                              EXPIRY
                            </label>
                            <input
                              type="text"
                              value={cardExpiry}
                              onChange={(e) => setCardExpiry(e.target.value)}
                              className="w-full px-4 py-2 rounded-xl bg-white dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 text-xs font-mono text-neutral-900 dark:text-white focus:outline-none"
                            />
                          </div>
                          <div>
                            <label className="block text-xs font-mono font-bold text-neutral-500 uppercase mb-1">
                              CVC
                            </label>
                            <input
                              type="text"
                              value={cardCvc}
                              onChange={(e) => setCardCvc(e.target.value)}
                              className="w-full px-4 py-2 rounded-xl bg-white dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 text-xs font-mono text-neutral-900 dark:text-white focus:outline-none"
                            />
                          </div>
                        </div>
                      </div>
                    )}

                    <div className="pt-2">
                      <button
                        onClick={handleCompleteOrder}
                        className="w-full py-4 rounded-2xl bg-emerald-700 hover:bg-emerald-800 text-white text-xs font-bold tracking-widest uppercase transition-all shadow-xl flex items-center justify-center gap-2 cursor-pointer"
                        id="complete-order-button"
                      >
                        <Lock className="w-4 h-4" />
                        <span>Pay ${finalOrderTotal.toFixed(2)} & Place Order</span>
                      </button>
                    </div>
                  </div>
                ) : null}
              </div>

            </div>

            {/* Right Column: Order Summary Sticky Sidebar (5 Cols) */}
            <div className="lg:col-span-5 sticky top-28 p-6 sm:p-8 rounded-3xl bg-neutral-50 dark:bg-neutral-900/60 border border-neutral-200/80 dark:border-neutral-800 space-y-6 text-left">
              <h3 className="text-base font-bold text-neutral-900 dark:text-white font-sans">
                Order Summary ({cart.reduce((c, i) => c + i.quantity, 0)})
              </h3>

              {/* Items List */}
              <div className="space-y-3 max-h-60 overflow-y-auto pr-1">
                {cart.map((item) => (
                  <div key={item.id} className="flex items-center gap-3">
                    <img
                      src={item.product.images[0]}
                      alt={item.product.name}
                      className="w-12 h-12 rounded-xl object-cover bg-white dark:bg-neutral-800"
                    />
                    <div className="flex-1 min-w-0">
                      <h4 className="text-xs font-bold text-neutral-900 dark:text-white truncate">
                        {item.product.name}
                      </h4>
                      <p className="text-[11px] text-neutral-500">
                        {item.selectedColor.name} • Qty {item.quantity}
                      </p>
                    </div>
                    <span className="text-xs font-mono font-bold text-neutral-900 dark:text-white">
                      ${(item.product.price * item.quantity).toFixed(2)}
                    </span>
                  </div>
                ))}
              </div>

              {/* Calculation List */}
              <div className="space-y-2 text-xs font-mono border-t border-neutral-200 dark:border-neutral-800 pt-4">
                <div className="flex justify-between text-neutral-600 dark:text-neutral-400">
                  <span>Subtotal</span>
                  <span>${cartSubtotal.toFixed(2)}</span>
                </div>

                {discountAmount > 0 && (
                  <div className="flex justify-between text-emerald-700 dark:text-emerald-400 font-semibold">
                    <span>Discount</span>
                    <span>-${discountAmount.toFixed(2)}</span>
                  </div>
                )}

                <div className="flex justify-between text-neutral-600 dark:text-neutral-400">
                  <span>Shipping</span>
                  <span>{deliveryCost === 0 ? 'FREE' : `$${deliveryCost}.00`}</span>
                </div>

                <div className="flex justify-between text-base font-bold text-neutral-900 dark:text-white pt-3 border-t border-neutral-200 dark:border-neutral-800 font-sans">
                  <span>Total Due</span>
                  <span className="font-mono">${finalOrderTotal.toFixed(2)}</span>
                </div>
              </div>

              <div className="p-3 rounded-2xl bg-white dark:bg-neutral-800 border border-neutral-200/80 dark:border-neutral-700 flex items-center gap-2 text-xs text-neutral-500">
                <ShieldCheck className="w-4 h-4 text-emerald-700 dark:text-emerald-400 flex-shrink-0" />
                <span>256-Bit Encrypted Security & 30-Day Hassle-Free Returns</span>
              </div>
            </div>

          </div>
        )}

      </div>
    </div>
  );
};
