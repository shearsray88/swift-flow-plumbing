import { useRef, useState } from 'react';
import { motion, AnimatePresence, useScroll, useMotionValueEvent, useReducedMotion } from 'framer-motion';

const STEPS = [
  {
    num: '01',
    title: 'Call or Book Online',
    desc: 'Call us anytime or fill out our quick form. We confirm your appointment within 15 minutes and give you a clear arrival window.',
    image: '/images/process-1-call.webp',
  },
  {
    num: '02',
    title: 'We Diagnose the Problem',
    desc: 'Our licensed plumber arrives on time, inspects the issue, and gives you a clear written quote before any work begins. No surprises.',
    image: '/images/process-2-diagnose.webp',
  },
  {
    num: '03',
    title: 'We Fix It Right',
    desc: 'Work begins only after you approve the quote. We use quality parts, work cleanly, and finish the job properly the first time.',
    image: '/images/process-3-fix.webp',
  },
  {
    num: '04',
    title: 'Guaranteed & Inspected',
    desc: 'Every job comes with a written warranty. We do a final walkthrough with you before we leave so you know exactly what was done.',
    image: '/images/process-4-done.webp',
  },
];

export default function Process() {
  const ref = useRef(null);
  const [active, setActive] = useState(0);
  const reduce = useReducedMotion();

  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end end'] });

  useMotionValueEvent(scrollYProgress, 'change', (v) => {
    const i = Math.min(STEPS.length - 1, Math.max(0, Math.floor(v * STEPS.length)));
    setActive(i);
  });

  const goTo = (i) => {
    const el = ref.current;
    if (!el) return;
    const top = el.getBoundingClientRect().top + window.scrollY;
    const scrollable = el.offsetHeight - window.innerHeight;
    window.scrollTo({
      top: top + ((i + 0.5) / STEPS.length) * scrollable,
      behavior: reduce ? 'auto' : 'smooth',
    });
  };

  return (
    <section
      id="process"
      ref={ref}
      className="relative bg-brand"
      style={{ height: `${STEPS.length * 75 + 25}vh` }}
    >
      <div className="sticky top-0 h-screen overflow-hidden grid grid-rows-[40svh_1fr] lg:grid-rows-1 lg:grid-cols-2">
        <div className="absolute top-0 left-0 w-96 h-96 bg-white/5 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2 pointer-events-none" />
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-white/5 rounded-full blur-3xl translate-x-1/2 translate-y-1/2 pointer-events-none" />

        <div className="relative order-1 lg:order-2 overflow-hidden">
          {STEPS.map((s, i) => (
            <motion.img
              key={s.image}
              src={s.image}
              alt={i === active ? s.title : ''}
              aria-hidden={i === active ? undefined : 'true'}
              decoding="async"
              loading={i === 0 ? 'eager' : 'lazy'}
              className="absolute inset-0 w-full h-full object-cover"
              initial={false}
              animate={{ opacity: i === active ? 1 : 0, scale: reduce ? 1 : i === active ? 1.06 : 1 }}
              transition={{
                opacity: { duration: reduce ? 0 : 0.7 },
                scale: { duration: reduce ? 0 : i === active ? 5 : 0.9, ease: 'easeOut' },
              }}
            />
          ))}
          <div className="absolute inset-0 bg-gradient-to-t from-brand via-transparent to-transparent lg:bg-gradient-to-r lg:from-brand lg:via-brand/10 lg:to-transparent" />
          <div className="absolute bottom-3 right-6 lg:bottom-10 lg:right-10 overflow-hidden" aria-hidden="true">
            <AnimatePresence mode="wait" initial={false}>
              <motion.span
                key={STEPS[active].num}
                initial={{ y: '100%' }}
                animate={{ y: 0 }}
                exit={{ y: '-100%' }}
                transition={{ duration: reduce ? 0 : 0.35, ease: [0.22, 1, 0.36, 1] }}
                className="block font-display font-bold text-6xl lg:text-8xl text-white/90 leading-none"
              >
                {STEPS[active].num}
              </motion.span>
            </AnimatePresence>
          </div>
        </div>

        <div className="relative order-2 lg:order-1 flex flex-col justify-center px-6 lg:px-14 pb-24 lg:pb-0 min-h-0">
          <p className="text-cyan-300 font-bold text-xs tracking-[0.2em] uppercase mb-2 lg:mb-4">How It Works</p>
          <h2 className="font-display font-bold text-2xl sm:text-3xl lg:text-5xl text-white leading-tight mb-5 lg:mb-10">
            Simple from start to finish.
          </h2>

          <div className="relative max-w-lg">
            <div className="absolute left-5 lg:left-6 top-5 bottom-5 w-px bg-white/20" aria-hidden="true" />
            <motion.div
              className="absolute left-5 lg:left-6 top-5 bottom-5 w-px bg-white origin-top"
              style={{ scaleY: scrollYProgress }}
              aria-hidden="true"
            />

            {STEPS.map((s, i) => {
              const reached = i <= active;
              const current = i === active;
              return (
                <button
                  key={s.num}
                  type="button"
                  onClick={() => goTo(i)}
                  className="relative flex gap-4 lg:gap-5 w-full text-left py-2.5 lg:py-3"
                >
                  <span
                    className={`relative z-10 w-10 h-10 lg:w-12 lg:h-12 rounded-xl flex items-center justify-center flex-shrink-0 border transition-colors duration-300 ${
                      reached ? 'bg-white border-white' : 'bg-brand border-white/30'
                    }`}
                  >
                    <span className={`font-display font-bold text-base lg:text-lg transition-colors duration-300 ${reached ? 'text-brand' : 'text-white'}`}>
                      {s.num}
                    </span>
                  </span>
                  <span className="flex-1 min-w-0">
                    <span className={`block font-bold text-base lg:text-lg leading-10 lg:leading-[3rem] -mt-0 transition-colors duration-300 ${current ? 'text-white' : 'text-white/60'}`}>
                      {s.title}
                    </span>
                    <AnimatePresence initial={false}>
                      {current && (
                        <motion.span
                          key="desc"
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: 'auto', opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: reduce ? 0 : 0.35 }}
                          className="block overflow-hidden"
                        >
                          <span className="block text-white/75 text-sm leading-relaxed pb-1">{s.desc}</span>
                        </motion.span>
                      )}
                    </AnimatePresence>
                  </span>
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
