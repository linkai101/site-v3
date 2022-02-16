import React from 'react';
import Head from 'next/head';
import NextLink from 'next/link';
import config from '../../content/config';

import matter from "gray-matter";
import { MDXRemote } from 'next-mdx-remote';
import { serialize } from 'next-mdx-remote/serialize';
import { getArticleSlugs, getArticleContent } from "../../lib/articles";

import {
  Container,
  Flex,
  Box,
  Stack,
  Heading,
  Text,
  Link,
  Tag,
  TagLabel,
  Avatar,
  useBreakpointValue,
} from '@chakra-ui/react';
import Emoji from '../../components/Emoji';

export default function ArticlePage({ params, source, matter }) {
  const category = matter.category && config.categories.filter(c => {
    return matter.category === c.slug;
  })[0];

  return (
    <>
      <Head>
        <title>{matter.title}{config.titleSuffix}</title>
        <meta property="og:title" content={`${matter.title}${config.titleSuffix}`} key="ogtitle"/>
        <meta name="description" content=""/>
        <meta property="og:description" content="" key="ogdesc"/>
      </Head>

      <Container maxW="container.lg" p={8}>
        <NextLink href="/" passHref>
          <Link color="blue.500">&#60; back to homepage</Link>
        </NextLink>

        <Box py={4}>
          <Heading as="h1" size="xl" mb={2}>
            <Emoji symbol={matter.emoji}/> {matter.title}
          </Heading>

          <Stack direction="row" mt={4}>
            <Tag size={useBreakpointValue({ base: "sm", md: "md" })} borderRadius="full">
              <Avatar size="xs"
                src="/assets/linkai.png" name="Linkai Wu"
                ml={-1} mr={2}
              />
              <TagLabel>Linkai Wu</TagLabel>
            </Tag>

            {matter.date && 
              <Tag size={useBreakpointValue({ base: "sm", md: "md" })} borderRadius="full">
                📅 {matter.date}
              </Tag>
            }

            {category && 
              <Tag size={useBreakpointValue({ base: "sm", md: "md" })} borderRadius="full" colorScheme={category.colorScheme}>
                {category.emoji} {category.name}
              </Tag>
              ||
              <Tag size="md" borderRadius="full">
                {matter.category}
              </Tag>
            }
          </Stack>
        </Box>

        <MDXRemote {...source} /*components={components}*//>
      </Container>
    </>
  )
}

export async function getStaticPaths() {
  const paths = getArticleSlugs();
  return {
    paths,
    fallback: false
  };
}

export async function getStaticProps({ params }) {
  const articleContent = await getArticleContent(params.slug);
  const { data, content } = matter(articleContent);
  const mdxSource = await serialize(content, { scope: data });

  return {
    props: {
      params,
      source: mdxSource,
      matter: data
    }
  };
}