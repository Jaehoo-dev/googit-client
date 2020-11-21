import React from 'react';
import styled from 'styled-components';

const Wrapper = styled.div`
  /* width: 80%;
  height: 2em;
  margin: 0 5em;
  padding: 0 3em;
  font-size: 1em;
  text-align: center; */
  display: grid;
  grid-template-columns: 2em 2fr 1fr 10em 5em;
  grid-gap: 1em;
  align-items: center;
`;

export default function NoteListEntry({ noteContents }) {
  // console.log(noteContents,'entry')
  const notes = noteContents.map((noteContent, i) => (
    <div key={i}>{noteContent}</div>
  ));
  return (
    <Wrapper>
      {notes}
    </Wrapper>
  );
}
