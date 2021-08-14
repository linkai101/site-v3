import React from 'react';
import NextLink from 'next/link';
import config from '../data/config';

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
} from '@chakra-ui/react';
import Masonry from "react-masonry-css";

export default function Home() {
  return (
    <Container maxW="container.lg" p={8}>
      <Flex py={6} direction={{ base: "column", md: "row" }}>
        <Box flex={2}>
          <Heading as="h1" size="xl">linkai wu</Heading>
          <Text fontSize="lg">high school student ~ fullstack developer</Text>
        </Box>

        <Flex flex={3} direction="column">
          <Box flex={1}/> {/* Filler div */}
          <HStack spacing={3} justify="flex-end">
            <Link href={config.socials.github} isExternal>github</Link>
            <Tooltip label={config.socials.email}>
              <Link href={`mailto:${config.socials.email}`}>email</Link>
            </Tooltip>
            <Tooltip label="I don't have a LinkedIn yet!">
              <Link>linkedin</Link>
            </Tooltip>
          </HStack>
        </Flex>
      </Flex>
      
      <Box py={4}>
        <Heading size="md" mb={2}>
          some stuff i'm working on
        </Heading>

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
          <Box bg="orange.100" p={4}>
            <Heading size="lg">🖥️</Heading>
            <Heading size="md" mt={2}>Blair Hack Club</Heading>
            <Text>
              President and co-founder of Blair's Hack Club, a club that promotes creative coding and fosters a welcoming community of makers and engineers.
            </Text>
            <Text color="gray.500" fontSize="sm">
              March 2021 - present
            </Text>
          </Box>

          <Box bg="orange.100" p={4}>
            <Heading size="lg">📅</Heading>
            <Heading size="md" mt={2}>BlairHacks</Heading>
            <Text>
              Co-director of BlairHacks_5 (February 2022), a part of the BlairHacks series at MBHS for high school students in the DMV area. Attendees are challenged to bring their innovative ideas to life in the form of websites, apps, and robots.
            </Text>
            <Text color="gray.500" fontSize="sm">
              May 2021 - present
            </Text>
          </Box>

          <Box bg="yellow.100" p={4}>
            <Heading size="lg">🏆</Heading>
            <Heading size="md" mt={2}>President's Volunteer Service Award 2021</Heading>
            <Text>
              Incoming gold award for over 100 [additional] hours of community service to a youth education center, where I was a lead instructor and taught, managed, and inspired young students in STEM topics and activities.
            </Text>
            <Text color="gray.500" fontSize="sm">
              October 2020 - present
            </Text>
          </Box>

          <Box bg="blue.100" p={4}>
            <Heading size="lg">🗳️</Heading>
            <Heading size="md" mt={2}>Pollster</Heading>
            <Text>
              A winning project submitted to MoCoHacks 2021. Pollster, co-created along with Tinu Vanapamula and Anurag Gowda, is a geo-based community polling app made to allow businesses and organizations to poll and market to their regional communities.
            </Text>
            <Text color="gray.500" fontSize="sm">
              March 2021
            </Text>
          </Box>

          <Box bg="yellow.100" p={4}>
            <Heading size="lg">🏆</Heading>
            <Heading size="md" mt={2}>President's Volunteer Service Award 2019</Heading>
            <Text>
              Silver award for over 75 hours of community service to a youth education center, where I assisted in instructing STEM and extracurricular classes and activities.
            </Text>
            <Text color="gray.500" fontSize="sm">
              June 2019 - July 2019
            </Text>
          </Box>
        </Masonry>
      </Box>
      
      <Box py={4}>
        <Heading size="md" mb={2}>
          see all
        </Heading>
        
        <HStack>
          <NextLink href="/articles" passHref>
            <Link><Tag size="lg">all articles</Tag></Link>
          </NextLink>

          <NextLink href="/articles?category=career" passHref>
            <Link><Tag size="lg" colorScheme="orange">career</Tag></Link>
          </NextLink>

          <NextLink href="/articles?category=projects" passHref>
            <Link><Tag size="lg" colorScheme="blue">projects</Tag></Link>
          </NextLink>

          <NextLink href="/articles?category=awards" passHref>
            <Link><Tag size="lg" colorScheme="yellow">awards</Tag></Link>
          </NextLink>
        </HStack>
      </Box>
    </Container>
  );
}
