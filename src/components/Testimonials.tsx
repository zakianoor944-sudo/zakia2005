import { Quote } from 'lucide-react';
import Reveal from '@/components/Reveal';
import { TESTIMONIAL_PLACEHOLDERS } from '@/data/siteContent';

export default function Testimonials() {
  return (
    <section id="reviews" className="scroll-mt-24 bg-neutral-100/60 py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-6 sm:px-10">
        <Reveal className="mx-auto max-w-2xl text-center">
          <p className="eyebrow">গ্রাহকের মতামত</p>
          <h2 className="mt-5 text-3xl font-bold tracking-tight sm:text-4xl">
            গ্রাহকদের অভিজ্ঞতা
          </h2>
        </Reveal>

        <div className="mt-20 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {TESTIMONIAL_PLACEHOLDERS.map((item, index) => (
            <Reveal key={index} delay={index * 120}>
              <figure className="flex h-full flex-col rounded-[1.5rem] border border-dashed border-neutral-300 bg-neutral-50 p-6 transition duration-700 hover:border-neutral-400 hover:shadow-soft sm:p-8">
                <Quote className="h-6 w-6 text-primary-700" strokeWidth={1.5} />
                <blockquote className="mt-6 flex-1 text-base leading-[1.8] text-neutral-700">
                  {item.quote}
                </blockquote>
                <figcaption className="mt-8 border-t border-neutral-200 pt-5">
                  <p className="font-medium text-neutral-900">{item.name}</p>
                  <p className="mt-1 text-sm text-neutral-500">{item.meta}</p>
                </figcaption>
              </figure>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
