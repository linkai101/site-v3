import React from 'react';
import Head from 'next/head';
import NextLink from 'next/link';
import { useRouter } from 'next/router';
import config from '../../data/config';
import { getArticlesPageData } from "../../lib/articles";

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
  const [category, setCategory] = React.useState("");

  React.useEffect(() => {
    checkQuery();
  }, [router]);

  function checkQuery() {
    if (router.query?.category) {
      if (!['career', 'projects', 'awards'].includes(router.query.category)) { // if is not a valid category
        return router.push(`/articles`, undefined, { shallow: true });
      }
      setCategory(router.query.category);
    }
  }

  return (
    <>
      <Head>
        <title>Articles{config.titleSuffix}</title>
        <meta property="og:title" content={`Articles${config.titleSuffix}`} key="ogtitle"/>
        <meta name="description" content=""/>
        <meta property="og:description" content="" key="ogdesc"/>
      </Head>

      <Container maxW="container.lg" p={8}>
        <NextLink href="/" passHref>
          <Link color="blue.500">&#60; back to homepage</Link>
        </NextLink>
        
        <Box py={4}>
          <Flex mb={4}>
            <Heading size="lg">
              articles
              <Text as="span" ml={2} fontSize="2xl" fontWeight="normal">by linkai wu</Text>
            </Heading>

            <Flex flex={1} direction="column">
              <Box flex={1}/> {/* Filler div */}
              {category &&
                <Text align="right">
                  filter:
                  <Tag ml={2} colorScheme={
                    category === 'career' ? 'orange'
                    : category === 'projects' ? 'blue'
                    : category === 'awards' ? 'yellow'
                    : 'gray'
                  }>{category}</Tag>
                </Text>
              }
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
            {articlesData.filter(a => filterArticles(a,category)).sort(sortArticles).map(article => 
              <Box key={article.slug}
                p={4} position="relative"
                bg={
                  article.category === 'career' ? 'orange.100'
                  : article.category === 'projects' ? 'blue.100'
                  : article.category === 'awards' ? 'yellow.100'
                  : 'gray.100'
                }
              >
                <Heading size="lg">{article.emoji}</Heading>
                <Heading size="md" mt={2}>{article.title}</Heading>
                <Text>
                  {article.description}
                </Text>
                <Text color="gray.500" fontSize="sm">
                  {article.date}
                </Text>

                {article.pinned && <Text as="span"
                  position="absolute" top="12px" right="12px"
                >📌</Text>}
              </Box>
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

function filterArticles(a, category) {
  if (!category) return true;
  return a.category === category;
}

export async function getStaticProps() {
  const articlesData = await getArticlesPageData();

  return {
    props: {
      articlesData,
    },
  };
}