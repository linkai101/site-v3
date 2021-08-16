import React from 'react';
import NextLink from 'next/link';
import config from '../data/config';

import {
  Container,
  Flex,
  HStack,
  Text,
  Tooltip,
  Link,
} from '@chakra-ui/react';

export default function Footer() {
  return (
    <Container maxW="container.xl" bg="gray.100" p={4}>
      <Flex direction={{ base: "column", md: "row" }}>
        <Text align={{ base: "center", md: "left" }} my={1}>
          &copy; linkai wu
        </Text>

        <HStack flex={1} px={6} justify={{ base: "center", md: "flex-start" }} spacing={4} my={1}>
          <NextLink href="/" passHref>
            <Link>home</Link>
          </NextLink>
          <NextLink href="/articles" passHref>
            <Link>articles</Link>
          </NextLink>
          <Link href="https://resume.linkaiwu.com" isExternal>👔 Resume</Link>
        </HStack>

        <HStack flex={1} px={6} justify={{ base: "center", md: "flex-end" }} spacing={4} my={1}>
          <Link href={config.socials.github} isExternal>github</Link>
          <Tooltip label={config.socials.email}>
            <Link href={`mailto:${config.socials.email}`}>email</Link>
          </Tooltip>
          {/*<Link>linkedin</Link>*/}
        </HStack>
      </Flex>
    </Container>
  )
}
