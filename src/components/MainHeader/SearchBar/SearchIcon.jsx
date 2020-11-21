import React from 'react';
import { ThemeProvider } from 'styled-components';
import Button, { searchButtonTheme } from '../../shared/Button';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';

export default function SearchIcon() {

  return (
    <ThemeProvider theme={searchButtonTheme}>
      <Button type='submit'>
        <FontAwesomeIcon icon={faSearch} />
      </Button>
    </ThemeProvider>
  );
}
