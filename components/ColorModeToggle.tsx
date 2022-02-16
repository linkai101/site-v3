import React from 'react';
  
import { useColorMode, IconButton } from '@chakra-ui/react';
import Icon from 'supercons';

export default function ColorModeToggle(props) {
  const { ...rest }: { [key: string]:any } = props;
  const { colorMode, toggleColorMode } = useColorMode();

  return (
    <IconButton
      size="sm"
      icon={colorMode === 'light' ? <Icon glyph="moon" size={32}/> : <Icon glyph="moon-fill" size={32}/>}
      variant="ghost"
      onClick={toggleColorMode}
      aria-label="Toggle color mode"
      {...rest}
    />
  )
}