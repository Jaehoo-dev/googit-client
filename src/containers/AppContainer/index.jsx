import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { useHistory } from 'react-router-dom';
import AppEntrance from '../../components/AppEntrance';
import AppMain from '../../components/AppMain';
import { setCurrentUser, setHasToken, initializeStore, setIsPrivate, initializeBranchList } from '../../actions';
import Loading from '../../components/shared/Loading';
import fetchBranchList from '../../api/branchListFetch';
import EditorPage from '../EditorContainer';

function AppContainer({
  hasToken,
  currentUser,
  onLogin,
  onLogout,
  onCreateBranch,
  togglePrivateMode,
  isPrivate,
  getBranchList,
  noteList,
  currentNote,
}) {
  const history = useHistory();
  const [searchQuery, setSearchQuery] = useState('');

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
    async function loadNoteList() {
      const branchList = await fetchBranchList(currentUser, isPrivate, searchQuery);

      getBranchList(branchList);
    }

    if (currentUser) loadNoteList();
  }, [currentUser, isPrivate, searchQuery]);

  function handleInput(e) {
    const userInput = e.target.keywords.value;

    if (!userInput) return;

    setSearchQuery(e.target.keywords.value);
  }

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
      {/* {
        hasToken && currentUser
        && <AppMain
          onLogout={onLogout}
          isPrivate={isPrivate}
          handleOnClick={togglePrivateMode}
          currentUser={currentUser}
          handleInput={handleInput}
          onLoad={getBranchList}
        />
      } */}
      {
        hasToken && currentUser
        && <EditorPage
          currentNote={currentNote}
          onCreateBranch={onCreateBranch}
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
    onCreateBranch(updatedUser) {
      dispatch(setCurrentUser(updatedUser));
    },
    togglePrivateMode() {
      dispatch(setIsPrivate());
    },
    getBranchList(branchList) {
      dispatch(initializeBranchList(branchList)); //naming
    }
  };
}

function mapStateToProps(state) {
  return {
    hasToken: state.hasToken,
    currentUser: state.currentUser,
    isPrivate: state.isPrivate,
    noteList: state.noteList,
    currentNote: state.currentNote,
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(AppContainer);
