import Head from 'next/head';
import Navigation from '../components/Navigation';
import Hero from '../components/Hero';
import Services from '../components/Services';
import Process from '../components/Process';
import Reviews from '../components/Reviews';
import Contact from '../components/Contact';
import MapSection from '../components/MapSection';
import Footer from '../components/Footer';

export default function Home() {
  return (
    <>
      <Head>
        <title>SwiftFlow Plumbing — Phoenix AZ Plumber | Same-Day Service</title>
        <meta name="description" content="Phoenix's trusted plumbers for leaks, clogs, water heaters, and emergencies. Same-day service, upfront pricing, AZ licensed. Call (602) 555-0147." />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="data:," />
      </Head>
      <Navigation />
        <a href="tel:+16025550147"
          className="fixed bottom-6 right-6 z-50 md:hidden bg-brand text-white px-5 py-3 rounded-full shadow-lg font-bold text-sm flex items-center gap-2">
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2">
        <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z"/>
        </svg>
            Call Now
        </a>
      <main>
        <Hero />
        <Services />
        <Process />
        <Reviews />
        <Contact />
        <MapSection />
      </main>
      <Footer />
    </>
  );
}