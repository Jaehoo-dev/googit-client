import React from 'react';
import Button, { iconButtonTheme } from '../../shared/Button';
import SearchIcon from '@material-ui/icons/Search';

export default function SearchIconButton() {
  return (
    <Button theme={iconButtonTheme} type='submit'>
      <SearchIcon />
    </Button>
  );
}
