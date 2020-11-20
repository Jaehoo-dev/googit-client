import React from 'react';
import { Route, Switch } from 'react-router-dom';
import MainHeader from '../MainPage';
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
      <Switch>
        <Route path='/profile/edit'>
          <div>edit</div>
          {/* <AppProfileEdit /> */}
        </Route>
        <Route path='/' exact>
          <BranchList isPrivate={isPrivate} currentUser={currentUser} />
        </Route>
      </Switch>
    </>
  );
}
