import React from 'react';
import StyledInputArea from '../../shared/InputArea';

export default function SearchInput({ onChange, keyword }) {
  return (
    <StyledInputArea
      name='keyword'
      value={keyword}
      placeholder='Plz type keyword!'
      onChange={onChange}
    />
  );
}
