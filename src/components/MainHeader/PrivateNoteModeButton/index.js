import React from 'react';
import styled from 'styled-components';

const Wrapper = styled.div`
  margin-left: 2em;
`;

const Button = styled.button`
  margin-top: 5px;
  color: #04040a !important;
  text-decoration: none;
  background: #9e9ea8;
  padding: 10px;
  border: 1px solid #9e9ea8 !important;
  display: inline-block;
  transition: all 0.4s ease 0s;
  border-radius: 20px;

  &:hover {
    color: #ffffff !important;
    background: #f6b93b;
    border-color: #f6b93b !important;
    transition: all 0.4s ease 0s;
  }
`;

export default function PrivateNoteModeButton({ buttonMode, handleOnClick }) {
  let content;
  buttonMode ? content = '모든 노트 보기' : content = '나만의 노트 보기';

  return (
    <Wrapper>
      <Button onClick={handleOnClick}>{content}</Button>
    </Wrapper>
  );
}
