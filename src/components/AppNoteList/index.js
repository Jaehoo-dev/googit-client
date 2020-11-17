import React, { useEffect } from 'react';
import styled from 'styled-components';
import apiNoteList from '../../api/noteListRequest';
import NoteListHead from './NoteListHead';
import NoteListBody from './NoteListBody';

const Wrapper = styled.div`
  margin-top: 6em;
  
`;

export default function AppNoteList({ isPrivate }) {
  let notes;

  useEffect(() => {
    const result = apiNoteList(isPrivate);
    // notes = result.xxx
  });

  const tempNote = [1, 'title1', 'han', 20201116, 'shared'];

  notes = [];
  for (var i = 0; i < 10; i++) {
    notes.push(tempNote);
  }

  return (
    <Wrapper>
      <NoteListHead />
      <NoteListBody noteList={notes} />
    </Wrapper>
  );
}
