import Reveal from '@/components/Reveal';
import { ABOUT_COPY } from '@/data/siteContent';

export default function About() {
  return (
    <section id="about" className="scroll-mt-24 py-24 sm:py-32">
      <div className="mx-auto grid max-w-7xl gap-12 px-6 sm:px-10 lg:grid-cols-12 lg:gap-20">
        <Reveal className="lg:col-span-5">
          <p className="eyebrow">আমাদের সম্পর্কে</p>
          <h2 className="mt-5 text-3xl font-bold tracking-tight sm:text-4xl">যত্ন হোক প্রতিদিনের অভ্যাস</h2>
        </Reveal>

        <Reveal delay={150} className="lg:col-span-7">
          <div className="space-y-6 text-base leading-[1.8] text-neutral-600 sm:text-lg">
            <p>{ABOUT_COPY.intro}</p>
            <p>{ABOUT_COPY.belief}</p>
            <p className="border-l-2 border-primary-200 pl-5 text-neutral-500">{ABOUT_COPY.story}</p>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
