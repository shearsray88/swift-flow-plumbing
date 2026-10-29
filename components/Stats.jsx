import { useEffect, useRef, useState } from 'react';
import { motion, animate, useInView, useScroll, useTransform, useReducedMotion } from 'framer-motion';

const STATS = [
  { to: 47, suffix: ' min', label: 'Average arrival time' },
  { to: 92, suffix: '%', label: 'Fixed on the first visit' },
  { to: 4.9, decimals: 1, suffix: '', label: 'Rating from 214 Google reviews' },
  { to: 6, suffix: ' yr', label: 'Warranty on new water heaters' },
];

function Counter({ to, decimals = 0, suffix = '' }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '0px 0px -20% 0px' });
  const reduce = useReducedMotion();
  const [value, setValue] = useState(0);

  useEffect(() => {
    if (!inView) return;
    if (reduce) {
      setValue(to);
      return;
    }
    const controls = animate(0, to, {
      duration: 1.8,
      ease: [0.16, 1, 0.3, 1],
      onUpdate: (v) => setValue(v),
    });
    return () => controls.stop();
  }, [inView, reduce, to]);

  return (
    <span ref={ref}>
      {value.toFixed(decimals)}
      {suffix}
    </span>
  );
}

export default function Stats() {
  const ref = useRef(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] });
  const bgY = useTransform(scrollYProgress, [0, 1], ['-8%', '8%']);

  return (
    <section ref={ref} className="relative overflow-hidden bg-text-dark py-24 lg:py-32">
      <motion.img
        src="/images/stats-bg.webp"
        alt=""
        aria-hidden="true"
        loading="lazy"
        decoding="async"
        className="absolute inset-x-0 -top-[10%] w-full h-[120%] object-cover"
        style={reduce ? undefined : { y: bgY }}
      />
      <div className="absolute inset-0 bg-text-dark/70" />

      <div className="relative max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-y-12">
          {STATS.map((s, i) => (
            <motion.div
              key={s.label}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-10% 0px' }}
              transition={{ duration: reduce ? 0 : 0.6, delay: reduce ? 0 : i * 0.12, ease: [0.22, 1, 0.36, 1] }}
              className={`px-4 lg:px-8 ${i % 2 === 1 ? 'border-l border-white/15' : ''} ${i > 0 ? 'lg:border-l lg:border-white/15' : ''}`}
            >
              <p className="font-display font-bold text-4xl sm:text-5xl lg:text-7xl text-white leading-none mb-3 tabular-nums whitespace-nowrap">
                <Counter to={s.to} decimals={s.decimals} suffix={s.suffix} />
              </p>
              <p className="text-brand-light text-xs lg:text-sm font-semibold tracking-wide uppercase">{s.label}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
