import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { BranchListBodyWrapper, BranchContainer } from '../styledComponents';
import BranchListEntry from '../BranchListEntry';
import Button, { createNewBranchTheme } from '../../shared/Button';

export default function BranchListBody({
  branchList,
  setCurrentNoteAndBranch,
}) {

  function createBranchEntry() {
    return branchList.map((branch, i) => (
      <BranchListEntry
        key={i}
        setCurrentNoteAndBranch={setCurrentNoteAndBranch}
        branchContent={branch}
        count={i}
      />
    ));
  }

  return (
    <BranchListBodyWrapper>
      <Link to='/notes/new'>
        <Button theme={createNewBranchTheme}>
          새로운 노트 만들기 +
        </Button>
      </Link>
      <BranchContainer>
        {branchList && createBranchEntry()}
      </BranchContainer>
    </BranchListBodyWrapper>
  );
}
