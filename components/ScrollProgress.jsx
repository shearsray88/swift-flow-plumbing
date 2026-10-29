import { useEffect, useState } from 'react';
import { motion, useScroll, useSpring, useTransform, useMotionValueEvent, useReducedMotion } from 'framer-motion';

const STOPS = [
  { id: 'overview', label: 'Overview' },
  { id: 'services', label: 'Services' },
  { id: 'process', label: 'Process' },
  { id: 'results', label: 'Results' },
  { id: 'reviews', label: 'Reviews' },
  { id: 'contact', label: 'Contact' },
  { id: 'coverage', label: 'Coverage' },
];

export default function ScrollProgress() {
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll();
  const smooth = useSpring(scrollYProgress, { stiffness: 140, damping: 28, restDelta: 0.0005 });
  const fillHeight = useTransform(smooth, (v) => `${Math.min(1, Math.max(0, v)) * 100}%`);
  const headTop = useTransform(smooth, (v) => `${Math.min(1, Math.max(0, v)) * 100}%`);

  const [marks, setMarks] = useState([]);
  const [reached, setReached] = useState(0);

  useEffect(() => {
    const measure = () => {
      const max = document.documentElement.scrollHeight - window.innerHeight;
      if (max <= 0) return;
      const next = STOPS.map((s) => {
        const el = document.getElementById(s.id);
        if (!el) return null;
        const top = el.getBoundingClientRect().top + window.scrollY;
        return { ...s, pos: Math.min(1, Math.max(0, top / max)) };
      }).filter(Boolean);
      setMarks(next);
    };
    measure();
    const t1 = setTimeout(measure, 600);
    const t2 = setTimeout(measure, 2000);
    window.addEventListener('resize', measure);
    window.addEventListener('load', measure);
    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      window.removeEventListener('resize', measure);
      window.removeEventListener('load', measure);
    };
  }, []);

  useMotionValueEvent(scrollYProgress, 'change', (v) => {
    let count = 0;
    for (let i = 0; i < marks.length; i += 1) {
      if (v >= marks[i].pos - 0.002) count = i + 1;
    }
    setReached((prev) => (prev === count ? prev : count));
  });

  return (
    <div className="fixed z-[60] right-1.5 lg:right-4 top-6 bottom-24 lg:bottom-6 w-2 pointer-events-none" aria-hidden="false">
      <div className="absolute inset-0 rounded-full bg-white/30 ring-1 ring-black/25 shadow-[0_0_0_1px_rgba(255,255,255,0.15)]" />

      <motion.div
        className="absolute left-0 right-0 top-0 rounded-full overflow-hidden"
        style={{ height: fillHeight, background: 'linear-gradient(180deg, #0891B2, #22D3EE)', boxShadow: '0 0 10px rgba(34,211,238,0.7)' }}
      >
        <motion.div
          className="absolute inset-0 opacity-70"
          style={{ backgroundImage: 'repeating-linear-gradient(180deg, rgba(255,255,255,0.75) 0 5px, transparent 5px 16px)', backgroundSize: '100% 16px' }}
          animate={reduce ? undefined : { backgroundPositionY: ['0px', '16px'] }}
          transition={reduce ? undefined : { duration: 0.9, repeat: Infinity, ease: 'linear' }}
        />
      </motion.div>

      <motion.span
        className="absolute left-1/2 w-3.5 h-3.5 -ml-[7px] -mt-[7px] rounded-full bg-white border-2 border-brand-light"
        style={{ top: headTop, boxShadow: '0 0 14px 3px rgba(34,211,238,0.85)' }}
      />

      {marks.map((m, i) => {
        const lit = i < reached;
        return (
          <a
            key={m.id}
            href={`#${m.id}`}
            aria-label={`Go to ${m.label}`}
            className="group absolute left-1/2 -ml-[9px] -mt-[9px] w-[18px] h-[18px] flex items-center justify-center pointer-events-auto focus-visible:outline-none"
            style={{ top: `${m.pos * 100}%` }}
          >
            <span
              className={`block w-3 h-3 rounded-full border-2 transition-colors duration-300 group-focus-visible:ring-2 group-focus-visible:ring-brand-light ${
                lit ? 'bg-brand-light border-white' : 'bg-white/70 border-text-dark/50'
              }`}
              style={lit ? { boxShadow: '0 0 8px rgba(34,211,238,0.9)' } : undefined}
            />
            <span className="hidden lg:block absolute right-6 top-1/2 -translate-y-1/2 whitespace-nowrap text-[11px] font-semibold tracking-wide text-white bg-text-dark/85 px-2 py-1 rounded opacity-0 group-hover:opacity-100 group-focus-visible:opacity-100 transition-opacity">
              {m.label}
            </span>
          </a>
        );
      })}
    </div>
  );
}
