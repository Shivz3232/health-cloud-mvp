import '../styles/globals.css';
import type { AppProps } from 'next/app';
import NavBar from '../components/NavBar';
import { SessionProvider } from 'next-auth/react';

function MyApp({ Component, pageProps: { session, ...pageProps } }: AppProps) {
  return (
    <main>
      <SessionProvider session={session}>
        <NavBar />
        <Component {...pageProps} />
      </SessionProvider>
    </main>
  );
}

export default MyApp;
