import React from 'react';
import { BranchListEntryWrapper } from '../styledComponents';
import { Link } from 'react-router-dom';

export default function BranchListEntry({
  branchContent,
  count,
  onNoteListEntryClick,
  creator,
}) {
  const isShared = !!branchContent.branch.shared_users_info.length;
  const title = branchContent.latestNote.blocks[0].children[0].text;
  const updatedAt = branchContent.branch.updated_at;
  const date = updatedAt.substring(0, 10);
  const time = updatedAt.substring(11, 16);

  function NoteListEntryClickHandler(note, branch) {
    onNoteListEntryClick(note, branch);
  }

  return (
    <Link
      to={`/notes/${branchContent.branch.latest_note}`}
      style={{
        textDecoration: 'none',
        color: 'black',
      }}>
      <BranchListEntryWrapper
        onClick={NoteListEntryClickHandler.bind(null, branchContent.latestNote, branchContent.branch)}
      >
        <div>{count + 1}</div>
        <div>{title}</div>
        <div>{creator}</div>
        <div>{`${date} ${time}`}</div>
        <div>{isShared ? 'O' : 'X'}</div>
      </BranchListEntryWrapper>
    </Link>
  );
}
