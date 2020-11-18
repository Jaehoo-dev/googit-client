import React from 'react';
import styled from 'styled-components';
import { Route, Switch } from 'react-router-dom';
import AppHeader from '../AppHeader';
// import TestForm from '../TestForm';
import Editor from '../Editor';

export default function AppMain({
  onLogout,
  buttonMode,
  handleOnClick,
  currentUser,
  onCreateBranch,
}) {
  return (
    <>
      <AppHeader
        buttonMode={buttonMode}
        handleOnClick={handleOnClick}
        onLogout={onLogout}
      />
      <Switch>
        <Route path='/profile/edit'>
          <div>edit</div>
          {/* <AppProfileEdit /> */}
        </Route>
        <Route path='/' exact>
          <NoteList isPrivate={isPrivate} currentUser={currentUser} />
        </Route>
      </Switch>
      <Editor />
      {/* <TestForm user={currentUser} onCreateBranch={onCreateBranch} /> */}
    </>
  );
}
