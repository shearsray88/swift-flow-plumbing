import { motion } from 'framer-motion';

export default function Hero() {
  return (
    <section className="relative flex items-center overflow-hidden" style={{ minHeight: '100vh' }}>
      <div className="absolute inset-0 z-0">
        <video
          autoPlay
          muted
          loop
          playsInline
          className="w-full h-full object-cover"
          style={{ filter: 'grayscale(100%)' }}
          poster="https://images.unsplash.com/photo-1607472586893-edb57bdc0e39?w=1600&q=80"
        >
          <source src="https://www.pexels.com/download/video/9200530/" type="video/mp4" />
        </video>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 w-full py-20 pt-32">
        <div className="grid lg:grid-cols-2 gap-16 items-center">

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
          >
            <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-black/40 backdrop-blur-sm border border-white/30 rounded-full mb-6">
              <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
              <span className="text-white font-semibold text-xs tracking-wide" style={{textShadow:'0 1px 4px rgba(0,0,0,0.8)'}}>Licensed & Insured · Phoenix, AZ</span>
            </div>

            <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold text-white leading-[1.05] mb-6" style={{textShadow:'0 2px 20px rgba(0,0,0,0.9)'}}>
              Fast, Reliable<br />
              <span className="text-cyan-400">Plumbing</span><br />
              You Can Trust.
            </h1>

            <p className="text-white font-medium text-lg leading-relaxed mb-10 max-w-md" style={{textShadow:'0 1px 8px rgba(0,0,0,0.9)'}}>
              Phoenix's go-to plumbers for leaks, clogs, water heaters, and everything in between. Same-day service, upfront pricing, guaranteed work.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 mb-12">
              <a href="#contact" className="btn-primary text-sm px-8 py-4">
                Book a Plumber Today
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                  <path d="M5 12h14M12 5l7 7-7 7"/>
                </svg>
              </a>
              <a href="tel:+16025550147" className="flex items-center gap-3 text-white hover:text-cyan-400 transition-colors">
                <div className="w-11 h-11 border border-white/40 rounded-lg flex items-center justify-center bg-black/30 backdrop-blur-sm">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.13 12 19.79 19.79 0 0 1 1.06 3.36 2 2 0 0 1 3.04 1h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L7.09 8.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z"/>
                  </svg>
                </div>
                <div>
                  <p className="text-xs text-white/80 font-medium" style={{textShadow:'0 1px 4px rgba(0,0,0,0.8)'}}>24/7 Emergency Line</p>
                  <p className="text-sm font-bold" style={{textShadow:'0 1px 4px rgba(0,0,0,0.8)'}}>( 602) 555-0147</p>
                </div>
              </a>
            </div>

            <div className="flex items-center gap-8 pt-8 border-t border-white/20">
              <div>
                <div className="text-3xl font-bold text-white" style={{textShadow:'0 2px 8px rgba(0,0,0,0.8)'}}>15+</div>
                <div className="text-white/80 text-xs mt-0.5" style={{textShadow:'0 1px 4px rgba(0,0,0,0.8)'}}>Years Experience</div>
              </div>
              <div className="w-px h-10 bg-white/20" />
              <div>
                <div className="text-3xl font-bold text-white" style={{textShadow:'0 2px 8px rgba(0,0,0,0.8)'}}>4.9</div>
                <div className="text-white/80 text-xs mt-0.5" style={{textShadow:'0 1px 4px rgba(0,0,0,0.8)'}}>Google Rating</div>
              </div>
              <div className="w-px h-10 bg-white/20" />
              <div>
                <div className="text-3xl font-bold text-white" style={{textShadow:'0 2px 8px rgba(0,0,0,0.8)'}}>Same-Day</div>
                <div className="text-white/80 text-xs mt-0.5" style={{textShadow:'0 1px 4px rgba(0,0,0,0.8)'}}>Service Available</div>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="hidden lg:flex flex-col gap-4"
          >
            <div className="bg-brand/90 backdrop-blur-sm rounded-2xl p-8 border border-cyan-400/30">
              <svg width="44" height="44" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="1.5" className="mb-5">
                <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
              </svg>
              <h3 className="text-white font-bold text-xl mb-2">Same-Day Emergency Service</h3>
              <p className="text-white/90 text-sm leading-relaxed">Burst pipe? No hot water? We dispatch within the hour, 24 hours a day, 7 days a week.</p>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="bg-black/60 backdrop-blur-sm rounded-2xl p-6 border border-white/20">
                <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="#22D3EE" strokeWidth="1.5" className="mb-3">
                  <circle cx="12" cy="12" r="10"/>
                  <path d="M12 6v6l4 2"/>
                </svg>
                <p className="text-white font-bold text-sm mb-1">60-Min Response</p>
                <p className="text-white/80 text-xs">Greater Phoenix Area</p>
              </div>
              <div className="bg-cyan-500/30 backdrop-blur-sm border border-cyan-400/40 rounded-2xl p-6">
                <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="#22D3EE" strokeWidth="1.5" className="mb-3">
                  <line x1="12" y1="1" x2="12" y2="23"/>
                  <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/>
                </svg>
                <p className="text-white font-bold text-sm mb-1">Upfront Pricing</p>
                <p className="text-white/80 text-xs">No hidden fees</p>
              </div>
            </div>

            <div className="bg-black/60 backdrop-blur-sm border border-white/20 rounded-2xl p-5 flex items-center gap-4">
              <div className="w-11 h-11 bg-brand/60 rounded-xl flex items-center justify-center flex-shrink-0">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#22D3EE" strokeWidth="1.5">
                  <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/>
                  <polyline points="22 4 12 14.01 9 11.01"/>
                </svg>
              </div>
              <div>
                <p className="text-white font-bold text-sm">AZ Licensed & Fully Insured</p>
                <p className="text-white/80 text-xs mt-0.5">License #ROC-289341 · $2M liability</p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}