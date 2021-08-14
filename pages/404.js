import React from 'react';

import {
  Flex,
  Box,
  Heading,
  Link,
  Button,
} from '@chakra-ui/react';

export default function Custom404() {
  return (
    <Flex
      minH="100vh"
      align="center" justify="center"
    >
      <Box align="center">
        <Heading size="md" fontWeight="normal">linkai wu</Heading>
        <Heading as="h1" size="lg">four oh four: not found</Heading>
        <Link href="/" style={{ textDecoration: "none" }}>
          <Button mt={3} size="sm" fontWeight="normal">
            {Math.floor(Math.random() * 100) === 69 ? 
              "mom take me home im scared" 
              : "take me home"
            }
          </Button>
        </Link>
      </Box>
    </Flex>
  );
}
