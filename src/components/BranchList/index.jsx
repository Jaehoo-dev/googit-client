import React from 'react';
import { Wrapper } from './styledComponents';
import NoteListHead from './BranchListHead';
import NoteListBody from './BranchListBody';
import Tempforsharing from './tempforsharing'

export default function BranchList({ isPrivateMode, currentUser, branchList, onScroll }) {

  return (
    <Wrapper>
      <NoteListHead />
      <NoteListBody branchList={branchList} onScroll={onScroll} />
    </Wrapper>
  );
}
