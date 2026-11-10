import { Droplet, Heart, Leaf, Sparkles } from 'lucide-react';
import Reveal from '@/components/Reveal';

const BENEFITS = [
  {
    icon: Leaf,
    title: 'কোমল উপাদান',
    text: 'সংবেদনশীল ত্বকের কথা ভেবে হালকা ও আরামদায়ক ফর্মুলার পণ্য বাছাই করা হয়।',
  },
  {
    icon: Droplet,
    title: 'নিরাপদ ব্যবহার',
    text: 'নতুন পণ্য শুরুর আগে প্যাচ টেস্ট করার পরামর্শ দেওয়া হয়, যাতে ব্যবহার নিশ্চিন্তে হয়।',
  },
  {
    icon: Sparkles,
    title: 'সব বয়সের জন্য',
    text: 'কিশোর বয়স থেকে পরিণত বয়স পর্যন্ত, প্রতিটি ত্বকের ধরন অনুযায়ী পণ্য বেছে নেওয়ার সুযোগ।',
  },
  {
    icon: Heart,
    title: 'সহজ রুটিন',
    text: 'কয়েকটি ধাপেই সকাল ও রাতের যত্ন সম্পন্ন করা যায়, যাতে নিয়মিত থাকা সহজ হয়।',
  },
];

export default function Benefits() {
  return (
    <section id="benefits" className="scroll-mt-24 bg-neutral-900 py-24 text-neutral-50 sm:py-32">
      <div className="mx-auto max-w-7xl px-6 sm:px-10">
        <Reveal className="max-w-2xl">
          <p className="text-xs font-medium uppercase tracking-[0.28em] text-primary-300">কেন ZN Gallary</p>
          <h2 className="mt-5 text-3xl font-bold tracking-tight text-neutral-50 sm:text-4xl">
            আপনার ত্বকের প্রয়োজনে মনোযোগী পছন্দ
          </h2>
          <p className="mt-5 text-base leading-[1.8] text-neutral-400">
            নির্বাচিত উপাদান, সহজ ব্যবহার এবং প্রয়োজনে সরাসরি সহায়তা, এই তিনটি বিষয়ে আমরা মনোযোগ দিই।
          </p>
        </Reveal>

        <div className="mt-20 grid gap-x-10 gap-y-14 sm:grid-cols-2 lg:grid-cols-4">
          {BENEFITS.map((benefit, index) => (
            <Reveal key={benefit.title} delay={index * 100}>
              <div className="h-full border-t border-white/15 pt-8">
                <benefit.icon className="h-5 w-5 text-primary-300" strokeWidth={1.5} />
                <h3 className="mt-6 text-base font-semibold text-neutral-50">{benefit.title}</h3>
                <p className="mt-3 text-sm leading-[1.8] text-neutral-400">{benefit.text}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
