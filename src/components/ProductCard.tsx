import { useState } from 'react';
import { Check, Plus } from 'lucide-react';
import { formatTaka } from '@/lib/format';
import type { Product } from '@/types';

interface ProductCardProps {
  product: Product;
  onAdd: (product: Product) => void;
}

export default function ProductCard({ product, onAdd }: ProductCardProps) {
  const [justAdded, setJustAdded] = useState(false);

  const handleAdd = () => {
    onAdd(product);
    setJustAdded(true);
    window.setTimeout(() => setJustAdded(false), 1400);
  };

  return (
    <article className="group flex flex-col">
      <div className="relative aspect-[4/5] overflow-hidden rounded-[1.5rem] bg-neutral-100">
        {product.imageUrl && (
          <img
            src={product.imageUrl}
            alt={product.name}
            loading="lazy"
            className="h-full w-full object-cover transition duration-[1400ms] ease-out group-hover:scale-[1.04]"
          />
        )}
        {product.size && (
          <span className="absolute left-4 top-4 rounded-full bg-neutral-50/90 px-3 py-1 text-xs text-neutral-700 backdrop-blur">
            {product.size}
          </span>
        )}
      </div>

      <div className="flex flex-1 flex-col px-1 pt-6">
        <p className="text-xs uppercase tracking-[0.2em] text-neutral-500">{product.tagline}</p>
        <h3 className="mt-2 text-lg font-semibold">{product.name}</h3>
        <p className="mt-3 line-clamp-2 flex-1 text-sm leading-relaxed text-neutral-600">
          {product.description}
        </p>

        <div className="mt-6 flex flex-wrap items-center justify-between gap-x-4 gap-y-3">
          <p className="font-serif text-2xl font-medium text-neutral-900">{formatTaka(product.price)}</p>
          <button
            type="button"
            onClick={handleAdd}
            className={`inline-flex items-center gap-2 rounded-full px-5 py-2.5 text-sm font-medium transition duration-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 focus-visible:ring-offset-2 focus-visible:ring-offset-neutral-50 ${
              justAdded
                ? 'bg-success-600 text-neutral-50'
                : 'border border-neutral-900 text-neutral-900 hover:bg-neutral-900 hover:text-neutral-50 active:scale-95'
            }`}
          >
            {justAdded ? <Check className="h-4 w-4" /> : <Plus className="h-4 w-4" />}
            {justAdded ? 'যোগ হয়েছে' : 'কার্টে যোগ করুন'}
          </button>
        </div>
      </div>
    </article>
  );
}
