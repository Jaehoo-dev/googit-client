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
  border: 2px solid purple;
  display: flex;
  flex-direction: column;
`;

const BranchContainer = styled.div`
    margin-top: 1em;
    padding-bottom: 1em;
    overflow: scroll;
    border: 1px solid pink;
  `;

export default function BranchListBody({
  branchList,
  onScroll,
  setCurrentNoteAndBranch,
}) {
  console.log(branchList);
  function createBranchEntry() {
    return branchList.map((branch, i) => (
      <BranchListEntry
        key={i}
        branchContent={branch}
        count={i}
        setCurrentNoteAndBranch={setCurrentNoteAndBranch}
      />
    ));
  }

  function scrollHandler(event) {
    const { offsetHeight, scrollTop, scrollHeight } = event.target;
    if (offsetHeight + scrollTop > scrollHeight) {
      console.log('exec');
      onScroll();
    }
  }


  return (
    <Wrapper>
      <Link to='/notes/new'>
        <Button theme={createNewBranchTheme}>
          새로운 노트 만들기 +
      </Button>
      </Link>
      <BranchContainer onScroll={scrollHandler}>
        {branchList && createBranchEntry()}
      </BranchContainer>
    </Wrapper>
  );
}
