import React from 'react';
import styled from 'styled-components';

const Input = styled.input`
  border: 0 solid;

  &:focus {
    outline: none;
  }
`;

export default function SearchInput({ handleOnChange, keyword }) {
  return (
    <Input
      name='keywords'
      value={keyword}
      placeholder='Plz type keywords!'
      onChange={handleOnChange}
    />
  );
}
