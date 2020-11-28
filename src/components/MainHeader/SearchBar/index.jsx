import React, { useState } from 'react';
import { Form } from '../styledComponents';
import SearchInput from './SearchInput';
import SearchIconButton from './SearchIconButton';

export default function SearchBar({ handleInput, onSubmit }) {
  const [keyword, setKeyword] = useState('');

  function keywordChangeHandler(event) {
    setKeyword(event.target.value);
  };

  function submitHandler(event) {
    event.preventDefault();
    if (!keyword) return;
    setKeyword('');
    onSubmit();
    handleInput(event);
  }
  return (
    <Form onSubmit={submitHandler}>
      <SearchInput onChange={keywordChangeHandler} keyword={keyword} />
      <SearchIconButton />
    </Form>
  );
}
