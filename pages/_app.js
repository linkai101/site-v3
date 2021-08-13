import '../styles/globals.css';
import '../styles/masonry.css';
import Head from 'next/head';
import { ChakraProvider } from "@chakra-ui/react";
import theme from '../lib/theme';

function MyApp({ Component, pageProps }) {
  return (
    <>
      <Head>
        <title>Linkai Wu</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      
      <ChakraProvider theme={theme} resetCSS>
        <Component {...pageProps} />
      </ChakraProvider>
    </>
  );
}

export default MyApp;