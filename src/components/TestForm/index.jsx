import React, { useState } from 'react';
import styled from 'styled-components';

const EditorWrapper = styled.div`
  padding-top: 100px;
  min-width: 480px;
  max-width: 560px;
  margin: 0 auto;
`;

// presentational component에서 데이터 관련 코드 빼기
export default function TestForm({ user, onCreateBranch }) {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');

  async function submitHandler() {
    const branchCreateRes = await fetch(
      `http://localhost:4000/users/${user._id}/branches/new`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem(process.env.REACT_APP_GOOGIT_LOGIN_TOKEN)}`,
        },
      }
    );

    const branchCreateResponse = await branchCreateRes.json();

    if (branchCreateResponse.result === 'failure') {
      alert('브랜치를 만들다가 문제가 생겼어요');

      return;
    }

    const noteCreateRes = await fetch(
      `http://localhost:4000/users/${user._id}/branches/${branchCreateResponse.branchId}/notes/new`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem(process.env.REACT_APP_GOOGIT_LOGIN_TOKEN)}`,
        },
        body: JSON.stringify({
          title,
          content,
        })
      }
    );

    const noteCreateResponse = await noteCreateRes.json();

    if (noteCreateResponse.result === 'failure') {
      alert('쪽지를 만들다가 문제가 생겼어요');

      // delete branch

      return;
    }

    onCreateBranch(branchCreateResponse.updatedUser);

    console.log('브랜치 만들고 이용자 정보에 밀어넣고 새 쪽지 담고 currentUser state update 과정 끝');
  }

  return (
    <EditorWrapper>
      <form>
        <label htmlFor='title'>제목: </label>
        <input
          type='text'
          name='title'
          value={title}
          onChange={ev => setTitle(ev.target.value)}
          autoComplete='off'
          size='50'
        /><br />
        <label htmlFor='content'>내용:</label><br />
        <textarea
          cols='80'
          rows='12'
          name='content'
          value={content}
          onChange={ev => setContent(ev.target.value)}
          autoComplete='off'
        /><br /><br />
        <button type='button' onClick={submitHandler}>등록</button>
      </form>
    </EditorWrapper>
  );
}
