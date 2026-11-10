export interface Product {
  id: string;
  slug: string;
  name: string;
  tagline: string;
  description: string;
  size: string;
  price: number;
  imageUrl: string;
}

export interface CartItem {
  product: Product;
  quantity: number;
}
