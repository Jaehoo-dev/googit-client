import React from 'react';
import MainHeader from '../../components/MainHeader';
import MainBody from '../../components/MainBody';

export default function AppMain({
  onLogout,
  isPrivateMode,
  togglePrivateMode,
  currentUser,
  handleInput,
  noteListEntryInfos,
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
      <MainBody
        isPrivateMode={isPrivateMode}
        currentUser={currentUser}
        noteListEntryInfos={noteListEntryInfos}
        onNoteListEntryClick={onNoteListEntryClick}
      />
    </>
  );
}
