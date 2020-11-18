import React from 'react';
import styled from 'styled-components';
import { Route, Switch } from 'react-router-dom';
import AppHeader from '../AppHeader';
<<<<<<< HEAD
import NoteList from './NoteList';
=======
import TestForm from '../TestForm';
import Editor from '../Editor';
>>>>>>> feat: create new branch

const Header = styled.header`
`;

<<<<<<< HEAD
export default function AppMain({ onLogout, isPrivate, handleOnClick, currentUser }) {

  return (
    <>
      <AppHeader isPrivate={isPrivate} handleOnClick={handleOnClick} onLogout={onLogout} />
=======
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
>>>>>>> feat: create new branch
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
