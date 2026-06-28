import { motion } from 'framer-motion';

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

export default function Reviews() {
  return (
    <section id="reviews" className="py-24 bg-gray-warm">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-14 gap-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <span className="section-tag">Customer Reviews</span>
            <h2 className="font-display font-bold text-4xl sm:text-5xl text-text-dark leading-tight max-w-lg">
              Phoenix homeowners trust SwiftFlow.
            </h2>
          </motion.div>
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="flex-shrink-0 text-right"
          >
            <p className="font-display font-bold text-5xl text-text-dark">4.9</p>
            <div className="flex gap-0.5 justify-end mt-1">
              {[0,1,2,3,4].map(i => <span key={i} className="text-brand text-lg">★</span>)}
            </div>
            <p className="text-text-muted text-xs mt-1">214 Google Reviews</p>
          </motion.div>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-5">
          {REVIEWS.map((r, i) => (
            <motion.div
              key={r.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.08 }}
              className="bg-white rounded-2xl p-6 border border-gray-mid hover:shadow-md transition-shadow"
            >
              <div className="flex gap-0.5 mb-4">
                {[0,1,2,3,4].map(j => <span key={j} className="text-brand text-sm">★</span>)}
              </div>
              <p className="text-text-mid text-sm leading-relaxed mb-6 italic">"{r.text}"</p>
              <div className="flex items-center gap-3 pt-4 border-t border-gray-mid">
                <div className="w-9 h-9 rounded-full bg-brand flex items-center justify-center text-white font-bold text-sm flex-shrink-0">
                  {r.name.charAt(0)}
                </div>
                <div>
                  <p className="font-sans font-semibold text-text-dark text-sm">{r.name}</p>
                  <p className="text-text-muted text-xs">{r.location}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}