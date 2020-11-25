import React from 'react';
import { Header } from './styledComponents';
import { useHistory } from 'react-router-dom';
import { auth } from '../../config/firebase';
import PrivateNotesToggleButton from './PrivateNotesToggleButton';
import SearchBar from './SearchBar';
import ProfileIcon from './ProfileIcon';
import HomeButton from '../HomeButton';

export default function MainHeader({
  onLogout,
  isPrivateMode,
  handleInput,
  currentUser,
  onPrivateNotesToggleClick,
  togglePrivateMode,
}) {
  const history = useHistory();

  async function logoutClickHandler() {
    await auth.signOut();
    localStorage.removeItem(process.env.REACT_APP_GOOGIT_LOGIN_TOKEN);
    onLogout();
    history.push('/login');
  }

  function privateNotesToggleHandler() {
    onPrivateNotesToggleClick();
    togglePrivateMode();
  }

  function searchHandler() {
    onPrivateNotesToggleClick();
  }

  function homeButtonClickHandler() {
    window.location.reload();
  }

  return (
    <Header>
      <section>
        <HomeButton onClick={homeButtonClickHandler} />
        <PrivateNotesToggleButton
          buttonMode={isPrivateMode}
          onClick={privateNotesToggleHandler}
        />
        <SearchBar
          handleInput={handleInput}
          currentUser={currentUser}
          onSubmit={searchHandler}
        />
        <ProfileIcon onClick={logoutClickHandler} />
      </section>
    </Header>
  );
}
