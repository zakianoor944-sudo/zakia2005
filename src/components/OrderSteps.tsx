import { ClipboardList, PackageCheck, ShoppingBag } from 'lucide-react';
import Reveal from '@/components/Reveal';

const STEPS = [
  {
    icon: ShoppingBag,
    title: 'পণ্য বেছে নিন',
    text: 'আপনার ত্বকের প্রয়োজন অনুযায়ী পণ্যের বিবরণ পড়ে কার্টে যোগ করুন।',
  },
  {
    icon: ClipboardList,
    title: 'তথ্য দিয়ে নিশ্চিত করুন',
    text: 'কার্ট থেকে নাম, মোবাইল নম্বর ও ঠিকানা দিয়ে অর্ডার জমা দিন।',
  },
  {
    icon: PackageCheck,
    title: 'আমাদের সাথে যোগাযোগ',
    text: 'আমরা আপনার দেওয়া নম্বরে যোগাযোগ করে অর্ডারটি নিশ্চিত করব।',
  },
];

export default function OrderSteps() {
  return (
    <section id="order-steps" className="scroll-mt-24 py-24 sm:py-32">
      <div className="mx-auto grid max-w-7xl items-center gap-16 px-6 sm:px-10 lg:grid-cols-12 lg:gap-20">
        <Reveal className="lg:col-span-5">
          <img
            src="https://images.pexels.com/photos/4672615/pexels-photo-4672615.jpeg?auto=compress&cs=tinysrgb&h=650&w=940"
            alt="সকালের স্কিন কেয়ার রুটিনে ফেসক্রিম ব্যবহার"
            loading="lazy"
            className="aspect-[4/5] w-full rounded-[1.5rem] object-cover shadow-soft"
          />
        </Reveal>

        <div className="lg:col-span-7">
          <Reveal>
            <p className="eyebrow">অর্ডার পদ্ধতি</p>
            <h2 className="mt-5 text-3xl font-bold tracking-tight sm:text-4xl">
              তিন ধাপে অর্ডার করুন
            </h2>
          </Reveal>

          <ol className="mt-14 divide-y divide-neutral-200 border-y border-neutral-200">
            {STEPS.map((step, index) => (
              <Reveal key={step.title} delay={index * 120}>
                <li className="group flex gap-6 py-8 transition-colors duration-500">
                  <span className="font-serif text-3xl font-medium text-neutral-400 transition-colors duration-500 group-hover:text-primary-700">
                    {String(index + 1).padStart(2, '0')}
                  </span>
                  <div>
                    <div className="flex items-center gap-3">
                      <step.icon className="h-4 w-4 text-primary-700" strokeWidth={1.5} />
                      <h3 className="text-lg font-semibold">{step.title}</h3>
                    </div>
                    <p className="mt-2 text-base leading-[1.8] text-neutral-600">{step.text}</p>
                  </div>
                </li>
              </Reveal>
            ))}
          </ol>

          <Reveal delay={400}>
            <a href="#products" className="btn-primary mt-12">
              এখনই পণ্য দেখুন
            </a>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
