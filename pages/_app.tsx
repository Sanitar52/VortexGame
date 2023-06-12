import '../styles/global.css'
import 'bootstrap/dist/css/bootstrap.css';
import { AppProps } from 'next/app'
import React, { useEffect } from 'react';
import Head from 'next/head';
import { GlobalContextProvider } from '../contexts/globalContext';
import Navbar from '../components/Navbar';

function App({ Component, pageProps }) {
  useEffect(() => {
    // Remove the server-side injected CSS.
    import ('bootstrap/dist/js/bootstrap');
  }, []);
  return (

    <>
      <Head>
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1, maximum-scale=1"
        ></meta>
      </Head>
      <GlobalContextProvider>
        <Navbar />
        <Component {...pageProps} />

      </GlobalContextProvider>
    
    </>
  );
}

export default App;