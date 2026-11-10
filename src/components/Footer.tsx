import { Globe, Mail, MapPin, MessageCircle, Phone } from 'lucide-react';
import Reveal from '@/components/Reveal';
import { BUSINESS, NAV_LINKS } from '@/data/siteContent';

export default function Footer() {
  return (
    <footer id="contact" className="scroll-mt-24 border-t border-neutral-200 bg-neutral-50">
      <div className="mx-auto max-w-7xl px-6 sm:px-10">
        <Reveal className="flex flex-col items-start justify-between gap-8 border-b border-neutral-200 py-20 lg:flex-row lg:items-end">
          <div>
            <p className="text-3xl font-bold tracking-tight text-neutral-900 sm:text-4xl">
              আপনার ত্বকের যত্ন আজই শুরু করুন
            </p>
            <p className="mt-4 max-w-md text-base leading-[1.8] text-neutral-600">
              পণ্য বেছে নিন, অথবা সরাসরি আমাদের সাথে কথা বলুন। কোনো প্রশ্ন থাকলে আমরা সাহায্য করতে প্রস্তুত।
            </p>
          </div>
          <div className="flex w-full flex-col gap-3 sm:w-auto sm:flex-row">
            <a href="#products" className="btn-primary w-full sm:w-auto">
              পণ্য দেখুন
            </a>
            <a
              href={`https://wa.me/${BUSINESS.whatsapp}`}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-outline w-full sm:w-auto"
            >
              <MessageCircle className="h-4 w-4" strokeWidth={1.5} />
              হোয়াটসঅ্যাপে কথা বলুন
            </a>
          </div>
        </Reveal>

        <div className="grid gap-12 py-16 md:grid-cols-12">
          <div className="md:col-span-5">
            <span className="font-serif text-2xl font-semibold text-neutral-900">{BUSINESS.name}</span>
            <p className="mt-5 max-w-sm text-sm leading-[1.8] text-neutral-600">
              সব বয়সের ত্বকের জন্য বাছাই করা স্কিন কেয়ার পণ্য। প্রতিদিনের সহজ যত্নে আপনার ত্বকের স্বাভাবিক
              ত্বক সুস্থ ও সতেজ রাখুন।
            </p>
          </div>

          <div className="md:col-span-3">
            <h3 className="text-xs font-medium uppercase tracking-[0.24em] text-neutral-500">দ্রুত লিংক</h3>
            <ul className="mt-6 space-y-3">
              {NAV_LINKS.map((link) => (
                <li key={link.href}>
                  <a href={link.href} className="text-sm text-neutral-700 transition-colors duration-500 hover:text-primary-700">
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div className="md:col-span-4">
            <h3 className="text-xs font-medium uppercase tracking-[0.24em] text-neutral-500">যোগাযোগ</h3>
            <ul className="mt-6 space-y-4 text-sm text-neutral-700">
              <li className="flex items-start gap-3">
                <Phone className="mt-0.5 h-4 w-4 shrink-0 text-primary-700" strokeWidth={1.5} />
                <a href={`tel:${BUSINESS.phone.replace(/[^+\d]/g, '')}`} className="transition-colors hover:text-primary-700">
                  {BUSINESS.phone}
                </a>
              </li>
              <li className="flex items-start gap-3">
                <Mail className="mt-0.5 h-4 w-4 shrink-0 text-primary-700" strokeWidth={1.5} />
                <a href={`mailto:${BUSINESS.email}`} className="transition-colors hover:text-primary-700">
                  {BUSINESS.email}
                </a>
              </li>
              <li className="flex items-start gap-3">
                <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-primary-700" strokeWidth={1.5} />
                <span>{BUSINESS.address}</span>
              </li>
              <li className="flex items-start gap-3">
                <Globe className="mt-0.5 h-4 w-4 shrink-0 text-primary-700" strokeWidth={1.5} />
                <span>ফেসবুক: {BUSINESS.facebook}</span>
              </li>
            </ul>
          </div>
        </div>
      </div>

      <div className="border-t border-neutral-200">
        <div className="mx-auto flex max-w-7xl flex-col gap-2 px-6 py-6 text-xs text-neutral-500 sm:flex-row sm:items-center sm:justify-between sm:px-10">
          <p>© {new Date().getFullYear()} {BUSINESS.name}। সর্বস্বত্ব সংরক্ষিত।</p>
          <a href="#top" className="transition-colors hover:text-neutral-900">
            উপরে যান
          </a>
        </div>
      </div>
    </footer>
  );
}
