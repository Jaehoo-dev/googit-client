import React from 'react';
import { Wrapper } from '../styledComponents';
import Button, { coralButtonTheme } from '../../shared/Button';

export default function PrivateNotesToggleButton({ buttonMode, onClick }) {
  const content = buttonMode ? '모든 노트 보기' : '나만의 노트 보기';

  function clickHandler() {
    onClick();
  };

  return (
    <Wrapper>
      <Button theme={coralButtonTheme} onClick={clickHandler}>{content}</Button>
    </Wrapper>
  );
}
