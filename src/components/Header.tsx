import { useEffect, useState } from 'react';
import { Droplet, Menu, ShoppingBag, X } from 'lucide-react';
import { BUSINESS, NAV_LINKS } from '@/data/siteContent';

interface HeaderProps {
  cartCount: number;
  onOpenCart: () => void;
}

export default function Header({ cartCount, onOpenCart }: HeaderProps) {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 16);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-40 border-b transition-all duration-700 ${
        scrolled
          ? 'border-neutral-200/80 bg-neutral-50/85 backdrop-blur-xl'
          : 'border-transparent bg-transparent'
      }`}
    >
      <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-6 sm:px-10">
        <a href="#top" className="flex items-center gap-3" aria-label={BUSINESS.name}>
          <span className="flex h-9 w-9 items-center justify-center rounded-full border border-neutral-900/15">
            <Droplet className="h-4 w-4 text-primary-700" strokeWidth={1.5} />
          </span>
          <span className="flex flex-col leading-none">
            <span className="font-serif text-xl font-semibold tracking-tight text-neutral-900">ZN</span>
            <span className="mt-1 text-[10px] uppercase tracking-[0.34em] text-neutral-600">Gallary</span>
          </span>
        </a>

        <nav className="hidden items-center gap-8 lg:flex" aria-label="প্রধান মেনু">
          {NAV_LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="relative py-2 text-sm text-neutral-600 transition-colors duration-500 after:absolute after:bottom-0 after:left-0 after:h-px after:w-full after:origin-left after:scale-x-0 after:bg-neutral-900 after:transition-transform after:duration-500 hover:text-neutral-900 hover:after:scale-x-100"
            >
              {link.label}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={onOpenCart}
            className="relative flex h-11 w-11 items-center justify-center rounded-full text-neutral-900 transition duration-500 hover:bg-neutral-900/5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500"
            aria-label={`কার্ট খুলুন, ${cartCount}টি পণ্য`}
          >
            <ShoppingBag className="h-5 w-5" strokeWidth={1.5} />
            {cartCount > 0 && (
              <span
                key={cartCount}
                className="absolute -right-0.5 -top-0.5 flex h-5 min-w-5 animate-[pop_0.4s_ease-out] items-center justify-center rounded-full bg-primary-700 px-1 text-[11px] font-medium text-neutral-50"
              >
                {cartCount.toLocaleString('bn-BD')}
              </span>
            )}
          </button>

          <button
            type="button"
            onClick={() => setMenuOpen((open) => !open)}
            className="flex h-11 w-11 items-center justify-center rounded-full text-neutral-900 transition duration-500 hover:bg-neutral-900/5 lg:hidden"
            aria-label={menuOpen ? 'মেনু বন্ধ করুন' : 'মেনু খুলুন'}
            aria-expanded={menuOpen}
            aria-controls="mobile-menu"
          >
            {menuOpen ? <X className="h-5 w-5" strokeWidth={1.5} /> : <Menu className="h-5 w-5" strokeWidth={1.5} />}
          </button>
        </div>
      </div>

      <div
        id="mobile-menu"
        className={`overflow-hidden border-t border-neutral-200 bg-neutral-50/95 backdrop-blur-xl transition-all duration-500 lg:hidden ${
          menuOpen ? 'max-h-96 opacity-100' : 'invisible max-h-0 border-transparent opacity-0'
        }`}
      >
        <nav className="flex flex-col px-6 py-4" aria-label="মোবাইল মেনু">
          {NAV_LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={() => setMenuOpen(false)}
              className="border-b border-neutral-200/70 py-4 text-base text-neutral-800 transition-colors duration-300 last:border-b-0 hover:text-primary-700"
            >
              {link.label}
            </a>
          ))}
        </nav>
      </div>
    </header>
  );
}
