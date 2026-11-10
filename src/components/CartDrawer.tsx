import { useEffect, useState } from 'react';
import { CheckCircle2, Minus, Plus, ShoppingBag, Trash2, X } from 'lucide-react';
import CheckoutForm from '@/components/CheckoutForm';
import { formatTaka } from '@/lib/format';
import type { CartItem } from '@/types';

type CartStep = 'cart' | 'checkout' | 'success';

interface CartDrawerProps {
  open: boolean;
  onClose: () => void;
  items: CartItem[];
  subtotal: number;
  onUpdateQuantity: (productId: string, quantity: number) => void;
  onOrderPlaced: () => void;
}

export default function CartDrawer({
  open,
  onClose,
  items,
  subtotal,
  onUpdateQuantity,
  onOrderPlaced,
}: CartDrawerProps) {
  const [step, setStep] = useState<CartStep>('cart');

  useEffect(() => {
    if (!open) return;
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') onClose();
    };
    document.body.style.overflow = 'hidden';
    window.addEventListener('keydown', onKeyDown);
    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', onKeyDown);
    };
  }, [open, onClose]);

  const handleClose = () => {
    onClose();
    if (step === 'success') {
      setStep('cart');
    }
  };

  const handleSuccess = () => {
    onOrderPlaced();
    setStep('success');
  };

  return (
    <div className={`fixed inset-0 z-50 ${open ? '' : 'pointer-events-none'}`} aria-hidden={!open}>
      <div
        onClick={handleClose}
        className={`absolute inset-0 bg-neutral-900/40 backdrop-blur-sm transition-opacity duration-500 ${
          open ? 'opacity-100' : 'opacity-0'
        }`}
      />

      <aside
        role="dialog"
        aria-modal="true"
        aria-label="শপিং কার্ট"
        className={`absolute right-0 top-0 flex h-full w-full max-w-md flex-col bg-neutral-50 shadow-[-24px_0_48px_-24px_rgba(26,25,23,0.25)] transition-transform duration-500 ease-out ${
          open ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        <div className="flex items-center justify-between border-b border-neutral-200 px-6 py-5">
          <h2 className="text-lg font-bold text-neutral-900">
            {step === 'checkout' ? 'অর্ডারের তথ্য' : 'আপনার কার্ট'}
          </h2>
          <button
            type="button"
            onClick={handleClose}
            className="flex h-11 w-11 items-center justify-center rounded-full text-neutral-700 transition hover:bg-neutral-200"
            aria-label="কার্ট বন্ধ করুন"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {step === 'success' && (
          <div className="flex flex-1 flex-col items-center justify-center px-8 text-center">
            <div className="flex h-16 w-16 animate-[pop_0.5s_ease-out] items-center justify-center rounded-full bg-success-50">
              <CheckCircle2 className="h-9 w-9 text-success-600" />
            </div>
            <h3 className="mt-6 text-2xl font-bold text-neutral-900">ধন্যবাদ, অর্ডার পেয়েছি</h3>
            <p className="mt-3 text-base leading-relaxed text-neutral-600">
              আমরা শীঘ্রই আপনার দেওয়া মোবাইল নম্বরে যোগাযোগ করে অর্ডারটি নিশ্চিত করব।
            </p>
            <button type="button" onClick={handleClose} className="btn-primary mt-8">
              কেনাকাটা চালিয়ে যান
            </button>
          </div>
        )}

        {step === 'cart' && items.length === 0 && (
          <div className="flex flex-1 flex-col items-center justify-center px-8 text-center">
            <div className="flex h-16 w-16 items-center justify-center rounded-full bg-neutral-100">
              <ShoppingBag className="h-7 w-7 text-neutral-600" strokeWidth={1.5} />
            </div>
            <h3 className="mt-6 text-xl font-bold text-neutral-900">কার্ট এখনও খালি</h3>
            <p className="mt-2 text-sm text-neutral-600">পছন্দের পণ্য যোগ করে এখানে অর্ডার করুন।</p>
            <a href="#products" onClick={handleClose} className="btn-outline mt-8">
              পণ্য দেখুন
            </a>
          </div>
        )}

        {step === 'cart' && items.length > 0 && (
          <>
            <ul className="flex-1 space-y-4 overflow-y-auto px-6 py-6">
              {items.map(({ product, quantity }) => (
                <li
                  key={product.id}
                  className="flex gap-4 border-b border-neutral-200 pb-5 last:border-b-0"
                >
                  <img
                    src={product.imageUrl}
                    alt={product.name}
                    className="h-20 w-20 shrink-0 rounded-xl object-cover"
                  />
                  <div className="flex min-w-0 flex-1 flex-col justify-between">
                    <div className="flex items-start justify-between gap-2">
                      <div className="min-w-0">
                        <p className="truncate font-medium text-neutral-900">{product.name}</p>
                        <p className="text-sm text-neutral-500">{formatTaka(product.price)}</p>
                      </div>
                      <button
                        type="button"
                        onClick={() => onUpdateQuantity(product.id, 0)}
                        className="-m-2 flex h-11 w-11 shrink-0 items-center justify-center rounded-full text-neutral-500 transition hover:bg-error-50 hover:text-error-600"
                        aria-label={`${product.name} সরিয়ে ফেলুন`}
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="flex items-center rounded-full border border-neutral-300">
                        <button
                          type="button"
                          onClick={() => onUpdateQuantity(product.id, quantity - 1)}
                          className="flex h-11 w-11 items-center justify-center rounded-full text-neutral-700 transition hover:bg-neutral-100"
                          aria-label="পরিমাণ কমান"
                        >
                          <Minus className="h-3.5 w-3.5" />
                        </button>
                        <span className="w-9 text-center text-sm font-medium text-neutral-900">
                          {quantity.toLocaleString('bn-BD')}
                        </span>
                        <button
                          type="button"
                          onClick={() => onUpdateQuantity(product.id, quantity + 1)}
                          className="flex h-11 w-11 items-center justify-center rounded-full text-neutral-700 transition hover:bg-neutral-100"
                          aria-label="পরিমাণ বাড়ান"
                        >
                          <Plus className="h-3.5 w-3.5" />
                        </button>
                      </div>
                      <p className="ml-auto text-sm font-medium text-neutral-900">
                        {formatTaka(product.price * quantity)}
                      </p>
                    </div>
                  </div>
                </li>
              ))}
            </ul>

            <div className="border-t border-neutral-200 bg-white px-6 py-6">
              <div className="flex items-center justify-between text-base">
                <span className="text-neutral-600">মোট</span>
                <span className="font-serif text-2xl font-semibold text-neutral-900">
                  {formatTaka(subtotal)}
                </span>
              </div>
              <p className="mt-1 text-xs text-neutral-500">ডেলিভারি চার্জ যোগাযোগের সময় জানানো হবে।</p>
              <button type="button" onClick={() => setStep('checkout')} className="btn-primary mt-5 w-full">
                অর্ডার নিশ্চিত করুন
              </button>
            </div>
          </>
        )}

        {step === 'checkout' && (
          <div className="flex-1 overflow-y-auto px-6 py-6">
            <CheckoutForm items={items} onBack={() => setStep('cart')} onSuccess={handleSuccess} />
          </div>
        )}
      </aside>
    </div>
  );
}
