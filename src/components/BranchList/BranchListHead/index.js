import React from 'react';
import styled from 'styled-components';

const Wrapper = styled.div`
  width: 80%;
  height: 2em;
  margin: 0 5em;
  padding: 0 3em;
  font-size: 1em;
  text-align: center;
  border-bottom: 1px solid black;

  section {
    display: grid;
    grid-template-columns: 2em 1fr 1fr 15em 5em;
    grid-gap: 1em;
    align-items: center;
    padding: 0 2em;
  }
`;

export default function BranchListHead() {
  return (
    <Wrapper>
      <section>
        <div>#</div>
        <div>제목</div>
        <div>작성자</div>
        <div>날짜</div>
        <div>공유</div>
      </section>
    </Wrapper>
  );
}
