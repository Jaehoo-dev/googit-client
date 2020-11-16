import React from 'react';
import { useLocation, Link, useHistory } from 'react-router-dom';
import { IslandWrapper } from '../shared/IslandWrapper';
import GoogleAuthButton from './GoogleAuthButton';
import { auth, provider } from '../../config/firebase';

export default function AppEntrance({ onLogin }) {
  const history = useHistory();
  const { pathname } = useLocation();

  async function googleAuthClickHandler() {
    try {
      await auth.signInWithPopup(provider);

      const {
        uid,
        email,
        displayName,
        photoURL,
      } = auth.currentUser;

      const res = await fetch(`http://localhost:4000${pathname}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          uid,
          email,
          displayName,
          photoURL,
        }),
      });

      const response = await res.json();

      if (response.result === 'failure') {
        alert(response.message);

        if (response.message === '이미 가입했어요') {
          history.push('/login');
        }

        return;
      }

      if (pathname === '/signup') {
        history.push('/login');

        return;
      }

      if (pathname === '/login') {
        const { user, token } = response;

        localStorage.setItem(process.env.REACT_APP_GOOGIT_LOGIN_TOKEN, token);

        history.push('/');

        onLogin(user);
      }
    } catch (error) {
      alert(error.message);
    }
  }

  return (
    <IslandWrapper>
      <h1>구깃</h1>
      <GoogleAuthButton
        signupOrLogin={pathname === '/login' ? 'Login' : 'Sign Up'}
        onClick={googleAuthClickHandler}
      />
      <Link to={pathname === '/login' ? '/signup' : '/login'}>
        <h3>{pathname === '/login' ? '가입하러 가기' : '로그인하러 가기'}</h3>
      </Link>
    </IslandWrapper>
  );
}
