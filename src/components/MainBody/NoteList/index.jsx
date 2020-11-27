import React from 'react';
import { NoteListWrapper } from '../styledComponents';
import NoteListEntry from '../NoteListEntry';

export default function NoteList({
  branchList,
  onNoteListEntryClick,
}) {

  function createBranchEntries() {
    return branchList.map((list, i) => (
      <NoteListEntry
        key={i}
        onNoteListEntryClick={onNoteListEntryClick}
        branchContent={list.branch}
        count={i}
        creator={list.email}
      />
    ));
  }

  return (
    <NoteListWrapper>
      {branchList && createBranchEntries()}
    </NoteListWrapper>
  );
}
