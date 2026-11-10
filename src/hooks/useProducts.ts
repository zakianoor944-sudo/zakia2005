import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabase';
import type { Product } from '@/types';

type ProductsStatus = 'loading' | 'ready' | 'error';

interface ProductRow {
  id: string;
  slug: string;
  name: string;
  tagline: string;
  description: string;
  size: string;
  price: number;
  image_url: string;
}

function toProduct(row: Partial<ProductRow>): Product | null {
  if (!row.id || !row.slug || !row.name || typeof row.price !== 'number') return null;
  return {
    id: row.id,
    slug: row.slug,
    name: row.name,
    tagline: row.tagline ?? '',
    description: row.description ?? '',
    size: row.size ?? '',
    price: row.price,
    imageUrl: row.image_url ?? '',
  };
}

export function useProducts() {
  const [products, setProducts] = useState<Product[]>([]);
  const [status, setStatus] = useState<ProductsStatus>('loading');
  const [attempt, setAttempt] = useState(0);

  useEffect(() => {
    let cancelled = false;

    supabase
      .from('products')
      .select('id, slug, name, tagline, description, size, price, image_url')
      .order('sort_order', { ascending: true })
      .then(({ data, error }) => {
        if (cancelled) return;
        if (error || !Array.isArray(data)) {
          setStatus('error');
          return;
        }
        setProducts(data.map(toProduct).filter((p): p is Product => p !== null));
        setStatus('ready');
      });

    return () => {
      cancelled = true;
    };
  }, [attempt]);

  const retry = () => {
    setStatus('loading');
    setAttempt((n) => n + 1);
  };

  return { products, status, retry };
}
