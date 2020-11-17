import React, { useEffect } from 'react';
import styled from 'styled-components';
import fetchNoteList from '../../../api/noteListFetch';
import NoteListHead from './NoteListHead';
import NoteListBody from './NoteListBody';

const Wrapper = styled.div`
  margin-top: 6em;
`;

export default function NoteList({ isPrivate, currentUser }) {
  let notes


  // useEffect(() => {
  //   // console.log(isPrivate, 'note list');
  //   async function getNoteList() {
  //   const noteList = await fetchNoteList(isPrivate, currentUser);
  //   console.log(noteList, '이자리로 디스패치 함수를 불러서 리덕스에 넣는다.') // 이 유즈 이펙트 앱으로 올라가야할듯 
  //   }
  //   getNoteList();
    
  // }, [isPrivate]);

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
