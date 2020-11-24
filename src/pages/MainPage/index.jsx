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
  setCurrentNoteAndBranch,
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
        onLogout={onLogout}
        handleInput={handleInput}
        currentUser={currentUser}
      />
      <BranchList
        isPrivateMode={isPrivateMode}
        currentUser={currentUser}
        branchList={branchList}
        setCurrentNoteAndBranch={setCurrentNoteAndBranch}
      />
    </>
  );
}
