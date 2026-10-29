import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence, useScroll, useTransform, useReducedMotion } from 'framer-motion';

const AUTO_ADVANCE_MS = 6000;
const EASE = [0.22, 1, 0.36, 1];

const SLIDES = [
  {
    id: 'leak',
    image: '/images/hero-1-leak.webp',
    eyebrow: 'Burst Pipe? Act Fast.',
    headline: ['Pipe Burst?', "We're On", 'Our Way.'],
    copy: "Water spreading fast doesn't wait for business hours. Neither do we — emergency crews dispatch within the hour, any time, day or night.",
    fact: 'Avg. arrival: 47 minutes',
  },
  {
    id: 'heater',
    image: '/images/hero-2-heater.webp',
    eyebrow: 'No Hot Water?',
    headline: ['No Hot Water?', 'Fixed', 'Today.'],
    copy: 'Cold showers and a family waiting are a bad combo. Most water heater repairs and replacements are done same-day, upfront price before we start.',
    fact: '92% fixed same visit',
  },
  {
    id: 'drain',
    image: '/images/hero-3-drain.webp',
    eyebrow: 'Drain Backed Up?',
    headline: ['Drain Backed Up?', 'Cleared', 'Fast.'],
    copy: "Slow drains turn into backups when you least expect it. Camera inspection and hydro-jetting get to the real problem, not just a temporary fix.",
    fact: 'Same-day slots open daily',
  },
];

