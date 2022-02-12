import React from 'react';
import { useColorMode, IconButton } from '@chakra-ui/react';
import { SunIcon, MoonIcon } from '@chakra-ui/icons';
import Emoji from './Emoji';

export default function ColorModeToggle(props) {
  const { ...rest }: { [key: string]:any } = props;
  const { colorMode, toggleColorMode } = useColorMode();

  return (
    <IconButton
      size="sm"
      icon={colorMode === 'light' ? <Emoji symbol='☀️'/> : <Emoji symbol='🌙'/>}
      colorScheme={colorMode === 'light' ? "gray" : "whiteAlpha"}
      onClick={toggleColorMode}
      aria-label="Toggle color mode"
      {...rest}
    />
  )
}