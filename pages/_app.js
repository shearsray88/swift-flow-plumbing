import Head from 'next/head';
import { Inter } from 'next/font/google';
import "@/styles/globals.css";

const inter = Inter({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700', '800'],
  variable: '--font-inter',
  display: 'swap',
});

export default function App({ Component, pageProps }) {
  return (
    <>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <div className={`${inter.variable} font-sans antialiased`}>
        <Component {...pageProps} />
      </div>
    </>
  );
}