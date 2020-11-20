import React from 'react';
import styled from 'styled-components';
import NoteListEntry from '../NoteListEntry';

const Wrapper = styled.div`
  width: 80%;
  height: 100vh;
  margin: 0 5em;
  padding: 0 3em;
  font-size: 1em;
  text-align: center;
`;

export default function NoteListBody({ noteList }) {
  // console.log(noteList, 'NoteListBody');

  const NoteContainer = styled.div`
    display: grid;
    grid-template-rows: repeat(${noteList.length}, 2em);
    grid-gap: 2em;
    border: 1px solid pink;
  `;

  const notes = noteList.map((note, i) => {
    return <NoteListEntry key={i} noteContents={note} />;
  });

  return (
    <Wrapper>
      <NoteContainer>
        {notes}
      </NoteContainer>
    </Wrapper>
  );
}
