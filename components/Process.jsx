import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const STEPS = [
  {
    num: '01',
    title: 'Call or Book Online',
    desc: 'Call us anytime or fill out our quick form. We confirm your appointment within 15 minutes and give you a clear arrival window.',
    image: 'https://images.unsplash.com/photo-1603796846097-bee99e4a601f?w=800&q=80',
  },
  {
    num: '02',
    title: 'We Diagnose the Problem',
    desc: 'Our licensed plumber arrives on time, inspects the issue, and gives you a clear written quote before any work begins. No surprises.',
    image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&q=80',
  },
  {
    num: '03',
    title: 'We Fix It Right',
    desc: 'Work begins only after you approve the quote. We use quality parts, work cleanly, and finish the job properly the first time.',
    image: 'https://images.unsplash.com/photo-1504328345606-18bbc8c9d7d1?w=800&q=80',
  },
  {
    num: '04',
    title: 'Guaranteed & Inspected',
    desc: 'Every job comes with a written warranty. We do a final walkthrough with you before we leave so you know exactly what was done.',
    image: 'https://images.unsplash.com/photo-1607472586893-edb57bdc0e39?w=800&q=80',
  },
];

export default function Process() {
  const [active, setActive] = useState(0);
  const stepRefs = useRef([]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const idx = Number(entry.target.dataset.index);
            setActive(idx);
          }
        });
      },
      { rootMargin: '-40% 0px -40% 0px', threshold: 0 }
    );

    stepRefs.current.forEach((el) => el && observer.observe(el));
    return () => observer.disconnect();
  }, []);

  return (
    <section id="process" className="py-24 bg-brand relative overflow-hidden">
      <div className="absolute top-0 left-0 w-96 h-96 bg-white/5 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2" />
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-white/5 rounded-full blur-3xl translate-x-1/2 translate-y-1/2" />

      <div className="relative max-w-7xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <p className="inline-block text-cyan-300 font-bold text-xs tracking-[0.2em] uppercase mb-4">How It Works</p>
          <h2 className="font-display font-bold text-4xl sm:text-5xl text-white mb-4">
            Simple from start to finish.
          </h2>
          <p className="text-white/70 max-w-lg mx-auto">
            No confusion, no surprises. Here is exactly what happens when you call SwiftFlow.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16">
          {/* Sticky visual — desktop only */}
          <div className="hidden lg:block sticky top-24 h-fit">
            <div className="relative rounded-2xl overflow-hidden border border-white/20" style={{ aspectRatio: '4/5' }}>
              <AnimatePresence mode="sync">
                <motion.img
                  key={STEPS[active].num}
                  src={STEPS[active].image}
                  alt={STEPS[active].title}
                  initial={{ opacity: 0, scale: 1.05 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.6 }}
                  className="absolute inset-0 w-full h-full object-cover"
                  style={{ filter: 'grayscale(20%)' }}
                />
              </AnimatePresence>
              <div className="absolute inset-x-0 bottom-0 p-6" style={{ background: 'linear-gradient(to top, rgba(0,0,0,0.75), transparent)' }}>
                <span className="font-display font-bold text-3xl text-white block mb-1">{STEPS[active].num}</span>
                <p className="font-bold text-white text-lg">{STEPS[active].title}</p>
              </div>
            </div>
          </div>

          {/* Step list */}
          <div className="flex flex-col gap-3">
            {STEPS.map((s, i) => {
              const isActive = active === i;
              return (
                <div
                  key={s.num}
                  ref={(el) => (stepRefs.current[i] = el)}
                  data-index={i}
                  onClick={() => setActive(i)}
                  className={`p-6 lg:p-7 rounded-2xl border cursor-pointer transition-all duration-300 ${
                    isActive ? 'bg-white/10 border-white/25' : 'border-transparent hover:bg-white/5'
                  }`}
                >
                  <div className="flex items-center gap-4 mb-3">
                    <div className={`w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0 border transition-colors duration-300 ${
                      isActive ? 'bg-white border-white' : 'bg-white/10 border-white/20'
                    }`}>
                      <span className={`font-display font-bold text-lg transition-colors duration-300 ${isActive ? 'text-brand' : 'text-white'}`}>{s.num}</span>
                    </div>
                    <h3 className="font-sans font-bold text-white text-lg">{s.title}</h3>
                  </div>
                  <p className="text-white/70 text-sm leading-relaxed lg:pl-16">{s.desc}</p>

                  {/* Mobile: inline image since sticky visual is hidden */}
                  <div className="lg:hidden mt-4 rounded-xl overflow-hidden" style={{ aspectRatio: '16/9' }}>
                    <img src={s.image} alt={s.title} className="w-full h-full object-cover" style={{ filter: 'grayscale(20%)' }} />
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}