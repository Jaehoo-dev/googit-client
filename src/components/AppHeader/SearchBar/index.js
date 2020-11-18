import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import SearchInput from './searchInput.js';
import SearchIcon from './serachIcon.js';
import { apiSearchNoteByKeywords, apiSearchAutoComplete } from '../../../api/apiKeywordSerach';

const Form = styled.form`
  width: 50em;
  display: grid;
  grid-template-columns: 20fr 1fr;
  border-bottom: 1px solid black;
`;

export default function SearchBar({ onLoad }) {
  const [keyword, setKeyword] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);

  useEffect(() => {
    if (isSubmitted) {
      const result = apiSearchNoteByKeywords(keyword);  // 이건 서브밋 될때마다
      // onLoad(result)
      // 리절트는 노트의 리스트
      // 리절트 값에 따라서 리덕스에 스테이트 저장하고
      // 메인 페이지에서 불러다 뿌려야함
      setIsSubmitted(!isSubmitted);
    }
  }, [isSubmitted]);

  useEffect(() => {
    if (keyword) {
      const result = apiSearchAutoComplete(keyword);  //이건 한번씩 칠때마다
    }
  }, [keyword]);

  function handleKeywordsChange(e) {
    console.log('change');
    setKeyword(e.target.value);
  };

  function handleOnSubmit(e) {
    console.log('submit');
    e.preventDefault();

    setKeyword('');
    setIsSubmitted(!isSubmitted);
  }

  return (
    <Form onSubmit={handleOnSubmit}>
      <SearchInput handleOnChange={handleKeywordsChange} keyword={keyword} />
      <SearchIcon />
    </Form>
  );
}
