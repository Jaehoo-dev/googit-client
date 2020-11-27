import React from 'react';
import { NoteListWrapper } from '../styledComponents';
import NoteListEntry from '../NoteListEntry';

export default function NoteList({
  noteListEntryInfos,
  onNoteListEntryClick,
}) {

  function createBranchEntries() {
    return noteListEntryInfos.map((list, i) => {

      return (
        <NoteListEntry
          key={i}
          onNoteListEntryClick={onNoteListEntryClick}
          entryInfos={list}
          count={i}
          creator={list.author.username}
        />
      );
    });
  }

  return (
    <NoteListWrapper>
      {noteListEntryInfos && createBranchEntries()}
    </NoteListWrapper>
  );
}
