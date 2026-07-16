import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const FORMSPREE_ENDPOINT = 'https://formspree.io/f/mdarwbrv';

const SERVICES = [
  'Emergency Repair', 'Drain Cleaning', 'Water Heater',
  'Pipe Repair', 'Fixture Install', 'Inspection', 'Other'
];

const URGENCY = ['Right now — emergency', 'Today', 'This week', 'Just getting a quote'];

function BotBubble({ children }) {
  return (
    <div className="flex items-start gap-3">
      <div className="w-8 h-8 bg-brand rounded-full flex items-center justify-center flex-shrink-0">
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2">
          <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
        </svg>
      </div>
      <div className="bg-white border border-gray-mid rounded-2xl rounded-tl-sm px-4 py-3 text-sm text-text-dark max-w-[85%]">
        {children}
      </div>
    </div>
  );
}

function UserBubble({ children }) {
  return (
    <div className="flex justify-end">
      <div className="bg-brand text-white rounded-2xl rounded-tr-sm px-4 py-3 text-sm max-w-[85%]">
        {children}
      </div>
    </div>
  );
}

export default function Contact() {
  const [step, setStep] = useState('service'); // service -> urgency -> contact -> success
  const [service, setService] = useState('');
  const [urgency, setUrgency] = useState('');
  const [status, setStatus] = useState('idle');
  const [error, setError] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus('loading');
    setError(false);
    const form = e.target;
    const data = new FormData(form);
    data.append('service', service);
    data.append('urgency', urgency);
    data.append('_website', 'SwiftFlow Plumbing');
    try {
      const res = await fetch(FORMSPREE_ENDPOINT, {
        method: 'POST',
        body: data,
        headers: { Accept: 'application/json' },
      });
      if (res.ok) {
        setStatus('success');
        setStep('success');
      } else {
        setStatus('idle');
        setError(true);
      }
    } catch {
      setStatus('idle');
      setError(true);
    }
  };

  return (
    <section id="contact" className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-16 items-start">

          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <span className="section-tag">Book a Plumber</span>
            <h2 className="font-display font-bold text-4xl sm:text-5xl text-text-dark leading-tight mb-6">
              Get a free quote today.
            </h2>
            <p className="text-text-mid leading-relaxed mb-10">
              Answer a couple quick questions and we'll call you back within 30 minutes during business hours. For emergencies, call us directly.
            </p>

            <div className="flex flex-col gap-5 mb-10">
              <a href="tel:+16025550147" className="flex items-center gap-4 group">
                <div className="w-12 h-12 bg-brand rounded-xl flex items-center justify-center flex-shrink-0 group-hover:bg-brand-dark transition-colors">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2">
                    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z"/>
                  </svg>
                </div>
                <div>
                  <p className="font-sans font-bold text-text-dark">(602) 555-0147</p>
                  <p className="text-text-muted text-xs">24/7 emergency line</p>
                </div>
              </a>

              <a href="mailto:info@swiftflowplumbing.com" className="flex items-center gap-4 group">
                <div className="w-12 h-12 bg-brand rounded-xl flex items-center justify-center flex-shrink-0 group-hover:bg-brand-dark transition-colors">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2">
                    <path d="M4 4h16v16H4z"/><path d="M4 6l8 7 8-7"/>
                  </svg>
                </div>
                <div>
                  <p className="font-sans font-bold text-text-dark">info@swiftflowplumbing.com</p>
                  <p className="text-text-muted text-xs">Reply within one business day</p>
                </div>
              </a>

              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-brand rounded-xl flex items-center justify-center flex-shrink-0">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2">
                    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/>
                  </svg>
                </div>
                <div>
                  <p className="font-sans font-bold text-text-dark">Phoenix & Surrounding Areas</p>
                  <p className="text-text-muted text-xs">Scottsdale, Tempe, Mesa, Chandler & more</p>
                </div>
              </div>
            </div>

            <div className="bg-red-50 border border-red-100 rounded-2xl p-5 flex items-center gap-4">
              <div className="w-10 h-10 bg-red-500 rounded-xl flex items-center justify-center flex-shrink-0">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2">
                  <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"/>
                  <line x1="12" y1="9" x2="12" y2="13"/>
                  <line x1="12" y1="17" x2="12.01" y2="17"/>
                </svg>
              </div>
              <div>
                <p className="font-sans font-bold text-red-700 text-sm">Plumbing Emergency?</p>
                <p className="text-red-500 text-xs mt-0.5">Call (602) 555-0147 — we answer 24/7</p>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="bg-gray-warm border border-gray-mid rounded-2xl p-6 sm:p-8"
          >
            <div className="flex flex-col gap-4 mb-2">
              <BotBubble>Hey! What's going on with your plumbing? 🔧</BotBubble>

              {service && <UserBubble>{service}</UserBubble>}

              {(step === 'urgency' || step === 'contact' || step === 'success') && (
                <BotBubble>Got it — how soon do you need someone out?</BotBubble>
              )}

              {urgency && <UserBubble>{urgency}</UserBubble>}

              {(step === 'contact' || step === 'success') && (
                <BotBubble>
                  {step === 'success' ? 'Perfect, got everything I need!' : 'Almost done — where should we send your free quote?'}
                </BotBubble>
              )}
            </div>

            <AnimatePresence mode="wait">
              {step === 'service' && (
                <motion.div key="service" initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} className="flex flex-wrap gap-2 mt-4">
                  {SERVICES.map((s) => (
                    <button key={s} type="button" onClick={() => { setService(s); setStep('urgency'); }}
                      className="text-xs font-sans px-3.5 py-2 rounded-full border border-gray-mid bg-white text-text-mid hover:border-brand hover:text-brand transition-colors">
                      {s}
                    </button>
                  ))}
                </motion.div>
              )}

              {step === 'urgency' && (
                <motion.div key="urgency" initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} className="flex flex-wrap gap-2 mt-4">
                  {URGENCY.map((u) => (
                    <button key={u} type="button" onClick={() => { setUrgency(u); setStep('contact'); }}
                      className="text-xs font-sans px-3.5 py-2 rounded-full border border-gray-mid bg-white text-text-mid hover:border-brand hover:text-brand transition-colors">
                      {u}
                    </button>
                  ))}
                </motion.div>
              )}

              {step === 'contact' && (
                <motion.form key="contact" onSubmit={handleSubmit} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} className="flex flex-col gap-3 mt-4">
                  <div className="grid sm:grid-cols-2 gap-3">
                    <input required name="first_name" placeholder="First name"
                      className="bg-white border border-gray-mid rounded-xl px-4 py-3 text-sm text-text-dark placeholder-text-muted focus:outline-none focus:border-brand"/>
                    <input required name="phone" type="tel" placeholder="Phone number"
                      className="bg-white border border-gray-mid rounded-xl px-4 py-3 text-sm text-text-dark placeholder-text-muted focus:outline-none focus:border-brand"/>
                  </div>
                  <textarea rows={2} name="message" placeholder="Anything else we should know? (optional)"
                    className="bg-white border border-gray-mid rounded-xl px-4 py-3 text-sm text-text-dark placeholder-text-muted focus:outline-none focus:border-brand resize-none"/>
                  {error && <p className="text-red-500 text-xs">Something went wrong. Please try again or call us directly.</p>}
                  <button type="submit" disabled={status === 'loading'} className="btn-primary justify-center py-3.5 mt-1">
                    {status === 'loading' ? 'Sending...' : (
                      <>
                        Send
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                          <line x1="22" y1="2" x2="11" y2="13"/><polygon points="22 2 15 22 11 13 2 9 22 2"/>
                        </svg>
                      </>
                    )}
                  </button>
                </motion.form>
              )}

              {step === 'success' && (
                <motion.div key="success" initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} className="mt-4 flex items-center gap-3 bg-brand/10 border border-brand/20 rounded-xl px-4 py-3.5">
                  <div className="w-8 h-8 bg-brand rounded-full flex items-center justify-center flex-shrink-0">
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5">
                      <path d="M20 6L9 17l-5-5"/>
                    </svg>
                  </div>
                  <p className="text-text-dark text-sm font-semibold">We'll call you back within 30 minutes!</p>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        </div>
      </div>
    </section>
  );
}