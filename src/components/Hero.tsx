import { ArrowRight, Check, Droplet, ShieldCheck, Sun } from 'lucide-react';
import Reveal from '@/components/Reveal';

export default function Hero() {
  return (
    <section id="top" className="pt-28 pb-20 sm:pt-36 sm:pb-28 lg:pt-40">
      <div className="mx-auto grid max-w-7xl items-center gap-14 px-6 sm:px-10 lg:grid-cols-12 lg:gap-20">
        <div className="lg:col-span-6">
          <Reveal>
            <p className="eyebrow">সব বয়সের জন্য স্কিন কেয়ার</p>
          </Reveal>

          <Reveal delay={100}>
            <h1 className="mt-6 text-[2.25rem] font-bold leading-[1.3] sm:text-5xl lg:text-6xl">
              সহজ যত্নে গড়ে তুলুন
              <span className="mt-1 block text-primary-700">উজ্জ্বল, সুস্থ ত্বক</span>
            </h1>
          </Reveal>

          <Reveal delay={200}>
            <p className="mt-6 max-w-lg text-base leading-[1.8] text-neutral-600 sm:text-lg">
              ৫ থেকে ৫০ বছরের বেশি বয়সী সবার জন্য বাছাই করা কোমল স্কিন কেয়ার পণ্য। আপনার ত্বকের ধরন
              অনুযায়ী পণ্য বেছে নিন এবং প্রতিদিনের সহজ রুটিনে যত্ন নিন।
            </p>
          </Reveal>

          <Reveal delay={300}>
            <div className="mt-10 flex flex-col gap-3 sm:flex-row sm:gap-4">
              <a href="#products" className="btn-primary group">
                এখনই পণ্য দেখুন
                <ArrowRight className="h-4 w-4 transition-transform duration-500 group-hover:translate-x-1" />
              </a>
              <a href="#order-steps" className="btn-outline">
                কীভাবে অর্ডার করবেন
              </a>
            </div>
          </Reveal>

          <Reveal delay={400}>
            <ul className="mt-10 flex flex-col gap-3 text-sm text-neutral-700 sm:flex-row sm:gap-8">
              <li className="flex items-center gap-2">
                <Check className="h-4 w-4 text-primary-700" strokeWidth={2} />
                ৫ থেকে ৫০+ বছর বয়সের জন্য
              </li>
              <li className="flex items-center gap-2">
                <Check className="h-4 w-4 text-primary-700" strokeWidth={2} />
                কার্ট থেকে সহজ অর্ডার
              </li>
            </ul>
          </Reveal>
        </div>

        <Reveal delay={150} className="lg:col-span-6">
          <div className="relative mx-auto max-w-md lg:max-w-none">
            <div className="absolute -inset-4 -z-10 rounded-[2rem] bg-primary-100/60" />
            <div className="overflow-hidden rounded-[1.75rem] bg-neutral-100 shadow-soft">
              <img
                src="https://images.pexels.com/photos/6847878/pexels-photo-6847878.jpeg?auto=compress&cs=tinysrgb&h=650&w=940"
                alt="ZN Gallary স্কিন কেয়ার সিরাম"
                className="hero-media aspect-[4/5] w-full object-cover sm:aspect-[5/4] lg:aspect-[4/5]"
              />
            </div>

            <div className="float-chip absolute -left-3 top-10 flex items-center gap-3 rounded-2xl border border-white/70 bg-white/90 px-4 py-3 shadow-soft backdrop-blur sm:-left-8">
              <span className="flex h-9 w-9 items-center justify-center rounded-full bg-primary-50">
                <Sun className="h-4 w-4 text-primary-700" strokeWidth={1.5} />
              </span>
              <span className="text-sm font-medium text-neutral-900">উজ্জ্বলতা</span>
            </div>

            <div className="float-chip float-chip-delayed absolute -right-3 bottom-16 flex items-center gap-3 rounded-2xl border border-white/70 bg-white/90 px-4 py-3 shadow-soft backdrop-blur sm:-right-8">
              <span className="flex h-9 w-9 items-center justify-center rounded-full bg-primary-50">
                <Droplet className="h-4 w-4 text-primary-700" strokeWidth={1.5} />
              </span>
              <span className="text-sm font-medium text-neutral-900">গভীর আর্দ্রতা</span>
            </div>

            <div className="float-chip absolute -bottom-5 left-6 flex items-center gap-3 rounded-2xl border border-white/70 bg-white/90 px-4 py-3 shadow-soft backdrop-blur">
              <span className="flex h-9 w-9 items-center justify-center rounded-full bg-primary-50">
                <ShieldCheck className="h-4 w-4 text-primary-700" strokeWidth={1.5} />
              </span>
              <span className="text-sm font-medium text-neutral-900">কোমল সুরক্ষা</span>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
