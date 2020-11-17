import React, { useEffect } from 'react';
import styled from 'styled-components';
import fetchNoteList from '../../../api/noteListRequest';
import NoteListHead from './NoteListHead';
import NoteListBody from './NoteListBody';

const Wrapper = styled.div`
  margin-top: 6em;
`;

export default function NoteList({ isPrivate, currentUser }) {
  let notes;

  useEffect(() => {
    console.log(isPrivate, 'note list');
    const result = fetchNoteList(isPrivate, currentUser);
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
