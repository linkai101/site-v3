import React from 'react';
import Head from 'next/head';
import NextLink from 'next/link';
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
        <meta name="description" content="Hi! ✋ I'm Linkai Wu, a high school student and programmer from Maryland, USA."/>
        <meta property="og:description" content="Hi! ✋ I'm Linkai Wu, a high school student and programmer from Maryland, USA." key="ogdesc"/>
      </Head>

      <Container maxW="container.lg" p={8}>
        <Flex py={{ base: 0, md: 6 }} direction={{ base: "column", md: "row" }}>
          <Box flex={2}>
            <Heading as="h1" size="xl">Linkai Wu</Heading>
            <Text fontSize="lg">High school student ~ fullstack developer</Text>
          </Box>

          <Flex flex={3} direction="column">
            <Box flex={1}/> {/* Filler div */}
            <HStack spacing={3} justify="flex-end">
              <Link href={config.socials.github} isExternal color="blue.500">github</Link>
              <Tooltip label={config.socials.email}>
                <Link href={`mailto:${config.socials.email}`} color="blue.500">email</Link>
              </Tooltip>
              {/*<Link>Linkedin</Link>*/}
            </HStack>
          </Flex>
        </Flex>

        <Flex py={4} direction={{ base: 'column-reverse', md: 'row' }}>
          <Box flex={2}>
            <Heading size="md">
              About Me
            </Heading>

            <Text mt={2}>
              Hi! ✋ I'm Linkai Wu, a high school student and programmer from Maryland, USA.
              I am very passionate about all things tech and computer science, and I strive to learn, grow, and make a difference in my community.
              My interests include but are not limited to full-stack and frontend development, app development, software engineering, and AI + machine learning. Technology and STEM aside, I also enjoy gaming, listening and creating music, educating and tutoring, and more.
            </Text>

            <Text mt={3}>
            Thank you for visiting my website!
            I am routinely updating the content on this page and I'm occasionally adding articles about cool stuff that I'm working on.
            Feel free to look around and come say hi!
            </Text>
          </Box>

          <Flex flex={1} 
            ml={{ base: 0, md: 12 }} mb={{ base: 8, md: 0 }} p={4}
            align="center" justify="center"
          >
            <Image
              src="/assets/linkai.png"
              borderRadius="100%"
              w="80%" maxW="300px"
            />
          </Flex>
        </Flex>
        
        <Box py={6}>
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
            {articlesData.sort(sortArticles).map(article => 
              <Box key={article.slug}
                p={4} position="relative"
                bg={
                  config.categories.filter(c => {
                    return article.category === c.slug;
                  })[0]?.color || 'gray.100'
                }
              >
                <Heading size="lg">{article.emoji}</Heading>
                
                <NextLink href={`/articles/${article.slug}`} passHref>
                  <Link>
                    <Heading size="md" mt={2}>{article.title}</Heading>
                  </Link>
                </NextLink>

                <Text>
                  {article.description}
                </Text>
                <Text color="gray.500" fontSize="sm">
                  {article.date}
                  &nbsp;|&nbsp;
                  <NextLink href={`/articles/${article.slug}`} passHref>
                    <Link fontSize="sm" color="blue.500">Read more</Link>
                  </NextLink>
                </Text>
              </Box>
            )}
          </Masonry>
          
          <HStack>
            <NextLink href="/articles" passHref>
              <Link><Tag size="lg">see all</Tag></Link>
            </NextLink>
            
            {config.categories.map(c =>
              <NextLink href={`/articles?filter=${c.slug}`} key={c.slug} passHref>
                <Link><Tag size="lg" colorScheme={c.colorScheme}>{c.name.toLowerCase()}</Tag></Link>
              </NextLink>
            )}
          </HStack>
        </Box>
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

export async function getStaticProps() {
  const articlesData = await getPinnedArticlesData();

  return {
    props: {
      articlesData,
    },
  };
}