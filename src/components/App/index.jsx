import React, { useEffect, useState } from 'react';
import { useHistory, Switch, Route } from 'react-router-dom';
import Entrance from '../../components/Entrance';
import MainPage from '../../pages/MainPage';
import Loading from '../../components/shared/Loading';
import EditorPage from '../../containers/EditorContainer';
import requestCurrentUser from '../../api/requestCurrentUser';
import { throttle } from 'lodash';
import requestNoteList from '../../api/requestNoteList';

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

  // useEffect(() => {
  //   if (!currentUser) return;

  //   loadNoteList();

  //   async function loadNoteList() {
  //     const response
  //       = await requestNoteList(currentUser, isPrivateMode, skip, keyword);

  //     if (!response) return;

  //     return (skip)
  //       ? onUpdateNoteList(response)
  //       : onSetNoteList(response);
  //   }
  // }, [currentUser, isPrivateMode, skip, keyword, sharedUsers]);

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
    const throttledScrollHandler = throttle(scrollHandler, 2000);

    function scrollHandler() {
      const { offsetHeight, scrollTop, scrollHeight } = document.documentElement;
      console.log(offsetHeight + scrollTop, scrollHeight, '?');
      if (offsetHeight + scrollTop > scrollHeight * .3) {
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
              keyword={keyword}
              skip={skip}
              onUpdateNoteList={onUpdateNoteList}
              onSetNoteList={onSetNoteList}
              sharedUsers={sharedUsers}
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