export default function Hero() {
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const timerRef = useRef(null);
  const sectionRef = useRef(null);
  const reduce = useReducedMotion();

  useEffect(() => {
    if (paused) return;
    timerRef.current = setInterval(() => setIndex((i) => (i + 1) % SLIDES.length), AUTO_ADVANCE_MS);
    return () => clearInterval(timerRef.current);
  }, [paused, index]);

  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ['start start', 'end start'] });
  const bgY = useTransform(scrollYProgress, [0, 1], ['0%', '8%']);
  const bgScale = useTransform(scrollYProgress, [0, 1], [1, 1.12]);
  const contentY = useTransform(scrollYProgress, [0, 1], [0, -90]);
  const contentOpacity = useTransform(scrollYProgress, [0, 0.65], [1, 0]);

  const bgStyle = reduce ? undefined : { y: bgY, scale: bgScale };
  const contentStyle = reduce ? undefined : { y: contentY, opacity: contentOpacity };
  const dur = (seconds) => (reduce ? 0 : seconds);

  const slide = SLIDES[index];

  return (
    <section
      id="overview"
      ref={sectionRef}
      className="screen relative flex items-center overflow-hidden bg-text-dark"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      <motion.div className="absolute inset-x-0 -top-[10%] -bottom-[10%] z-0" style={bgStyle}>
        {SLIDES.map((s, i) => (
          <motion.img
            key={s.id}
            src={s.image}
            alt=""
            aria-hidden="true"
            decoding="async"
            loading={i === 0 ? 'eager' : 'lazy'}
            fetchpriority={i === 0 ? 'high' : 'auto'}
            className="absolute inset-0 w-full h-full object-cover"
            initial={false}
            animate={{ opacity: i === index ? 1 : 0, scale: reduce ? 1 : i === index ? 1.08 : 1 }}
            transition={{
              opacity: { duration: dur(1) },
              scale: { duration: dur(i === index ? AUTO_ADVANCE_MS / 1000 + 1 : 1.2), ease: 'linear' },
            }}
          />
        ))}
        <div className="absolute inset-0 bg-gradient-to-r from-black/75 via-black/40 to-black/10" />
        <div className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-black/50 to-transparent" />
      </motion.div>

      <motion.div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-10 w-full py-14 lg:py-24" style={contentStyle}>
        <div className="max-w-2xl">
          <AnimatePresence mode="wait">
            <motion.div key={slide.id} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0, y: -16 }} transition={{ duration: dur(0.4) }}>
              <motion.div
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: dur(0.5), ease: EASE }}
                className="inline-flex items-center gap-2 px-4 py-1.5 bg-black/40 backdrop-blur-sm border border-white/30 rounded-full mb-4 lg:mb-6"
              >
                <span className="w-2 h-2 rounded-full bg-brand-light animate-pulse" />
                <span className="text-white font-bold text-xs tracking-wide uppercase" style={{ textShadow: '0 1px 4px rgba(0,0,0,0.8)' }}>{slide.eyebrow}</span>
              </motion.div>

              <h1 className="text-4xl sm:text-6xl lg:text-7xl font-bold text-white leading-[1.05] mb-4 lg:mb-6" style={{ textShadow: '0 2px 20px rgba(0,0,0,0.6)' }}>
                {slide.headline.map((line, i) => (
                  <span key={line} className="block overflow-hidden pb-[0.08em]">
                    <motion.span
                      className={`block ${i === slide.headline.length - 1 ? 'text-brand-light' : ''}`}
                      initial={{ y: '105%' }}
                      animate={{ y: 0 }}
                      transition={{ duration: dur(0.75), ease: EASE, delay: reduce ? 0 : 0.1 + i * 0.12 }}
                    >
                      {line}
                    </motion.span>
                  </span>
                ))}
              </h1>

              <motion.p
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: dur(0.6), ease: EASE, delay: reduce ? 0 : 0.5 }}
                className="text-white font-medium text-base lg:text-lg leading-relaxed mb-5 lg:mb-8 max-w-md"
                style={{ textShadow: '0 1px 8px rgba(0,0,0,0.8)' }}
              >
                {slide.copy}
              </motion.p>

              <motion.div
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: dur(0.6), ease: EASE, delay: reduce ? 0 : 0.65 }}
                className="inline-flex items-center gap-2.5 bg-black/40 backdrop-blur-sm border border-white/30 rounded-full px-4 py-2 mb-6 lg:mb-10"
              >
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#22D3EE" strokeWidth="2.5">
                  <circle cx="12" cy="12" r="10"/><path d="M12 6v6l4 2"/>
                </svg>
                <span className="text-white text-sm font-semibold" style={{ textShadow: '0 1px 4px rgba(0,0,0,0.8)' }}>{slide.fact}</span>
              </motion.div>
            </motion.div>
          </AnimatePresence>

          <div className="flex flex-col sm:flex-row gap-4">
            <a href="#contact" className="btn-primary text-sm px-8 py-4">
              Book a Plumber Today
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <path d="M5 12h14M12 5l7 7-7 7"/>
              </svg>
            </a>
            <a href="tel:+16025550147" className="flex items-center gap-3 text-white hover:text-brand-light transition-colors">
              <div className="w-11 h-11 border border-white/40 rounded-lg flex items-center justify-center bg-black/30 backdrop-blur-sm">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.13 12 19.79 19.79 0 0 1 1.06 3.36 2 2 0 0 1 3.04 1h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L7.09 8.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z"/>
                </svg>
              </div>
              <div>
                <p className="text-xs text-white/80 font-medium" style={{ textShadow: '0 1px 4px rgba(0,0,0,0.8)' }}>24/7 Emergency Line</p>
                <p className="text-sm font-bold" style={{ textShadow: '0 1px 4px rgba(0,0,0,0.8)' }}>(602) 555-0147</p>
              </div>
            </a>
          </div>
        </div>
      </motion.div>

      <div className="absolute bottom-24 lg:bottom-8 left-6 lg:left-10 z-20 flex items-center gap-4">
        {SLIDES.map((s, i) => (
          <button key={s.id} onClick={() => setIndex(i)} className="relative h-1 w-10 rounded-full bg-white/25 overflow-hidden" aria-label={`Show slide ${i + 1}`}>
            <span className="absolute inset-0 bg-white/25" />
            {i === index && !paused && (
              <motion.div
                key={`progress-${index}`}
                className="absolute inset-y-0 left-0 bg-brand-light rounded-full"
                initial={{ width: '0%' }}
                animate={{ width: '100%' }}
                transition={{ duration: AUTO_ADVANCE_MS / 1000, ease: 'linear' }}
              />
            )}
            {i === index && paused && <span className="absolute inset-y-0 left-0 bg-brand-light rounded-full w-1/3" />}
          </button>
        ))}
      </div>

      <div className="absolute bottom-8 right-6 lg:right-10 z-20 hidden sm:flex flex-col items-center gap-2 text-white/70" aria-hidden="true">
        <span className="text-[10px] tracking-[0.25em] uppercase">Scroll</span>
        <span className="relative block w-px h-12 bg-white/25 overflow-hidden">
          <motion.span
            className="absolute inset-x-0 top-0 h-5 bg-brand-light"
            animate={reduce ? undefined : { y: ['-100%', '240%'] }}
            transition={{ duration: 1.8, repeat: Infinity, ease: 'easeInOut' }}
          />
        </span>
      </div>
    </section>
  );
}
