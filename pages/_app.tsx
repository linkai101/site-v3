import '../styles/globals.css';
import '../styles/masonry.css';
import Head from 'next/head';
import config from '../content/config';
import { ChakraProvider, Box } from "@chakra-ui/react";
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
        <meta name="description" content={config.description}/>
        <meta property="og:description" content={config.description} key="ogdesc"/>
        {/* <link rel="icon" href="/favicon.ico" /> */}
      </Head>
      
      <ChakraProvider theme={theme} resetCSS>
        <MDXProvider>
          <Box minH="100vh">
            <Component {...pageProps}/>
          </Box>
          <Footer/>
        </MDXProvider>
      </ChakraProvider>
    </>
  );
}

export default MyApp;