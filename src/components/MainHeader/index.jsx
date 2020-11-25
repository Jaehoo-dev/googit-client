import React from 'react';
import { Header } from './styledComponents';
import { useHistory } from 'react-router-dom';
import { auth } from '../../config/firebase';
import PrivateNotesToggleButton from './PrivateNotesToggleButton';
import SearchBar from './SearchBar';
import ProfileIcon from './ProfileIcon';

export default function MainHeader({ onLogout, isPrivateMode, handleInput, currentUser, onClick, togglePrivateMode }) {
  const history = useHistory();

  async function logoutClickHandler() {
    await auth.signOut();
    localStorage.removeItem(process.env.REACT_APP_GOOGIT_LOGIN_TOKEN);
    onLogout();
    history.push('/login');
  }

  function clickHandler() {
    onClick();
    togglePrivateMode();
  }


  return (
    <Header>
      <section>
        <PrivateNotesToggleButton buttonMode={isPrivateMode} onClick={clickHandler} />
        <SearchBar handleInput={handleInput} currentUser={currentUser} onSubmit={onClick} />
        <ProfileIcon onClick={logoutClickHandler} />
      </section>
    </Header>
  );
}
