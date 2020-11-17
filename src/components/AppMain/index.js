import React from 'react';
import styled from 'styled-components';
import { Route, Switch } from 'react-router-dom';
import AppHeader from '../AppHeader';
import NoteList from './NoteList';

const Header = styled.header`
`;

export default function AppMain({ onLogout, isPrivate, handleOnClick, currentUser }) {

  return (
    <>
      <AppHeader isPrivate={isPrivate} handleOnClick={handleOnClick} onLogout={onLogout} />
      <Switch>
        <Route path='/profile/edit'>
          <div>edit</div>
          {/* <AppProfileEdit /> */}
        </Route>
        <Route path='/' exact>
          <NoteList isPrivate={isPrivate} currentUser={currentUser} />
        </Route>
      </Switch>
    </>
  );
}
