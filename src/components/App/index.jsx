import React, { useEffect, useState, useRef } from 'react';
import { useHistory, Switch, Route } from 'react-router-dom';
import Entrance from '../../components/Entrance';
import MainPage from '../../pages/MainPage';
import Loading from '../../components/shared/Loading';
import requestBranchList from '../../api/requestBranchList';
import EditorPage from '../../containers/EditorContainer';
import requestCurrentUser from '../../api/requestCurrentUser';
import BranchList from '../BranchList';

export default function App({
  hasToken,
  currentUser,
  onLogin,
  onLogout,
  onCreateBranch,
  togglePrivateMode,
  isPrivateMode,
  onFetchBranchList,
  branchList,
  currentNote,
  setCurrentNoteAndBranch,
  onHomeToEditorPageModify,
  isEditorPage,
  onUpdateBranchList
}) {
  const history = useHistory();
  const [keyword, setKeyword] = useState('');
  const [skippedBranchNumber, setSkippedBranchNumber] = useState(0);
  const [branchNumber, setBranchNumber] = useState(0);

  const observer = useRef(new IntersectionObserver((entries) => {
    const first = entries[0];
    // console.log('inf scroll');
    if (first.isIntersecting) {
      setSkippedBranchNumber(skippedBranchNumber + 15);
    }
  }, { threshold: 1 }));
  const [observedElement, setObservedElement] = useState(null);

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

      const branchList
        = await requestBranchList(
          currentUser,
          isPrivateMode,
          keyword,
          skippedBranchNumber
        );

      console.log(branchList, 'triggered?');
      onUpdateBranchList(branchList);
      // onFetchBranchList(branchList);
    }

    return (() => {
      console.log('unmount');
    });
  }, [currentUser, isPrivateMode, keyword, skippedBranchNumber]);

  function handleInput(event) {
    const query = event.target.keyword.value;

    if (!query) return;

    setKeyword(query);
  }

  function skipBranch() {
    setSkippedBranchNumber(skippedBranchNumber + 10);
  }

  function createObservedElement(element) {
    setObservedElement(element);
  }

  useEffect(() => {
    const currentElement = observedElement;
    const currentObserver = observer.current;

    if (currentElement) {
      currentObserver.observe(currentElement);
    }
    return () => {
      if (currentElement) {
        currentObserver.unobserve(currentElement);
      }
    };
  }, [observedElement]);


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
              handleOnClick={togglePrivateMode}
              currentUser={currentUser}
              handleInput={handleInput}
              branchList={branchList}
              onLoad={onFetchBranchList}
              onScroll={skipBranch}
              setCurrentNoteAndBranch={setCurrentNoteAndBranch}
              createRef={createObservedElement}
              onHomeToEditorPageModify={onHomeToEditorPageModify}
            />
          </Route>
          <Route path='/notes'>
            <EditorPage
              currentNote={currentNote}
              onCreateBranch={onCreateBranch}
            />
          </Route>
        </Switch>
      }
    </>
  );
}
