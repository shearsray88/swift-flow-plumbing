import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const REVIEWS = [
  {
    name: 'Jennifer M.',
    location: 'Scottsdale, AZ',
    text: 'Called at 11pm for a burst pipe under my kitchen sink. SwiftFlow had someone at my door in under an hour and fixed it completely. Incredible service.',
    rating: 5,
  },
  {
    name: 'Carlos R.',
    location: 'Tempe, AZ',
    text: 'Got three quotes for a water heater replacement. SwiftFlow was the most upfront about pricing and finished the job the same day. No BS, just good work.',
    rating: 5,
  },
  {
    name: 'Lisa T.',
    location: 'Chandler, AZ',
    text: 'They found a slow leak behind my wall that two other plumbers missed. Fixed it cleanly, patched the drywall, and left my bathroom spotless. Highly recommend.',
    rating: 5,
  },
  {
    name: 'David K.',
    location: 'Mesa, AZ',
    text: 'Used SwiftFlow for a full bathroom remodel plumbing. On time every day, no surprises on the bill, and the quality of work was excellent. Will use again.',
    rating: 5,
  },
];

const AUTO_ADVANCE_MS = 7000;

export default function Reviews() {
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    if (paused) return;
    const t = setInterval(() => setIndex((i) => (i + 1) % REVIEWS.length), AUTO_ADVANCE_MS);
    return () => clearInterval(t);
  }, [paused, index]);

  const review = REVIEWS[index];

  return (
    <section id="reviews" className="screen flex items-center py-8 lg:py-12 bg-gray-warm">
      <div className="max-w-4xl mx-auto px-6 w-full">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-5 lg:mb-12"
        >
          <span className="section-tag">Customer Reviews</span>
          <h2 className="font-display font-bold text-3xl sm:text-5xl text-text-dark leading-tight mb-3 lg:mb-4">
            Phoenix homeowners trust SwiftFlow.
          </h2>
          <div className="flex items-center justify-center gap-2">
            <span className="font-display font-bold text-3xl text-text-dark">4.9</span>
            <div className="flex gap-0.5">
              {[0, 1, 2, 3, 4].map((i) => <span key={i} className="text-amber-400 text-lg">★</span>)}
            </div>
            <span className="text-text-muted text-sm">· 214 Google Reviews</span>
          </div>
        </motion.div>

        <div
          className="relative bg-white rounded-3xl border border-gray-mid p-6 sm:p-10 lg:p-14 overflow-hidden"
          onMouseEnter={() => setPaused(true)}
          onMouseLeave={() => setPaused(false)}
        >
          <svg width="48" height="48" viewBox="0 0 24 24" fill="none" className="absolute top-8 left-8 opacity-[0.06]">
            <path d="M9.5 8C7 8 5 10 5 12.5S7 17 9.5 17c0 2-1.5 3-3.5 3v2c4 0 6.5-2.5 6.5-6.5V8h-3zm9 0C16 8 14 10 14 12.5S16 17 18.5 17c0 2-1.5 3-3.5 3v2c4 0 6.5-2.5 6.5-6.5V8h-3z" fill="#0891B2"/>
          </svg>

          <AnimatePresence mode="wait">
            <motion.div
              key={review.name}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.4 }}
              className="relative"
            >
              <div className="flex gap-1 mb-4 lg:mb-6 justify-center">
                {[0, 1, 2, 3, 4].map((i) => <span key={i} className="text-amber-400 text-xl">★</span>)}
              </div>
              <p className="text-text-dark text-lg sm:text-2xl leading-relaxed text-center font-medium mb-5 lg:mb-8 max-w-2xl mx-auto">
                "{review.text}"
              </p>
              <div className="flex flex-col items-center gap-3">
                <div className="w-12 h-12 rounded-full bg-brand flex items-center justify-center text-white font-bold text-base">
                  {review.name.charAt(0)}
                </div>
                <div className="text-center">
                  <p className="font-sans font-semibold text-text-dark text-sm">{review.name}</p>
                  <p className="text-text-muted text-xs">{review.location}</p>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>

          <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-gray-mid">
            {!paused && (
              <motion.div
                key={`progress-${index}`}
                className="h-full bg-brand"
                initial={{ width: '0%' }}
                animate={{ width: '100%' }}
                transition={{ duration: AUTO_ADVANCE_MS / 1000, ease: 'linear' }}
              />
            )}
          </div>
        </div>

        {/* Dots — jump / progress indicator, no initials */}
        <div className="flex items-center justify-center gap-2.5 mt-5 lg:mt-8">
          {REVIEWS.map((r, i) => {
            const isActive = index === i;
            return (
              <button
                key={r.name}
                onClick={() => setIndex(i)}
                className={`rounded-full transition-all duration-300 ${
                  isActive ? 'w-8 h-2.5 bg-brand' : 'w-2.5 h-2.5 bg-gray-mid hover:bg-brand/40'
                }`}
                aria-label={`Show review ${i + 1} of ${REVIEWS.length}`}
              />
            );
          })}
        </div>
      </div>
    </section>
  );
}