import React from 'react';
import styled from 'styled-components';
import BranchListEntry from '../BranchListEntry';
import Button, { createNewBranchTheme } from '../../shared/Button/index new'

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
    border: 1px solid pink;
  `;

export default function BranchListBody({ branchList }) {
  
  function createBranchEntry() {
    return branchList.map((branch, i) => (
      <BranchListEntry key={i} branchContent={branch} count={i}/>
    ));
  }

  return (
    <Wrapper>
      <Button theme={createNewBranchTheme}>
        새로운 노트 만들기 +
      </Button>
      <BranchContainer>
        { branchList && createBranchEntry() }
      </BranchContainer>
    </Wrapper>
  );
}
