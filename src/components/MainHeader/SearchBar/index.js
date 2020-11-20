import React, { useState } from 'react';
import styled from 'styled-components';
import SearchInput from './searchInput.js';
import SearchIcon from './serachIcon.js';

const Form = styled.form`
  width: 50em;
  display: grid;
  grid-template-columns: 20fr 1fr;
  border-bottom: 1px solid black;
`;

export default function SearchBar({ handleInput }) {
  const [keyword, setKeyword] = useState('');

  function handleKeywordsChange(e) {
    setKeyword(e.target.value);
  };

  function handleOnSubmit(e) {
    e.preventDefault();
    if (!keyword) return;
    setKeyword('');
    handleInput(e);
  }

  return (
    <Form onSubmit={handleOnSubmit}>
      <SearchInput handleOnChange={handleKeywordsChange} keyword={keyword} />
      <SearchIcon />
    </Form>
  );
}
