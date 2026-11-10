import { useMemo, useState } from 'react';
import type { CartItem, Product } from '@/types';

export function useCart() {
  const [items, setItems] = useState<CartItem[]>([]);

  const addItem = (product: Product) =>
    setItems((current) => {
      const existing = current.find((item) => item.product.id === product.id);
      if (!existing) return [...current, { product, quantity: 1 }];
      return current.map((item) =>
        item.product.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
      );
    });

  const updateQuantity = (productId: string, quantity: number) =>
    setItems((current) =>
      quantity <= 0
        ? current.filter((item) => item.product.id !== productId)
        : current.map((item) => (item.product.id === productId ? { ...item, quantity } : item))
    );

  const clear = () => setItems([]);

  const { count, subtotal } = useMemo(
    () => ({
      count: items.reduce((sum, item) => sum + item.quantity, 0),
      subtotal: items.reduce((sum, item) => sum + item.product.price * item.quantity, 0),
    }),
    [items]
  );

  return { items, count, subtotal, addItem, updateQuantity, clear };
}
