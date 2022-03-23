import { SessionProvider, signIn, useSession } from 'next-auth/react';
import Head from 'next/head';
import { useEffect } from 'react';
import Header from '../components/header';
import Spinner from '../components/spinner';
import '../styles/globals.css';

const MyApp = (props) => (
  <SessionProvider session={props.pageProps.session}>
    <Head>
      <title>WirePact OIDC Demo App</title>
    </Head>
    <App {...props}></App>
  </SessionProvider>
);

const App = ({ Component, pageProps: { ...pageProps } }) => {
  const { data: session, status } = useSession();
  const isAppReady = session?.user && !session?.error && !session.loading;

  useEffect(() => {
    if (!session?.user && status !== 'loading' && status !== 'authenticated') {
      signIn('oidc');
    }
  }, [session?.user, status]);

  if (!isAppReady) {
    return (
      <div className="h-screen w-screen flex flex-col items-center justify-center">
        <p className="mb-8">Authentication in progress...</p>
        <Spinner />
      </div>
    );
  }

  return (
    <>
      <Header />
      <div className="p-8">
        <Component {...pageProps} />
      </div>
    </>
  );
};

export default MyApp;
