import React from 'react';
import MainHeader from '../../components/MainHeader';
import BranchList from '../../components/BranchList';

export default function AppMain({
  onLogout,
  isPrivate,
  handleOnClick,
  currentUser,
  onLoad,
  handleInput,
}) {
  return (
    <>
      <MainHeader
        isPrivate={isPrivate}
        handleOnClick={handleOnClick}
        onLogout={onLogout}
        handleInput={handleInput}
        currentUser={currentUser}
      />
      <BranchList isPrivate={isPrivate} currentUser={currentUser} />
    </>
  );
}
