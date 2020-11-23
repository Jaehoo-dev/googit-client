import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import BranchListEntry from '../BranchListEntry';
import Button, { createNewBranchTheme } from '../../shared/Button/index new';

const Wrapper = styled.div`
  width: 80%;
  height: 100vh;
  margin: 0 5em;
  padding: 1em 3em;
  font-size: 1em;
  text-align: center;
  display: flex;
  flex-direction: column;
`;

const BranchContainer = styled.div`
  margin-top: 1em;
  padding-bottom: 1em;
`;

export default function BranchListBody({
  branchList,
  onScroll,
  setCurrentNoteAndBranch,
  createRef,
  onHomeToEditorPageModify
}) {

  function createBranchEntry() {
    return branchList.map((branch, i) => {
      return (i === branchList.length - 3)
        ? <BranchListEntry
          key={i}
          setCurrentNoteAndBranch={setCurrentNoteAndBranch}
          branchContent={branch}
          count={i}
          onClick={onHomeToEditorPageModify}
          createRef={createRef}
        />
        : <BranchListEntry
          key={i}
          setCurrentNoteAndBranch={setCurrentNoteAndBranch}
          branchContent={branch}
          count={i}
          onClick={onHomeToEditorPageModify}
        />;
    });
  }

  function clickHandler() {
    onHomeToEditorPageModify();
  }

  return (
    <Wrapper>
      <Link to='/notes/new'>
        <Button theme={createNewBranchTheme} onClick={clickHandler}>
          새로운 노트 만들기 +
      </Button>
      </Link>
      <BranchContainer>
        {branchList && createBranchEntry()}
      </BranchContainer>
    </Wrapper>
  );
}
