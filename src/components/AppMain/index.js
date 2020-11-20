import React from 'react';
import { Route, Switch } from 'react-router-dom';
import AppHeader from '../AppHeader';
import BranchList from './BranchList';
import Temp from './BranchList/tempforsharing';

export default function AppMain({ onLogout, isPrivate, handleOnClick, currentUser, handleInput }) {

  return (
    <>
      <AppHeader
        isPrivate={isPrivate}
        handleOnClick={handleOnClick}
        onLogout={onLogout}
        handleInput={handleInput}
        currentUser={currentUser}
      />
      <Switch>
        <Route path='/profile/edit'>
          <div>edit</div>
          {/* <AppProfileEdit /> */}
        </Route>
        <Route path='/' exact>
          <BranchList isPrivate={isPrivate} currentUser={currentUser} />
        </Route>
        <Route path='/temp'>
          <Temp currentUser={currentUser} />
        </Route>
      </Switch>
    </>
  );
}
