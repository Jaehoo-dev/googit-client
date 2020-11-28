import React from 'react';
import Button, { iconButtonTheme } from '../../shared/Button';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import SearchIcon from '@material-ui/icons/Search';

export default function SearchIconButton() {

  return (
    <Button theme={iconButtonTheme} type='submit'>
      {/* <FontAwesomeIcon icon={faSearch} /> */}
      <SearchIcon />
    </Button>
  );
}
