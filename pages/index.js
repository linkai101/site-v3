import React from 'react';
import Head from 'next/head';
import NextLink from 'next/link';
import { motion } from 'framer-motion';

import config from '../data/config';
import { getPinnedArticlesData } from "../lib/articles";

import {
  Container,
  Flex,
  Box,
  HStack,
  Heading,
  Text,
  Tooltip,
  Tag,
  Link,
  Image,
} from '@chakra-ui/react';
import Masonry from "react-masonry-css";

export default function Home({ articlesData }) {
  return (
    <>
      <Head>
        <meta name="description" content="Hi! ✋ I'm Linkai Wu, a high school student from Maryland, USA."/>
        <meta property="og:description" content="Hi! ✋ I'm Linkai Wu, a high school student from Maryland, USA." key="ogdesc"/>
      </Head>

      <Box bg="bg.light2">
        <Container maxW="container.lg">
          <Flex h={{ base:"auto", md:"40vh" }} minH={{ base:"auto", md:"300px" }} p={4} pt={{ base:12, md:"auto"}}
            align="center"
            direction={{ base: "column", md: "row" }}
          >
            <Image
              src="/assets/linkai.png"
              borderRadius="100%"
              w="200px"
            />

            <Box flex={1} px={12} py={8} textAlign={{ base:"center", md:"left" }}>
              <Heading as="h1" size="2xl">
                Linkai Wu
              </Heading>
              <Text fontSize="xl" mt={1}>
                <Link href="https://mbhs.edu" style={{ textDecoration: "none" }} isExternal>Studying</Link>
                ,&nbsp;
                <Link href={config.socials.github} style={{ textDecoration: "none" }} isExternal>sharing</Link>
                , and&nbsp;
                <Link href="https://blair.hackclub.com" style={{ textDecoration: "none" }} isExternal>hacking</Link>.
              </Text>

              <HStack mt={4} justify={{ base:"center", md:"flex-start" }} spacing={3}>
                {Object.entries(config.socials).map(([key,value]) =>
                  key === 'email' ?
                    <Tooltip label={value} key={key}>
                      <Link href={`mailto:${value}`} color="theme.primary2">{key}</Link>
                    </Tooltip>
                  :
                    <Link href={value} isExternal color="theme.primary2" key={key}>{key}</Link>
                )}
              </HStack>
            </Box>
          </Flex>
        </Container>
      </Box>

      <Container maxW="container.xl" p={8}>
        {config.categories.map(c =>
        <Flex py={{ base:0, md:6 }} direction={{ base:"column", md:"row" }}>
          <Box
            w={{ base:"auto", md:"256px" }} pl={4} pr={{ base:4, md:8 }} pb={{ base:4, md:0 }}
            textAlign={{ base: "left", md:"right" }}
          >
            <Box py={4} pr={4} borderRightWidth={{ base: 0, md:2 }} borderRightColor="gray.200">
              <Heading size="lg" color={c.color}>{c.name.toLowerCase()}</Heading>
              <Text mt={3} color="text.darkMuted">{c.description}</Text>

              <Box mt={4}>
                <NextLink href={`/articles?filter=${c.slug}`} passHref>
                  <Link>
                    <Tag size="md" fontWeight="semibold" colorScheme={c.colorScheme}>{c.emoji} see all</Tag>
                  </Link>
                </NextLink>
              </Box>
            </Box>
          </Box>
          
          <Box flex={1}>
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
              {articlesData.filter(a => filterArticles(a,c.slug)).sort(sortArticles).map(article => 
                <motion.div
                  whileHover={{ scale: 1.05 }}
                >
                  <NextLink href={`/articles/${article.slug}`} passHref>
                    <Link style={{ textDecoration: "none" }}>
                      <Box key={article.slug}
                        p={4} position="relative"
                        borderRadius="xl"
                        bg={
                          config.categories.filter(c => {
                            return article.category === c.slug;
                          })[0]?.bg || 'gray.100'
                        }
                      >
                        <Heading size="lg">{article.emoji}</Heading>
                        <Heading size="md" mt={2}>{article.title}</Heading>
                        <Text>
                          {article.description}
                        </Text>
                        <Text color="text.darkMuted" fontSize="sm">
                          {article.date}
                        </Text>
                      </Box>
                    </Link>
                  </NextLink>
                </motion.div>
              )}
            </Masonry>
          </Box>
        </Flex>
        )}
      </Container>
    </>
  );
}

function sortArticles(a,b) { // sort order: 1-present first, 2-recent date first
  const date1 = new Date(a.sortDate);
  const date2 = new Date(b.sortDate);

  if (a.present && !b.present || !a.present && b.present) {
    return (a.present ? -1 : 1); // present over past
  }
  // sort by start date
  if (date1 === date2) return 0;
  return (date1 > date2) ? -1 : 1;
}

function filterArticles(a, filter) {
  if (!filter) return true;
  return a.category === filter;
}

export async function getStaticProps() {
  const articlesData = await getPinnedArticlesData();

  return {
    props: {
      articlesData,
    },
  };
}