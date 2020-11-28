import React from 'react';
import { Link } from 'react-router-dom';
import { MainBodyWrapper } from './styledComponents';
import NoteListHeader from './NoteListHeader';
import NoteList from './NoteList';
import Button, { createNewBranchTheme } from '../shared/Button';

export default function MainBody({
  noteListEntryInfos,
  onNoteListEntryClick,
}) {
  console.log(noteListEntryInfos);
  return (
    <MainBodyWrapper>
      <NoteListHeader />
      <Link to='/notes/new'>
        <Button theme={createNewBranchTheme}>
          새로운 노트 만들기 +
        </Button>
      </Link>
      <NoteList
        noteListEntryInfos={noteListEntryInfos}
        onNoteListEntryClick={onNoteListEntryClick}
      />
    </MainBodyWrapper>
  );
}
