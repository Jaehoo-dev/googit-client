import React from 'react';
import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';

const Button = styled.button`
  background-color: transparent;
  border: 0px solid;
`;

export default function SearchIcon() {

  return (
    <Button type='submit'>
      <FontAwesomeIcon icon={faSearch}/>
    </Button>
  );
}
