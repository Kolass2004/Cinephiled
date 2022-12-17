import 'bootstrap/dist/css/bootstrap.min.css';
import { AnimatePresence } from 'framer-motion';
import { SessionProvider } from 'next-auth/react';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import Layout from '../components/Layout/Layout';
import MediaContextProvider from '../Store/MediaContext';
import UserContextProvider from '../Store/UserContext';
import { Loader } from '../styles/GlobalComponents';
import Theme from '../styles/theme';

function MyApp({ Component, pageProps: { session, ...pageProps } }) {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const handleStart = (url) => {
      url !== router.asPath ? setIsLoading(true) : setIsLoading(false);
    };

    const handleComplete = () => {
      setIsLoading(false);
      document.body.style.overflow = 'auto';
    };

    router.events.on('routeChangeStart', handleStart);
    router.events.on('routeChangeComplete', handleComplete);
    router.events.on('routeChangeError', handleComplete);
  }, [router]);

  return (
    <Theme>
      <SessionProvider session={session} refetchOnWindowFocus={false}>
        <UserContextProvider>
          <MediaContextProvider>
            <AnimatePresence exitBeforeEnter>
              {isLoading ? (
                <Loader />
              ) : (
                <Layout router={router} key={router.asPath}>
                  <Component {...pageProps} />
                </Layout>
              )}
            </AnimatePresence>
          </MediaContextProvider>
        </UserContextProvider>
      </SessionProvider>
    </Theme>
  );
}

export default MyApp;
