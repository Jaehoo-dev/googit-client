import React from 'react';
import styled from 'styled-components';
import { Route, Switch } from 'react-router-dom';
import AppHeader from '../AppHeader/index';

const Header = styled.header`
`;

export default function AppMain({ onLogout, buttonMode, handleOnClick }) {
  return (
    <>
      <AppHeader buttonMode={buttonMode} handleOnClick={handleOnClick} onLogout={onLogout} />
      <Switch>
        <Route path='/profile/edit'>
          <div>edit</div>
          {/* <AppProfileEdit /> */}
        </Route>
        <Route path='/' exact>
          <div>list</div>
          {/* <AppNoteList isPrivate={buttonMode} /> */}
        </Route>
      </Switch>
    </>
  );
}
