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
  skipInitializer,
}) {

  function clickHandler() {
    togglePrivateMode();
    skipInitializer();
  }


  return (
    <>
      <MainHeader
        isPrivateMode={isPrivateMode}
        clickHandler={clickHandler}
        togglePrivateMode={togglePrivateMode}
        skipInitializer={skipInitializer}
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
