import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { useHistory } from 'react-router-dom';
import AppEntrance from '../../components/AppEntrance';
import AppMain from '../../components/AppMain';
import { setCurrentUser, setHasToken, initializeStore, setIsPrivate, initializeNoteList } from '../../actions';
import Loading from '../../components/shared/Loading';
import fetchNoteList from '../../api/noteListFetch';

function AppContainer({
  hasToken,
  currentUser,
  onLogin,
  onLogout,
  togglePrivateMode,
  isPrivate,
  getNoteList,
  noteList,
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
    getNoteList(noteList);
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
        && <AppMain
              onLogout={onLogout}
              isPrivate={isPrivate}
              handleOnClick={togglePrivateMode}
              currentUser={currentUser}
              onLoad={getNoteList}
            />
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
    },
    getNoteList(noteList) {
      dispatch(initializeNoteList(noteList)) //naming
    }
  };
}

function mapStateToProps(state) {
  return {
    hasToken: state.hasToken,
    currentUser: state.currentUser,
    isPrivate: state.isPrivate,
    noteList: state.noteList
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(AppContainer);
