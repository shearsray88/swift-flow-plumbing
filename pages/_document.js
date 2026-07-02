import { Html, Head, Main, NextScript } from 'next/document';

export default function Document() {
  return (
    <Html lang="en">
      <Head>
        <meta charSet="utf-8" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="true" />
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap" rel="stylesheet" />

        {/* Primary Meta Tags */}
        <meta name="title" content="SwiftFlow Plumbing — Phoenix AZ Plumber | Same-Day Service" />
        <meta name="description" content="Phoenix's trusted plumbers for leaks, clogs, water heaters, and emergencies. Same-day service, upfront pricing, AZ licensed. Call (602) 555-0147." />
        <meta name="keywords" content="plumber Phoenix AZ, emergency plumber Phoenix, same day plumber Scottsdale, plumber Tempe, plumber Mesa, plumber Chandler" />
        <meta name="robots" content="index, follow" />
        <meta name="author" content="SwiftFlow Plumbing" />

        {/* Open Graph */}
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://swift-flow-plumbing.vercel.app" />
        <meta property="og:title" content="SwiftFlow Plumbing — Phoenix AZ Plumber | Same-Day Service" />
        <meta property="og:description" content="Phoenix's trusted plumbers for leaks, clogs, water heaters, and emergencies. Same-day service, upfront pricing, AZ licensed." />
        <meta property="og:image" content="https://swift-flow-plumbing.vercel.app/og-image.jpg" />

        {/* Twitter */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="SwiftFlow Plumbing — Phoenix AZ Plumber | Same-Day Service" />
        <meta name="twitter:description" content="Phoenix's trusted plumbers for leaks, clogs, water heaters, and emergencies. Same-day service, upfront pricing, AZ licensed." />
        <meta name="twitter:image" content="https://swift-flow-plumbing.vercel.app/og-image.jpg" />

        {/* Schema.org LocalBusiness */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Plumber",
              "name": "SwiftFlow Plumbing",
              "description": "Phoenix's trusted plumbers for leaks, clogs, water heaters, and emergencies. Same-day service, upfront pricing, AZ licensed.",
              "url": "https://swift-flow-plumbing.vercel.app",
              "telephone": "+16025550147",
              "email": "info@swiftflowplumbing.com",
              "priceRange": "$$",
              "image": "https://swift-flow-plumbing.vercel.app/og-image.jpg",
              "address": {
                "@type": "PostalAddress",
                "streetAddress": "4821 E Thomas Rd",
                "addressLocality": "Phoenix",
                "addressRegion": "AZ",
                "postalCode": "85018",
                "addressCountry": "US"
              },
              "geo": {
                "@type": "GeoCoordinates",
                "latitude": 33.4734,
                "longitude": -112.0183
              },
              "openingHoursSpecification": {
                "@type": "OpeningHoursSpecification",
                "dayOfWeek": ["Monday","Tuesday","Wednesday","Thursday","Friday","Saturday","Sunday"],
                "opens": "00:00",
                "closes": "23:59"
              },
              "areaServed": [
                { "@type": "City", "name": "Phoenix" },
                { "@type": "City", "name": "Scottsdale" },
                { "@type": "City", "name": "Tempe" },
                { "@type": "City", "name": "Mesa" },
                { "@type": "City", "name": "Chandler" }
              ],
              "hasOfferCatalog": {
                "@type": "OfferCatalog",
                "name": "Plumbing Services",
                "itemListElement": [
                  { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Emergency Repair" }},
                  { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Drain Cleaning" }},
                  { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Water Heater" }},
                  { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Pipe Repair" }},
                  { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Fixture Install" }}
                ]
              }
            })
          }}
        />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}