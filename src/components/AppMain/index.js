import React from 'react';
import { Route, Switch } from 'react-router-dom';
import AppHeader from '../AppHeader';
import NoteList from './NoteList';
import TestForm from '../TestForm';
import Editor from '../Editor';

export default function AppMain({ onLogout, isPrivate, handleOnClick, currentUser, onCreateBranch, onLoad }) {
  return (
    <>
      <AppHeader
        isPrivate={isPrivate}
        handleOnClick={handleOnClick}
        onLogout={onLogout}
        onLoad={onLoad}
        currentUser={currentUser}
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
