import React from 'react';
import Head from 'next/head';
import NextLink from 'next/link';
import { motion } from 'framer-motion';
import Icon from 'supercons';

import config from '../content/config';

//import { MDXRemote } from 'next-mdx-remote';
//import { serialize } from 'next-mdx-remote/serialize';
//import { getPortfolio } from "../lib/portfolio";

import {
  Container,
  Flex,
  Box,
  Stack,
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
import ColorModeToggle from '../components/ColorModeToggle';

import Navbar from '../components/Navbar';

export default function Home({ /* portfolio */ }) {
  return (
    <>
      <Head>
        <meta name="description" content={config.description}/>
        <meta property="og:description" content={config.description} key="ogdesc"/>
      </Head>

      {/* NAVBAR
      <Navbar/> */}

      {/* COLOR MODE */}
      <Box position="fixed" top={{ base:4, md:6 }} right={{ base:4, md:6 }}>
        <ColorModeToggle/>
      </Box>

      {/* HEADER */}
      <Box bg={useColorModeValue("bg.light2", "bg.dark2")}>
        <Container maxW="container.lg">
          <Flex minH={{ base:"auto", md:"280px" }} p={4} pt={{ base:12, md:"auto" }}
            sx={{ gap: { base: 8, md: 0 } }}
            align="center"
            direction={{ base:"column", xs:"row" }}
          >
            <Image
              src="/assets/linkai.png"
              borderRadius="100%"
              w="20%"
              maxW="220px" minW="100px"
            />

            <Box flex={1} px={{ base: 4, md: 12 }} py={{ base: 2, md: 8 }}>
              <Heading as="h1" size="2xl">
                Linkai Wu
              </Heading>

              <Stack direction="row" mt={{ base:2, md:3 }} spacing={3}>
                <Tag borderRadius="full" variant="outline" fontWeight="semibold" boxShadow="0 0 0px 2px #718096">
                  <Emoji symbol="📌" mr={1}/> dmv
                </Tag>
                <Link href="https://mbhs.edu" style={{ textDecoration: "none" }} isExternal>
                  <Tag borderRadius="full" variant="outline" fontWeight="semibold" boxShadow="0 0 0px 2px #718096">
                  Blair HS
                  </Tag>
                </Link>
              </Stack>

              {config.bio && <Text mt={4}>{config.bio}</Text>}

              {/*
              <Stack direction="row" mt={4} spacing={3}>
                {Object.entries(config.socials).map(([key,value]) =>
                  <Tooltip label={key} key={key}>
                    <Link href={value.href} color="text.muted" isExternal>
                      <Icon glyph={value.glyph} size={32}/>
                    </Link>
                  </Tooltip>
                )}
              </Stack>
              */}
            </Box>
          </Flex>
        </Container>
      </Box>
      
      {/* PINNED */}
      <Container maxW="container.lg" p={8}>
        <Masonry
          breakpointCols={{ default: 3, 1100: 2, 700: 1 }}
          className="masonry-grid"
          columnClassName="masonry-column"
        >
          {config.pinned.map(a =>
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.98 }}
              key={a.title}
            >
              <NextLink href={a.url}>
                <Box
                  p={4} pt={a.icon ? 8 : 'auto'} position="relative" overflow="hidden"
                  borderRadius="xl"
                  bg={useColorModeValue('gray.100', 'bg.dark2')}
                  cursor="pointer"
                  zIndex={-2}
                >
                  {a.icon &&
                    <Image src={a.icon} w="50%" position="absolute" top="-15%" left="-15%" opacity="15%" zIndex={-1} userSelect="none"/>
                  }
                  <Heading size="md" mt={2}>{a.title}</Heading>
                  <Box fontSize="sm" mt={1}>
                    {a.description}
                  </Box>
                </Box>
              </NextLink>
            </motion.div>
          )}
        </Masonry>
      </Container>

      {/* LINKS 
      <Container maxW="container.md" px={8} py={{ base: 8, md: 12 }}>
        <Stack spacing={4}>
          {config.links.map((e,i) => {
            switch (e.type) {
              case "link":
                return (
                  <motion.div
                    whileHover={{ scale: 1.01 }}
                    whileTap={{ scale: 0.99 }}
                    key={e.text}
                  >
                    <NextLink href={e.href}>
                      <Box
                        p={4} position="relative"
                        borderRadius="xl"
                        bg={
                          useColorModeValue('gray.100', 'bg.dark2')
                        }
                        userSelect="none"
                      >
                        <Heading as="h3"
                          size="sm"
                          textAlign="center"
                          fontWeight="semibold"
                        >
                          {e.text}</Heading>
                      </Box>
                    </NextLink>
                  </motion.div>
                );
              case "header":
                return (
                  <Heading
                    p={2} pt={(i !== 0) ? 8 : 0} position="relative"
                    size="sm"
                    textAlign="center"
                    key={e.text}
                  >{e.text}</Heading>
                );
            }
          })}
        </Stack>
      </Container>
      */}

      {/* PORTFOLIO */}
      {/*<Container maxW="container.lg" p={8}>
        <Heading size="lg">portfolio</Heading>
        <Text mt={2} mb={6}>A collection of my projects, activities, and endeavors!</Text>

        <Masonry
          breakpointCols={{ default: 3, 1100: 2, 700: 1 }}
          className="masonry-grid"
          columnClassName="masonry-column"
        >
          {portfolio.map(i =>
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.98 }}
              key={i.slug}
            >
              <NextLink href={i.href}>
                <Box
                  p={4} position="relative"
                  borderRadius="xl"
                  bg={
                    useColorModeValue('gray.100', 'bg.dark2')
                  }
                >
                  <Heading size="lg"><Emoji symbol={i.emoji}/></Heading>
                  <Heading size="md" mt={2}>{i.title}</Heading>
                  <Box my={-3} fontSize="sm">
                    <MDXRemote {...i.source}/>
                  </Box>
                </Box>
              </NextLink>
            </motion.div>
          )}
        </Masonry>
      </Container>*/}

      {/* BLOG */}
      {/*<Container maxW="container.lg" p={8}>
        <Heading size="lg">blog</Heading>
        <Text mt={2} mb={6}>A few of my ideas, devlogs, and experiments that I wanna share :)</Text>

        <Masonry
          breakpointCols={{ default: 4, 1100: 3, 800: 2, 550: 1 }}
          className="masonry-grid"
          columnClassName="masonry-column"
        >
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.98 }}
            key="1"
          >
            <Box
              position="relative"
              borderRadius="xl"
              bg={useColorModeValue('gray.100', 'bg.dark2')}
              overflow="hidden"
            >
              <Image w="100%" h="128px"
                src="https://ichef.bbci.co.uk/news/976/cpsprodpb/F025/production/_96277416_gettyimages-453879976.jpg" alt="example thumbnail"
                objectFit="cover"
              />
              <Box p={4}>
                <Heading size="md">example post</Heading>
                <Text fontSize="xs" fontStyle="italic" fontWeight="semibold" color="text.muted">
                  FEB 11 2022
                </Text>
                
                <HStack spacing={3} mt={2}>
                  <Tag borderRadius="full" variant="outline" fontWeight="semibold" size="sm" boxShadow="0 0 0px 2px #718096">
                    tag
                  </Tag>
                </HStack>

                <Text fontSize="sm" mt={2}>
                  This is an example blog post!
                </Text>
              </Box>
            </Box>
          </motion.div>
        </Masonry>
        </Container>*/}
    </>
  );
}

/*export async function getStaticProps() {
  let portfolio = await getPortfolio();

  const newPortfolio = await Promise.all(portfolio.map(async i => {
    let source = await serialize(i.content, { scope: i });
    return { ...i, source };
  }));

  return {
    props: {
      portfolio: newPortfolio,
    },
  };
}*/