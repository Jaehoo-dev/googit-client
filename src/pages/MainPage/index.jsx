import React from 'react';
import MainHeader from '../../components/MainHeader';
import BranchList from '../../components/BranchList';

export default function AppMain({
  onLogout,
  isPrivateMode,
  togglePrivateMode,
  currentUser,
  handleInput,
  branchList,
  onNoteListEntryClick,
  onPrivateNotesToggleClick,
}) {

  return (
    <>
      <MainHeader
        isPrivateMode={isPrivateMode}
        togglePrivateMode={togglePrivateMode}
        onPrivateNotesToggleClick={onPrivateNotesToggleClick}
        onLogout={onLogout}
        handleInput={handleInput}
        currentUser={currentUser}
      />
      <BranchList
        isPrivateMode={isPrivateMode}
        currentUser={currentUser}
        branchList={branchList}
        onNoteListEntryClick={onNoteListEntryClick}
      />
    </>
  );
}
