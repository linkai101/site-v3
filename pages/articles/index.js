import React from 'react';
import Head from 'next/head';
import NextLink from 'next/link';
import { useRouter } from 'next/router';
import { motion } from 'framer-motion';


import config from '../../data/config';
import { getArticlesData } from "../../lib/articles";

import {
  Container,
  Box,
  Flex,
  HStack,
  Heading,
  Text,
  Tag,
  Link,
} from '@chakra-ui/react';
import Masonry from "react-masonry-css";

export default function ArticleGridPage({ articlesData }) {
  const router = useRouter();
  const [filter, setFilter] = React.useState("");

  // check query
  React.useEffect(() => {
    if (router.query?.filter && !config.categories.map(c => c.slug).includes(router.query.filter)) { // if is not a valid filter
      return router.push(`/articles`, undefined, { shallow: true });
    }
    setFilter(router.query.filter || "");
  }, [router]);

  return (
    <>
      <Head>
        <title>Articles{config.titleSuffix}</title>
        <meta property="og:title" content={`Articles${config.titleSuffix}`} key="ogtitle"/>
        <meta name="description" content="All of my articles on my projects, activities, and more! 🗂"/>
        <meta property="og:description" content="All of my articles on my projects, activities, and more! 🗂" key="ogdesc"/>
      </Head>

      <Container maxW="container.lg" p={8}>
        <NextLink href="/" passHref>
          <Link color="blue.500">&#60; back to homepage</Link>
        </NextLink>
        
        <Box py={4}>
          <Flex mb={4}>
            <Heading size="lg">
              {filter || "articles"}
              <Text as="span" ml={2} fontSize="2xl" fontWeight="normal">by Linkai Wu</Text>
            </Heading>

            <Flex flex={1} direction="column">
              <Box flex={1}/> {/* Filler div */}
              {/*filter &&
                <Text align="right">
                  <Link ml={1} color="blue.500" 
                    onClick={() => router.push(`/articles`, undefined, { shallow: true })}
                  >all articles</Link>
                </Text>
              */}
            </Flex>
          </Flex>

          <Masonry
            breakpointCols={{
              default: 3,
              1100: 2,
              700: 1,
              //500: 1
            }}
            className="masonry-grid"
            columnClassName="masonry-column"
          >
            {articlesData.filter(a => filterArticles(a,filter)).sort(sortArticles).map(article => 
              <motion.div
                whileHover={{ scale: 1.05 }}
              >
                <NextLink href={`/articles/${article.slug}`} passHref>
                  <Link style={{ textDecoration: "none" }}>
                    <Box key={article.slug}
                      p={4} position="relative"
                      bg={
                        config.categories.filter(c => {
                          return article.category === c.slug;
                        })[0]?.bg || 'gray.100'
                      }
                      borderRadius="xl"
                    >
                      <Heading size="lg">{article.emoji}</Heading>
                      <Heading size="md" mt={2}>{article.title}</Heading>
                      <Text>{article.description}</Text>
                      <Text color="text.darkMuted" fontSize="sm">{article.date}</Text>

                      {article.pinned && <Text as="span"
                        position="absolute" top="12px" right="12px"
                      >📌</Text>}
                    </Box>
                  </Link>
                </NextLink>
              </motion.div>
            )}
          </Masonry>
        </Box>
      </Container>
    </>
  )
}

function sortArticles(a,b) { // sort order: 1-pinned first, 2-present first, 3-recent date first
  const date1 = new Date(a.sortDate);
  const date2 = new Date(b.sortDate);

  if (a.pinned && b.pinned || !a.pinned && !b.pinned) {
    if (a.present && !b.present || !a.present && b.present) {
      return (a.present ? -1 : 1); // present over past
    }
    // sort by start date
    if (date1 === date2) return 0;
    return (date1 > date2) ? -1 : 1;
  }
  return (a.pinned ? -1 : 1); // pinned before unpinned
}

function filterArticles(a, filter) {
  if (!filter) return true;
  return a.category === filter;
}

export async function getStaticProps() {
  const articlesData = await getArticlesData();

  return {
    props: {
      articlesData,
    },
  };
}