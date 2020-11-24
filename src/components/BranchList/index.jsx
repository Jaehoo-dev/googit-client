import React from 'react';
import { Wrapper } from './styledComponents';
import NoteListHead from './BranchListHead';
import NoteListBody from './BranchListBody';

export default function BranchList({
  isPrivateMode,
  currentUser,
  branchList,
  setCurrentNoteAndBranch,
}) {

  return (
    <Wrapper>
      <NoteListHead />
      <NoteListBody
        branchList={branchList}
        setCurrentNoteAndBranch={setCurrentNoteAndBranch}
      />
    </Wrapper>
  );
}
