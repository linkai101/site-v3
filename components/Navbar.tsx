import React from 'react';
import NextLink from 'next/link';
import { motion } from 'framer-motion';

import {
  Stack,
  Text,
} from '@chakra-ui/react';

export default function Navbar() {
  return (
    <Stack position="fixed" top={6} left={6} spacing={1}>
      <motion.div
        whileHover={{ translateX: 5 }}
        whileTap={{ translateX: -2 }}
      >
        <NextLink href="/">
          <Text
            fontSize="md"
            fontWeight="thin"
            userSelect="none"
            opacity={0.6}
            _hover={{ opacity: 0.8 }}
          >
            home
          </Text>
        </NextLink>
      </motion.div>
      
      <motion.div
        whileHover={{ translateX: 5 }}
        whileTap={{ translateX: -2 }}
      >
        <NextLink href="/">
          <Text
            fontSize="md"
            fontWeight="thin"
            userSelect="none"
            opacity={0.6}
            _hover={{ opacity: 0.8 }}
          >
            portfolio
          </Text>
        </NextLink>
      </motion.div>
      
      <motion.div
        whileHover={{ translateX: 5 }}
        whileTap={{ translateX: -2 }}
      >
        <NextLink href="/">
          <Text
            fontSize="md"
            fontWeight="thin"
            userSelect="none"
            opacity={0.6}
            _hover={{ opacity: 0.8 }}
          >
            blog
          </Text>
        </NextLink>
      </motion.div>
    </Stack>
  );
}
