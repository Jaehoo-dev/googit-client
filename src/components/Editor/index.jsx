import React from 'react';
import { Wrapper } from './styledComponents';
import Slate from '../SlateJs';

export default function Editor({
  onNoteChange,
  isChanged,
}) {
  return (
    <Wrapper>
      <Slate
        onNoteChange={onNoteChange}
        isChanged={isChanged}
      />
    </Wrapper>
  );
}
