import React from 'react';
import Button, { iconButtonTheme } from '../../shared/Button';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';

export default function SearchIcon() {

  return (
    <Button theme={iconButtonTheme} type='submit'>
      <FontAwesomeIcon icon={faSearch} />
    </Button>
  );
}
