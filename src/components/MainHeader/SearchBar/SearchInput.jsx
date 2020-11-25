import React from 'react';
import StyledInputArea from '../../shared/InputArea';

export default function SearchInput({ onChange, keyword }) {
  return (
    <StyledInputArea
      name='keyword'
      value={keyword}
      placeholder='검색어를 입력하세요'
      onChange={onChange}
    />
  );
}
