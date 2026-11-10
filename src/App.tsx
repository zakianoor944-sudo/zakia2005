import { useState } from 'react';
import About from '@/components/About';
import Benefits from '@/components/Benefits';
import CartDrawer from '@/components/CartDrawer';
import Faq from '@/components/Faq';
import Footer from '@/components/Footer';
import Header from '@/components/Header';
import Hero from '@/components/Hero';
import OrderSteps from '@/components/OrderSteps';
import Products from '@/components/Products';
import Testimonials from '@/components/Testimonials';
import { useCart } from '@/hooks/useCart';
import { useProducts } from '@/hooks/useProducts';

export default function App() {
  const { products, status, retry } = useProducts();
  const cart = useCart();
  const [cartOpen, setCartOpen] = useState(false);

  return (
    <div className="min-h-screen bg-neutral-50">
      <Header cartCount={cart.count} onOpenCart={() => setCartOpen(true)} />
      <main>
        <Hero />
        <About />
        <Products products={products} status={status} onRetry={retry} onAdd={cart.addItem} />
        <Benefits />
        <OrderSteps />
        <Testimonials />
        <Faq />
      </main>
      <Footer />
      <CartDrawer
        open={cartOpen}
        onClose={() => setCartOpen(false)}
        items={cart.items}
        subtotal={cart.subtotal}
        onUpdateQuantity={cart.updateQuantity}
        onOrderPlaced={cart.clear}
      />
    </div>
  );
}
