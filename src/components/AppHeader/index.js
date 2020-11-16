import React from 'react';
import styled from 'styled-components';
import { useHistory } from 'react-router-dom';
import { auth } from '../../config/firebase';

const Header = styled.header`
  position: fixed;
  min-width: 576px;
  width: 100%;
  top: 0;
  left: 0;
  height: 75px;
  box-shadow: 0px 1px 5px 1px rgba(0, 0, 0, 0.2);

  section {
    text-align: center;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 2em 0;
  }
`;

export default function AppHeader({ onLogout }) {
  const history = useHistory();

  async function logoutClickHandler() {
    await auth.signOut();
    localStorage.removeItem(process.env.REACT_APP_GOOGIT_LOGIN_TOKEN);
    onLogout();
    history.push('/login');
  }

  return (
    <Header>
      <button
        type='button'
        onClick={logoutClickHandler}
      >
        로그아웃
      </button>
    </Header>
  );
}
