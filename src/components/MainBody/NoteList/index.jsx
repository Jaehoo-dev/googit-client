import React from 'react';
import { NoteListWrapper } from '../styledComponents';
import NoteListEntry from '../NoteListEntry';

export default function NoteList({
  noteListEntryInfos,
  onNoteListEntryClick,
}) {
  function createBranchEntries() {
    return noteListEntryInfos.map((list, i) => (
      <NoteListEntry
        key={list.latestNote._id}
        onNoteListEntryClick={onNoteListEntryClick}
        entryInfos={list}
        count={i}
        creator={list.author.username}
      />
    ));
  }

  return (
    <NoteListWrapper>
      {noteListEntryInfos && createBranchEntries()}
    </NoteListWrapper>
  );
}
