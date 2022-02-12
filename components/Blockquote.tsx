import React from 'react';
import {
  Box,
} from '@chakra-ui/react';

export default function Blockquote(props: { [key: string]:any }) {
  return (
    <Box borderLeftWidth={4} pl={6} {...props}/>
  )
}