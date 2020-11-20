import React from 'react';
import styled, { ThemeProvider } from 'styled-components';
import Button from '../../Button';

const Wrapper = styled.div`
  margin-left: 2em;
`;

export default function PrivateNoteModeButton({ buttonMode, handleOnClick }) {
  let content;
  buttonMode ? content = '모든 노트 보기' : content = '나만의 노트 보기';

  return (
    <Wrapper>
      <ThemeProvider>
        <Button onClick={handleOnClick}>{content}</Button>
      </ThemeProvider>
    </Wrapper>
  );
}
