import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import Entrance from '../../components/Entrance';
import MainPage from '../../pages/MainPage';
import Loading from '../../components/shared/Loading';
import fetchBranchList from '../../api/branchListFetch';
import EditorPage from '../../containers/EditorContainer';
import requestCurrentUser from '../../api/requestCurrentUser';

export default function App({
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
  const [keyword, setKeyword] = useState('');

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
    async function loadNoteList() {
      const branchList = await fetchBranchList(currentUser, isPrivate, keyword);

      getBranchList(branchList);
    }

    if (currentUser) loadNoteList();
  }, [currentUser, isPrivate, keyword]);

  function handleInput(e) {
    const query = e.target.keywords.value;

    if (!query) return;

    setKeyword(e.target.keywords.value);
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
        && <MainPage
          onLogout={onLogout}
          isPrivate={isPrivate}
          handleOnClick={togglePrivateMode}
          currentUser={currentUser}
          handleInput={handleInput}
          onLoad={getBranchList}
        />
      }
      {/* {
        hasToken && currentUser
        && <EditorPage
          currentNote={currentNote}
          onCreateBranch={onCreateBranch}
        />
      } */}
    </>
  );
}
