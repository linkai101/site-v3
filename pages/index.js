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
  useColorModeValue,
  useBreakpointValue,
} from '@chakra-ui/react';
import Masonry from "react-masonry-css";
import Emoji from '../components/Emoji';

export default function Home({ articlesData }) {
  return (
    <>
      <Head>
        <meta name="description" content="Hi! ✋ I'm Linkai Wu, a high school student from Maryland, USA."/>
        <meta property="og:description" content="Hi! ✋ I'm Linkai Wu, a high school student from Maryland, USA." key="ogdesc"/>
      </Head>

      <Box bg={useColorModeValue("bg.light2", "bg.dark2")}>
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

              <HStack mt={2} justify={{ base:"center", md:"flex-start" }} spacing={3}>
                <Tag borderRadius="full" variant="outline" fontWeight="semibold" boxShadow="0 0 0px 2px #718096">
                  <Emoji symbol="📌" mr={1}/> dmv
                </Tag>
                <Link href="https://mbhs.edu" style={{ textDecoration: "none" }} isExternal>
                  <Tag borderRadius="full" variant="outline" fontWeight="semibold" boxShadow="0 0 0px 2px #718096">
                    {useBreakpointValue({ base: "Blair HS", sm: "Montgomery Blair HS" })}
                  </Tag>
                </Link>
              </HStack>

              <Text fontSize="xl" mt={4}>
              ¯\_(ツ)_/¯ 
              </Text>

              <HStack mt={2} justify={{ base:"center", md:"flex-start" }} spacing={3}>
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
        <Flex py={{ base:0, md:6 }} direction={{ base:"column", md:"row" }} key={c.slug}>
          <Box
            w={{ base:"auto", md:"256px" }} pl={4} pr={{ base:4, md:8 }} pb={{ base:4, md:0 }}
            textAlign={{ base: "left", md:"right" }}
          >
            <Box py={4} pr={4} borderRightWidth={{ base: 0, md:2 }} borderRightColor="gray.200">
              <Heading size="lg" color={c.color}>{c.name.toLowerCase()}</Heading>
              <Text mt={3} color={useColorModeValue("text.darkMuted", "text.lightMuted")}>{c.description}</Text>

              <Box mt={4}>
                <NextLink href={`/articles?filter=${c.slug}`} passHref>
                  <Link>
                    <Tag size="md" fontWeight="semibold" colorScheme={c.colorScheme}><Emoji symbol={c.emoji} mr={1}/> see all</Tag>
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
                  key={article.slug}
                >
                  <NextLink href={`/articles/${article.slug}`} passHref>
                    <Link style={{ textDecoration: "none" }}>
                      <Box key={article.slug}
                        p={4} position="relative"
                        borderRadius="xl"
                        bg={
                          config.categories.filter(c => {
                            return article.category === c.slug;
                          })[0]?.bg[useColorModeValue('light', 'dark')]
                          || useColorModeValue('gray.100', 'bg.dark2')
                        }
                      >
                        <Heading size="lg"><Emoji symbol={article.emoji}/></Heading>
                        <Heading size="md" mt={2}>{article.title}</Heading>
                        <Text>
                          {article.description}
                        </Text>
                        <Text color={useColorModeValue("text.darkMuted", "text.lightMuted")} fontSize="sm">
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