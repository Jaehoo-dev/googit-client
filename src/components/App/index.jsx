import React, { useEffect, useState } from 'react';
import { useHistory, Switch, Route } from 'react-router-dom';
import Entrance from '../../components/Entrance';
import MainPage from '../../pages/MainPage';
import Loading from '../../components/shared/Loading';
import requestBranchList from '../../api/requestBranchList';
import EditorPage from '../../containers/EditorContainer';
import requestCurrentUser from '../../api/requestCurrentUser';
import { throttle } from 'lodash';

export default function App({
  hasToken,
  currentUser,
  onLogin,
  onLogout,
  onCreateBranch,
  togglePrivateMode,
  isPrivateMode,
  onSetBranchList,
  onUpdateBranchList,
  branchList,
  currentNote,
  setCurrentNoteAndBranch
}) {
  const history = useHistory();
  const [keyword, setKeyword] = useState('');
  const [skip, setSkip] = useState(0);

  useEffect(() => {
    if (!hasToken) {
      history.push('/login');
      return;
    }

    loadCurrentUser();

    async function loadCurrentUser() {
      const currentUser = await requestCurrentUser();

      if (!currentUser) return;

      onLogin(currentUser);
    };
  }, []);

  useEffect(() => {
    console.log(isPrivateMode, 'privateMode');
    if (currentUser) loadBranchList();

    async function loadBranchList() {
      const response = await requestBranchList(currentUser, isPrivateMode, skip);

      if (!response) return;
      return (!skip)
        ? onSetBranchList(response)
        : onUpdateBranchList(response);
    }
  }, [currentUser, isPrivateMode, skip]);

  useEffect(() => {
    const throttledScrollHandler = throttle(scrollHandler, 2000);
    function scrollHandler() {
      const { offsetHeight, scrollTop, scrollHeight } = document.documentElement;

      if (offsetHeight + scrollTop > scrollHeight * 1.05) {
        setSkip(skip + 13);
      }
    }

    window.addEventListener('scroll', throttledScrollHandler);

    return (() => {
      window.removeEventListener('scroll', throttledScrollHandler);
    });
  }, [branchList]);

  function skipInitializer() {
    setSkip(0);
  }

  function handleInput(event) {
    const query = event.target.keyword.value;

    if (!query) return;

    setKeyword(query);
  }

  return (
    <>
      {
        !hasToken
        && <Entrance onLogin={onLogin} />
      }
      {
        hasToken && !currentUser
        && <Loading text='정보를 불러오고 있어요' />
      }
      {
        hasToken && currentUser
        && <Switch>
          <Route exact path='/'>
            <MainPage
              onLogout={onLogout}
              isPrivateMode={isPrivateMode}
              togglePrivateMode={togglePrivateMode}
              currentUser={currentUser}
              handleInput={handleInput}
              branchList={branchList}
              onLoad={onSetBranchList}
              setCurrentNoteAndBranch={setCurrentNoteAndBranch}
              skipInitializer={skipInitializer}
            />
          </Route>
          <Route path='/notes'>
            <EditorPage
              currentNote={currentNote}
              onCreateBranch={onCreateBranch}
              onClick={skipInitializer}
            />
          </Route>
        </Switch>
      }
    </>
  );
}
