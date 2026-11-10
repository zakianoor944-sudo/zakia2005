import { useState } from 'react';
import { ChevronDown } from 'lucide-react';
import Reveal from '@/components/Reveal';
import { FAQ_ITEMS } from '@/data/siteContent';

export default function Faq() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section id="faq" className="scroll-mt-24 py-24 sm:py-32">
      <div className="mx-auto grid max-w-7xl gap-16 px-6 sm:px-10 lg:grid-cols-12 lg:gap-20">
        <Reveal className="lg:col-span-4">
          <p className="eyebrow">সাধারণ প্রশ্ন</p>
          <h2 className="mt-5 text-3xl font-bold tracking-tight sm:text-4xl">
            প্রশ্নের উত্তর
          </h2>
          <p className="mt-5 text-base leading-[1.8] text-neutral-600">
            এখানে উত্তর না পেলে নিচের যোগাযোগের তথ্যে আমাদের সাথে কথা বলুন।
          </p>
        </Reveal>

        <div className="lg:col-span-8">
          {FAQ_ITEMS.map((item, index) => {
            const isOpen = openIndex === index;
            return (
              <Reveal key={item.question} delay={index * 60}>
                <div className="border-b border-neutral-200 first:border-t">
                  <button
                    type="button"
                    onClick={() => setOpenIndex(isOpen ? null : index)}
                    aria-expanded={isOpen}
                    className="flex w-full items-center justify-between gap-6 py-7 text-left transition-colors duration-500 hover:text-primary-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500"
                  >
                    <span className="text-base font-medium text-neutral-900 sm:text-lg">{item.question}</span>
                    <span
                      className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-full border transition duration-500 ${
                        isOpen ? 'rotate-180 border-primary-700 bg-primary-700 text-neutral-50' : 'border-neutral-300 text-neutral-700'
                      }`}
                    >
                      <ChevronDown className="h-4 w-4" />
                    </span>
                  </button>
                  <div
                    className={`grid transition-all duration-500 ease-out ${
                      isOpen ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0'
                    }`}
                  >
                    <div className="overflow-hidden">
                      <p className="pb-7 pr-12 text-base leading-[1.8] text-neutral-600">{item.answer}</p>
                    </div>
                  </div>
                </div>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
