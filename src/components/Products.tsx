import { AlertCircle, RotateCw } from 'lucide-react';
import ProductCard from '@/components/ProductCard';
import Reveal from '@/components/Reveal';
import type { Product } from '@/types';

type ProductsStatus = 'loading' | 'ready' | 'error';

interface ProductsProps {
  products: Product[];
  status: ProductsStatus;
  onRetry: () => void;
  onAdd: (product: Product) => void;
}

function ProductSkeleton() {
  return (
    <div className="animate-pulse">
      <div className="aspect-[4/5] rounded-[1.5rem] bg-neutral-200/70" />
      <div className="space-y-3 px-1 pt-6">
        <div className="h-3 w-1/3 rounded bg-neutral-200" />
        <div className="h-5 w-2/3 rounded bg-neutral-200" />
        <div className="h-4 w-full rounded bg-neutral-100" />
      </div>
    </div>
  );
}

export default function Products({ products, status, onRetry, onAdd }: ProductsProps) {
  return (
    <section id="products" className="scroll-mt-24 py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-6 sm:px-10">
        <Reveal className="mx-auto max-w-2xl text-center">
          <p className="eyebrow">আমাদের সংগ্রহ</p>
          <h2 className="mt-5 text-3xl font-bold tracking-tight sm:text-4xl">
            আপনার ত্বকের জন্য পণ্য বেছে নিন
          </h2>
          <p className="mt-5 text-base leading-[1.8] text-neutral-600">
            প্রতিটি পণ্যের বিবরণ ও মূল্য নিচে দেওয়া আছে। পছন্দের পণ্য কার্টে যোগ করে এক জায়গা থেকেই অর্ডার দিন।
          </p>
        </Reveal>

        {status === 'loading' && (
          <div className="mt-20 grid gap-x-8 gap-y-16 sm:grid-cols-2 lg:grid-cols-3" aria-busy="true">
            {Array.from({ length: 6 }, (_, index) => (
              <ProductSkeleton key={index} />
            ))}
          </div>
        )}

        {status === 'error' && (
          <div className="mx-auto mt-20 flex max-w-md flex-col items-center rounded-[1.5rem] border border-neutral-200 bg-white p-10 text-center shadow-soft">
            <AlertCircle className="h-7 w-7 text-error-600" strokeWidth={1.5} />
            <p className="mt-5 text-base font-medium text-neutral-900">পণ্যের তালিকা লোড করা যায়নি</p>
            <p className="mt-2 text-sm text-neutral-600">ইন্টারনেট সংযোগ দেখে আবার চেষ্টা করুন।</p>
            <button type="button" onClick={onRetry} className="btn-primary mt-8">
              <RotateCw className="h-4 w-4" />
              আবার চেষ্টা করুন
            </button>
          </div>
        )}

        {status === 'ready' && products.length === 0 && (
          <p className="mt-20 text-center text-neutral-600">শীঘ্রই নতুন পণ্য যুক্ত করা হবে।</p>
        )}

        {status === 'ready' && products.length > 0 && (
          <div className="mt-20 grid gap-x-8 gap-y-16 sm:grid-cols-2 lg:grid-cols-3">
            {products.map((product, index) => (
              <Reveal key={product.id} delay={(index % 3) * 120}>
                <ProductCard product={product} onAdd={onAdd} />
              </Reveal>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
