import { supabase } from '@/lib/supabase';
import type { CartItem } from '@/types';

export interface CheckoutDetails {
  customerName: string;
  phone: string;
  address: string;
  note: string;
}

export async function placeOrder(details: CheckoutDetails, items: CartItem[]): Promise<void> {
  const total = items.reduce((sum, item) => sum + item.product.price * item.quantity, 0);

  const { error } = await supabase.from('orders').insert({
    customer_name: details.customerName,
    phone: details.phone,
    address: details.address,
    note: details.note,
    items: items.map((item) => ({
      slug: item.product.slug,
      name: item.product.name,
      price: item.product.price,
      quantity: item.quantity,
    })),
    total,
  });

  if (error) throw error;
}
