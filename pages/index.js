import React from 'react';

import {
  Container,
  Flex,
  Box,
  HStack,
  Heading,
  Text,
  Link,
} from '@chakra-ui/react';
import Masonry from "react-masonry-css";


export default function Home() {
  return (
    <>
      <Container maxW="container.lg" p={8}>
        <Flex py={6}>
          <Box flex={2}>
            <Heading as="h1" size="xl">linkai wu</Heading>
            <Text fontSize="lg">high school student ~ fullstack developer</Text>
          </Box>

          <Flex flex={3} direction="column">
            <Box flex={1}/> {/* Filler div */}
            <HStack spacing={3} justify="flex-end">
              <Link href="https://github.com/linkai101">github</Link>
              <Link>email</Link>
              <Link>linkedin</Link>
            </HStack>
          </Flex>
        </Flex>
        
        <Box py={4}>
          <Heading size="md" mb={2}>
            ongoing endeavors
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
          </Masonry>
        </Box>
        
        <Box py={4}>
          <Heading size="md" mb={2}>
            past endeavors
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

            <Box bg="blue.100" p={4}>
              <Heading size="lg">🙋‍♂️</Heading>
              <Heading size="md" mt={2}>VolunteerX</Heading>
              <Text>
                A project made for the Congressional App Challenge in 2020. VolunteerX is a platform for broadcasting volunteer opportunities to local communities. Local businesses and organizations can utilize it to find volunteers to support their operations and eager citizens can use it to find volunteer opportunities in their own community.
              </Text>
              <Text color="gray.500" fontSize="sm">
                September 2020 - October 2020
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
      </Container>

      {/* FOOTER */}
      <Container maxW="container.xl" bg="gray.200" px={4} py={6}>
        <Flex>
          <Text>&copy; linkai wu</Text>
          <HStack flex={1} px={6}>
            <Link>👔 Resume</Link>
          </HStack>
        </Flex>
      </Container>
    </>
  );
}
