import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { useHistory } from 'react-router-dom';
import AppEntrance from '../../components/AppEntrance';
import AppMain from '../../components/AppMain';
import { setCurrentUser, setHasToken, initializeStore } from '../../actions';
import Loading from '../../components/shared/Loading';

function AppContainer({
  hasToken,
  currentUser,
  onLogin,
  onLogout,
  onCreateBranch,
}) {
  const [isPrivate, setIsPrivate] = useState(false);
  const history = useHistory();

  function handlePrivateMode() {
    setIsPrivate(!isPrivate);
  }

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

  return (
    <>
      {
        !hasToken
        && <AppEntrance onLogin={onLogin} />
      }
      {
        hasToken && !currentUser
        && <Loading text='정보를 불러오고 있어요' />
      }
      {
        hasToken && currentUser
<<<<<<< HEAD
        && <AppMain onLogout={onLogout} isPrivate={isPrivate} handleOnClick={handlePrivateMode} currentUser={currentUser} />
=======
        && <AppMain
          onLogout={onLogout}
          buttonMode={isPrivate}
          handleOnClick={handlePrivateMode}
          currentUser={currentUser}
          onCreateBranch={onCreateBranch}
        />
>>>>>>> feat: create new branch
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
    onCreateBranch(updatedUser) {
      dispatch(setCurrentUser(updatedUser));
    },
  };
}

function mapStateToProps(state) {
  return {
    hasToken: state.hasToken,
    currentUser: state.currentUser,
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(AppContainer);
