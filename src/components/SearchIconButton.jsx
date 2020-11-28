import React from 'react';
import Button, { iconButtonTheme } from './Button';
import SearchIcon from '@material-ui/icons/Search';

export default function SearchIconButton() {
  return (
    <Button theme={iconButtonTheme} type='submit'>
      <SearchIcon />
    </Button>
  );
}
