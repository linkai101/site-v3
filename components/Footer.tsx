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
  Button,
} from '@chakra-ui/react';
import ColorModeToggle from './ColorModeToggle';

export default function Footer() {
  return (
    <Container maxW="container.xl" p={4}>
      <Flex direction="row" align="center">
        <Text my={1}>
          (c) Linkai Wu
        </Text>

        {/*<HStack flex={1} px={6} justify={{ base: "center", md: "flex-start" }} spacing={4} my={1}>
          <NextLink href="/" passHref>
            <Link>home</Link>
          </NextLink>
        </HStack>*/}

        <HStack flex={1} px={6} justify="flex-end" align="right" spacing={4} my={1}>
          <ColorModeToggle/>

          {/*{Object.entries(config.socials).map(([key,value]) =>
            key === 'email' ?
              <Tooltip label={value} key={key}>
                <Link href={`mailto:${value}`} color="theme.primary2">{key}</Link>
              </Tooltip>
            :
              <Link href={value} isExternal color="theme.primary2" key={key}>{key}</Link>
          )}*/}
        </HStack>
      </Flex>
    </Container>
  )
}
