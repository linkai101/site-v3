import '../styles/globals.css';
import '../styles/masonry.css';
import Head from 'next/head';
import config from '../data/config';
import { ChakraProvider } from "@chakra-ui/react";
import theme from '../lib/theme';
import MDXProvider from "../components/MDXProvider";

import Footer from "../components/Footer";

function MyApp({ Component, pageProps }) {
  return (
    <>
      <Head>
        <title>{config.title}</title>
        <meta property="og:title" content={config.title} key="ogtitle"/>
        <meta property="og:site_name" content={config.siteName} key="ogsitename"/>
        <meta name="description" content=""/>
        <meta property="og:description" content="" key="ogdesc"/>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      
      <ChakraProvider theme={theme} resetCSS>
        <MDXProvider>
          <Component {...pageProps} />
          <Footer/>
        </MDXProvider>
      </ChakraProvider>
    </>
  );
}

export default MyApp;