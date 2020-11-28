import React, { useEffect, useState } from 'react';
import { useHistory, Switch, Route } from 'react-router-dom';
import Entrance from '../../components/Entrance';
import MainPage from '../../pages/MainPage';
import Loading from '../../components/shared/Loading';
import requestNoteList from '../../api/requestNoteList';
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
  onSetNoteList,
  onUpdateNoteList,
  noteListEntryInfos,
  currentNote,
  onNoteListEntryClick,
  sharedUsers,
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
    if (!currentUser) return;

    loadBranchList();

    async function loadBranchList() {
      console.log(skip, 'skup');
      const response
        = await requestNoteList(currentUser, isPrivateMode, skip, keyword);

      if (!response) return;
      console.log(response, 'res');
      console.log(skip, 'skup2');
      return (!skip)
        ? onSetNoteList(response)
        : onUpdateNoteList(response);
    }
  }, [currentUser, isPrivateMode, skip, keyword, sharedUsers]);

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
  }, [noteListEntryInfos]);

  function skipInitializer() {
    if (!skip) return;

    setSkip(0);
  }

  function handleInput(event) {
    const userInput = event.target.keyword.value;

    if (!userInput) return;

    setKeyword(userInput);
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
              noteListEntryInfos={noteListEntryInfos}
              onLoad={onSetNoteList}
              onNoteListEntryClick={onNoteListEntryClick}
              skipInitializer={skipInitializer}
              onPrivateNotesToggleClick={skipInitializer}
            />
          </Route>
          <Route path='/notes'>
            <EditorPage
              currentNote={currentNote}
              onCreateBranch={onCreateBranch}
              onClick={skipInitializer}
              skip={skip}
            />
          </Route>
        </Switch>
      }
    </>
  );
}
