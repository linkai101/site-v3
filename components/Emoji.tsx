import React from 'react';

import {
  Text
} from '@chakra-ui/react';

export default function Emoji({ symbol, label, ...rest }: { symbol: string; label?: string; [key: string]:any }) {
  return (
    <Text as="span"
      style={{ fontWeight:"normal" }}
      role="img"
      aria-label={label ? label : ""}
      aria-hidden={label ? "false" : "true"}
      {...rest}
    >
      {symbol}
    </Text>
  )
}
