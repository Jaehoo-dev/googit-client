import React from 'react';
import styled from 'styled-components';

const Wrapper = styled.div`
  margin-top: 1em;
  height: 3em;
  display: grid;
  grid-template-columns: 2em 1fr 1fr 15em 5em;
  grid-gap: 1em;
  align-items: center;
  border: 1px solid red;
  border-radius: 1em;
  background-color: coral;
  padding: 0 2em;
`;

export default function BranchListEntry({ branchContent, count }) {

  const isShared = !!branchContent.branch.shared_users_info.length;
  const title = branchContent.latest_note.blocks[0].children[0].text;
  const updatedAt = branchContent.branch.updated_at;
  const date = updatedAt.substring(0,10);
  const time = updatedAt.substring(11,16);

  return (
    <Wrapper>
      <div>{count}</div>
      <div>{title}</div>
      <div>{branchContent.email}</div>
      <div>{`${date} ${time}`}</div>
      <div>{isShared ? 'O' : 'X'}</div>
    </Wrapper>
  );
}
