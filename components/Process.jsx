import { useRef } from 'react';
import { motion, useScroll, useTransform, useReducedMotion } from 'framer-motion';

const EASE = [0.22, 1, 0.36, 1];

const container = { hidden: {}, show: { transition: { staggerChildren: 0.14, delayChildren: 0.15 } } };
const rise = { hidden: { opacity: 0, y: 40 }, show: { opacity: 1, y: 0, transition: { duration: 0.85, ease: EASE } } };
const mask = { hidden: { y: '110%' }, show: { y: 0, transition: { duration: 0.95, ease: EASE } } };
const grow = { hidden: { scaleX: 0 }, show: { scaleX: 1, transition: { duration: 1.1, ease: EASE } } };

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

function Step({ step, index }) {
  const ref = useRef(null);
  const reduce = useReducedMotion();
  const imageLeft = index % 2 === 0;

  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] });
  const imgY = useTransform(scrollYProgress, [0, 1], ['-10%', '10%']);
  const imgScale = useTransform(scrollYProgress, [0, 0.5, 1], [1.25, 1.1, 1.05]);

  const hiddenClip = imageLeft ? 'inset(0% 100% 0% 0%)' : 'inset(0% 0% 0% 100%)';

  return (
    <div ref={ref} className={`grid lg:grid-cols-2 min-h-[85vh] ${index % 2 === 0 ? 'bg-brand' : 'bg-brand-dark'}`}>
      <motion.div
        className={`relative overflow-hidden min-h-[48vh] lg:min-h-0 ${imageLeft ? 'lg:order-1' : 'lg:order-2'}`}
        variants={{ hidden: {}, show: {} }}
        initial={reduce ? 'show' : 'hidden'}
        whileInView="show"
        viewport={{ once: true, amount: 0.2 }}
      >
        <motion.div
          className="absolute inset-0"
          variants={{
            hidden: { clipPath: hiddenClip },
            show: { clipPath: 'inset(0% 0% 0% 0%)', transition: { duration: 1.2, ease: EASE } },
          }}
        >
          <motion.img
            src={step.image}
            alt={step.title}
            decoding="async"
            loading={index === 0 ? 'eager' : 'lazy'}
            className="absolute inset-x-0 -top-[12%] w-full h-[124%] object-cover"
            style={reduce ? undefined : { y: imgY, scale: imgScale }}
          />
        </motion.div>
      </motion.div>

      <div className={`relative flex items-center px-6 lg:px-16 py-16 lg:py-0 ${imageLeft ? 'lg:order-2' : 'lg:order-1'}`}>
        <motion.div
          className="max-w-md w-full"
          variants={container}
          initial={reduce ? 'show' : 'hidden'}
          whileInView="show"
          viewport={{ once: true, amount: 0.4 }}
        >
          <motion.span
            variants={rise}
            className="block font-display font-bold text-8xl lg:text-9xl leading-none mb-2"
            style={{ color: 'transparent', WebkitTextStroke: '1.5px rgba(255,255,255,0.75)' }}
          >
            {step.num}
          </motion.span>

          <motion.div variants={grow} className="h-px bg-white/50 origin-left mb-6" />

          <h3 className="overflow-hidden pb-1 mb-4">
            <motion.span variants={mask} className="block font-display font-bold text-3xl lg:text-4xl text-white leading-tight">
              {step.title}
            </motion.span>
          </h3>

          <motion.p variants={rise} className="text-white/85 text-base lg:text-lg leading-relaxed">
            {step.desc}
          </motion.p>
        </motion.div>
      </div>
    </div>
  );
}

export default function Process() {
  const reduce = useReducedMotion();

  return (
    <section id="process" className="relative bg-brand">
      <div className="max-w-7xl mx-auto px-6 pt-24 pb-14 lg:pt-32 lg:pb-20">
        <motion.div
          variants={container}
          initial={reduce ? 'show' : 'hidden'}
          whileInView="show"
          viewport={{ once: true, amount: 0.5 }}
          className="max-w-3xl"
        >
          <motion.p variants={rise} className="text-cyan-200 font-bold text-xs tracking-[0.2em] uppercase mb-4">How It Works</motion.p>
          <h2 className="overflow-hidden pb-2">
            <motion.span variants={mask} className="block font-display font-bold text-4xl sm:text-5xl lg:text-7xl text-white leading-[1.05]">
              Simple from start to finish.
            </motion.span>
          </h2>
          <motion.p variants={rise} className="text-white/80 text-lg leading-relaxed mt-6 max-w-xl">
            No confusion, no surprises. Here is exactly what happens when you call SwiftFlow.
          </motion.p>
        </motion.div>
      </div>

      {STEPS.map((s, i) => (
        <Step key={s.num} step={s} index={i} />
      ))}
    </section>
  );
}
