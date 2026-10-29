import { useRef, useState, useEffect } from 'react';
import { motion, animate, useInView, useMotionValue, useTransform, useReducedMotion } from 'framer-motion';

const EASE = [0.22, 1, 0.36, 1];

export default function BeforeAfter() {
  const reduce = useReducedMotion();
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, amount: 0.5 });
  const pos = useMotionValue(50);
  const [dragging, setDragging] = useState(false);
  const [touched, setTouched] = useState(false);
  const sweep = useRef(null);

  const clip = useTransform(pos, (v) => `inset(0 ${100 - v}% 0 0)`);
  const left = useTransform(pos, (v) => `${v}%`);
  const beforeOpacity = useTransform(pos, [4, 16], [0, 1]);
  const afterOpacity = useTransform(pos, [84, 96], [1, 0]);

  useEffect(() => {
    if (!inView || reduce) return undefined;
    sweep.current = animate(pos, [50, 14, 86, 50], { duration: 3.6, ease: 'easeInOut', delay: 0.5 });
    return () => sweep.current && sweep.current.stop();
  }, [inView, reduce, pos]);

  const setFromEvent = (e) => {
    const rect = ref.current.getBoundingClientRect();
    const v = ((e.clientX - rect.left) / rect.width) * 100;
    pos.set(Math.min(100, Math.max(0, v)));
  };

  const onPointerDown = (e) => {
    if (sweep.current) sweep.current.stop();
    setDragging(true);
    setTouched(true);
    e.currentTarget.setPointerCapture(e.pointerId);
    setFromEvent(e);
  };
  const onPointerMove = (e) => {
    if (dragging) setFromEvent(e);
  };
  const onPointerUp = (e) => {
    setDragging(false);
    if (e.currentTarget.hasPointerCapture(e.pointerId)) e.currentTarget.releasePointerCapture(e.pointerId);
  };

  const onKeyDown = (e) => {
    const step = e.shiftKey ? 15 : 5;
    let next = null;
    if (e.key === 'ArrowLeft') next = pos.get() - step;
    if (e.key === 'ArrowRight') next = pos.get() + step;
    if (e.key === 'Home') next = 0;
    if (e.key === 'End') next = 100;
    if (next === null) return;
    e.preventDefault();
    if (sweep.current) sweep.current.stop();
    setTouched(true);
    pos.set(Math.min(100, Math.max(0, next)));
  };

  return (
    <section id="results" className="screen relative bg-text-dark overflow-hidden">
      <div
        ref={ref}
        className="absolute inset-0 cursor-ew-resize select-none"
        style={{ touchAction: 'pan-y' }}
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={onPointerUp}
        onPointerCancel={onPointerUp}
      >
        <img
          src="/images/result-after.webp"
          alt="Under-sink plumbing after repair: new copper pipes, dry cabinet"
          draggable={false}
          loading="lazy"
          decoding="async"
          className="absolute inset-0 w-full h-full object-cover pointer-events-none"
        />
        <motion.img
          src="/images/result-before.webp"
          alt="Under-sink plumbing before repair: corroded pipe leaking into the cabinet"
          draggable={false}
          loading="lazy"
          decoding="async"
          className="absolute inset-0 w-full h-full object-cover pointer-events-none"
          style={{ clipPath: clip }}
        />

        <div className="absolute inset-x-0 top-0 h-2/5 bg-gradient-to-b from-black/65 via-black/25 to-transparent pointer-events-none" />
        <div className="absolute inset-x-0 bottom-0 h-1/4 bg-gradient-to-t from-black/45 to-transparent pointer-events-none" />

        <motion.div className="absolute inset-y-0 w-0.5 bg-white pointer-events-none" style={{ left, boxShadow: '0 0 18px rgba(34,211,238,0.9)' }} />

        <motion.div
          className="absolute top-1/2 w-12 h-12 -ml-6 -mt-6 rounded-full bg-white flex items-center justify-center focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-brand-light/70"
          style={{ left, boxShadow: '0 4px 24px rgba(0,0,0,0.45), 0 0 0 5px rgba(255,255,255,0.25)' }}
          role="slider"
          tabIndex={0}
          aria-label="Compare before and after"
          aria-valuemin={0}
          aria-valuemax={100}
          aria-valuenow={Math.round(pos.get())}
          onKeyDown={onKeyDown}
        >
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#0E7490" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round">
            <path d="M8 6l-6 6 6 6" />
            <path d="M16 6l6 6-6 6" />
          </svg>
        </motion.div>

        <motion.span
          className="absolute bottom-8 left-6 lg:left-10 text-white font-bold text-xs lg:text-sm tracking-[0.25em] pointer-events-none"
          style={{ opacity: beforeOpacity, textShadow: '0 1px 8px rgba(0,0,0,0.8)' }}
        >
          BEFORE
        </motion.span>
        <motion.span
          className="absolute bottom-8 right-10 lg:right-14 text-brand-light font-bold text-xs lg:text-sm tracking-[0.25em] pointer-events-none"
          style={{ opacity: afterOpacity, textShadow: '0 1px 8px rgba(0,0,0,0.8)' }}
        >
          AFTER
        </motion.span>

        <motion.p
          className="absolute bottom-8 left-1/2 -translate-x-1/2 text-white/85 text-xs tracking-wide pointer-events-none whitespace-nowrap"
          style={{ textShadow: '0 1px 8px rgba(0,0,0,0.8)' }}
          animate={{ opacity: touched ? 0 : 1 }}
          transition={{ duration: 0.4 }}
        >
          Drag to compare
        </motion.p>
      </div>

      <motion.div
        className="relative z-10 px-6 lg:px-10 pt-10 lg:pt-14 pointer-events-none max-w-7xl mx-auto"
        initial={reduce ? false : { opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.8, ease: EASE }}
      >
        <span className="section-tag !text-brand-light">The Difference</span>
        <h2 className="font-display font-bold text-3xl sm:text-5xl lg:text-6xl text-white leading-[1.05] max-w-3xl" style={{ textShadow: '0 2px 20px rgba(0,0,0,0.6)' }}>
          From leaking to leak&#8209;free.
        </h2>
        <p className="text-white/85 text-base lg:text-lg mt-3 max-w-md" style={{ textShadow: '0 1px 8px rgba(0,0,0,0.7)' }}>
          Same cabinet, same day. Slide to see what a proper repair looks like.
        </p>
      </motion.div>
    </section>
  );
}
