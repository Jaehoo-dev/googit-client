import React from 'react';
import { Header } from './styledComponents';
import { useHistory } from 'react-router-dom';
import { auth } from '../../config/firebase';
import PrivateNotesToggleButton from './PrivateNotesToggleButton';
import SearchBar from './SearchBar';
import ProfileIcon from './ProfileIcon';

export default function MainHeader({ onLogout, isPrivateMode, handleOnClick, handleInput, currentUser }) {
  const history = useHistory();

  async function logoutClickHandler() {
    await auth.signOut();
    localStorage.removeItem(process.env.REACT_APP_GOOGIT_LOGIN_TOKEN);
    onLogout();
    history.push('/login');
  }

  return (
    <Header>
      <section>
        <PrivateNotesToggleButton buttonMode={isPrivateMode} onClick={handleOnClick} />
        <SearchBar handleInput={handleInput} currentUser={currentUser} />
        <ProfileIcon onClick={logoutClickHandler} />
      </section>
    </Header>
  );
}
