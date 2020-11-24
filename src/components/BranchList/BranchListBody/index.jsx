import React from 'react';
import { Link } from 'react-router-dom';
import { BranchListBodyWrapper, BranchContainer } from '../styledComponents';
import BranchListEntry from '../BranchListEntry';
import Button, { createNewBranchTheme } from '../../shared/Button';

export default function BranchListBody({
  branchList,
  onNoteListEntryClick,
}) {

  function createBranchEntries() {
    return branchList.map((list, i) => (
      <BranchListEntry
        key={i}
        onNoteListEntryClick={onNoteListEntryClick}
        branchContent={list.branch}
        count={i}
        creator={list.email}
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
        {branchList && createBranchEntries()}
      </BranchContainer>
    </BranchListBodyWrapper>
  );
}
