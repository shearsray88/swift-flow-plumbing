import { motion } from 'framer-motion';

const STEPS = [
  {
    num: '01',
    title: 'Call or Book Online',
    desc: 'Call us anytime or fill out our quick form. We confirm your appointment within 15 minutes and give you a clear arrival window.',
    image: 'https://images.unsplash.com/photo-1603796846097-bee99e4a601f?w=600&q=80',
  },
  {
    num: '02',
    title: 'We Diagnose the Problem',
    desc: 'Our licensed plumber arrives on time, inspects the issue, and gives you a clear written quote before any work begins. No surprises.',
    image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=600&q=80',
  },
  {
    num: '03',
    title: 'We Fix It Right',
    desc: 'Work begins only after you approve the quote. We use quality parts, work cleanly, and finish the job properly the first time.',
    image: 'https://images.unsplash.com/photo-1504328345606-18bbc8c9d7d1?w=600&q=80',
  },
  {
    num: '04',
    title: 'Guaranteed & Inspected',
    desc: 'Every job comes with a written warranty. We do a final walkthrough with you before we leave so you know exactly what was done.',
    image: 'https://images.unsplash.com/photo-1607472586893-edb57bdc0e39?w=600&q=80',
  },
];

export default function Process() {
  return (
    <section className="py-24 bg-brand relative overflow-hidden">
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

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {STEPS.map((s, i) => (
            <motion.div
              key={s.num}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="relative"
            >
              {i < STEPS.length - 1 && (
                <div className="hidden lg:block absolute top-8 h-px bg-white/20 z-0" style={{ width: 'calc(100% - 32px)', left: '64px' }} />
              )}
              <div className="relative z-10">
                {/* Step number */}
                <div className="w-16 h-16 bg-white/15 backdrop-blur-sm rounded-2xl flex items-center justify-center mb-5 border border-white/20">
                  <span className="font-display font-bold text-2xl text-white">{s.num}</span>
                </div>

                {/* Image */}
                <div className="relative rounded-xl overflow-hidden mb-5" style={{ height: '160px' }}>
                  <img
                    src={s.image}
                    alt={s.title}
                    className="w-full h-full object-cover"
                    style={{ filter: 'grayscale(20%)' }}
                  />
                  
                </div>

                <h3 className="font-sans font-bold text-white text-lg mb-3">{s.title}</h3>
                <p className="text-white/70 text-sm leading-relaxed">{s.desc}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}