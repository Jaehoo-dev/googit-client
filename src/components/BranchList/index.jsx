import React from 'react';
import { Wrapper } from './styledComponents';
import NoteListHead from './BranchListHead';
import NoteListBody from './BranchListBody';

export default function BranchList({
  isPrivateMode,
  currentUser,
  branchList,
  onNoteListEntryClick,
}) {

  return (
    <Wrapper>
      <NoteListHead />
      <NoteListBody
        branchList={branchList}
        onNoteListEntryClick={onNoteListEntryClick}
      />
    </Wrapper>
  );
}
