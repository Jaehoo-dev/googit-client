import React from 'react';
import { Link } from 'react-router-dom';
import { NoteListEntryWrapper } from '../styledComponents';

export default function NoteListEntry({
  entryInfos,
  count,
  onNoteListEntryClick,
  creator,
}) {

  const isShared = !!entryInfos.branch.sharing_infos.length;
  const title = entryInfos.latestNote.blocks[0].children[0].text;
  const updatedAt = entryInfos.branch.updated_at;
  const date = updatedAt.substring(0, 10);
  const time = updatedAt.substring(11, 16);

  function NoteListEntryClickHandler(note, branch) {
    onNoteListEntryClick(note, branch);
  }

  return (
    <Link
      to={`/notes/${entryInfos.branch.latest_note}`}
      style={{
        textDecoration: 'none',
        color: 'black',
      }}>
      <NoteListEntryWrapper
        onClick={NoteListEntryClickHandler.bind(null, entryInfos.latestNote, entryInfos.branch)}
      >
        <div>{count + 1}</div>
        <div>{title}</div>
        <div>{creator}</div>
        <div>{`${date} ${time}`}</div>
        <div>{isShared ? 'O' : 'X'}</div>
      </NoteListEntryWrapper>
    </Link>
  );
}
