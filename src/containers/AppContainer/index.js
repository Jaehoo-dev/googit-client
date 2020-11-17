import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { useHistory } from 'react-router-dom';
import AppEntrance from '../../components/AppEntrance';
import AppMain from '../../components/AppMain';
import { setCurrentUser, setHasToken, initializeStore, setIsPrivate } from '../../actions';
import Loading from '../../components/shared/Loading';
import fetchNoteList from '../../api/noteListFetch';

function AppContainer({
  hasToken,
  currentUser,
  onLogin,
  onLogout,
  togglePrivateMode,
  isPrivate,
}) {

  const history = useHistory();

  useEffect(() => {
    if (!hasToken) {
      history.push('/login');

      return;
    }

    async function getUserData() {
      const res = await fetch('http://localhost:4000/users/current-user', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem(process.env.REACT_APP_GOOGIT_LOGIN_TOKEN)}`,
        },
      });

      const response = await res.json();

      if (response.result === 'failure') {
        alert('이용자 정보를 불러오지 못했습니다');

        return;
      }

      onLogin(response.user);
    }

    getUserData();
  }, []);

  useEffect(() => {
    console.log(isPrivate, 'note list');
    async function getNoteList() {
    const noteList = await fetchNoteList(isPrivate, currentUser);
    console.log(noteList, '이자리로 디스패치 함수를 불러서 리덕스에 넣는다.') // 이 유즈 이펙트 앱으로 올라가야할듯 
    }
    if (currentUser) getNoteList();
  }, [isPrivate, currentUser]);

  return (
    <>
      {
        !hasToken
        && <AppEntrance onLogin={onLogin} />
      }
      {
        hasToken && !currentUser
        && <Loading text="이용자 정보를 불러오고 있어요" />
      }
      {
        hasToken && currentUser
        && <AppMain onLogout={onLogout} isPrivate={isPrivate} handleOnClick={togglePrivateMode} currentUser={currentUser} />
      }
    </>
  );
}

function mapDispatchToProps(dispatch) {
  return {
    onLogin(user) {
      dispatch(setHasToken());
      dispatch(setCurrentUser(user));
    },
    onLogout() {
      dispatch(initializeStore());
    },
    togglePrivateMode() {
      dispatch(setIsPrivate());
    }
  };
}

function mapStateToProps(state) {
  return {
    hasToken: state.hasToken,
    currentUser: state.currentUser,
    isPrivate: state.isPrivate,
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(AppContainer);
