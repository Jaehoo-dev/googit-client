import React, { useState } from 'react';
import styled from 'styled-components';

const EditorWrapper = styled.div`
  padding-top: 100px;
  min-width: 480px;
  max-width: 560px;
  margin: 0 auto;
`;

// presentational component에서 데이터 관련 코드 빼기
export default function Editor({ user }) {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');

  async function submitHandler() {
    const res = await fetch(
      `http://localhost:4000/users/${user._id}/branches/new`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem(process.env.REACT_APP_GOOGIT_LOGIN_TOKEN)}`,
        },
      }
    );

    const response = await res.json();

    if (response.result === 'failure') {
      alert('브랜치를 만들다가 문제가 생겼어요');

      return;
    }

    const res2 = await fetch(
      `http://localhost:4000/users/${user._id}/notes/new`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem(process.env.REACT_APP_GOOGIT_LOGIN_TOKEN)}`,
        },
        body: JSON.stringify({
          title,
          content,
          branchId: response.newBranchId,
        })
      }
    );

    const response2 = await res2.json();

    if (response2.result === 'failure') {
      alert('쪽지를 만들다가 문제가 생겼어요');

      // delete branch

      return;
    }

    const res3 = await fetch(
      `http://localhost:4000/users/${user._id}/branches/${response.newBranch._id}/notes/${response2.newNote._id}`,
      {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem(process.env.REACT_APP_GOOGIT_LOGIN_TOKEN)}`,
        },
        body: JSON.stringify(response.newBranch)
      }
    );

    const response3 = await res3.json();

    if (response3.result === 'ok') {
      console.log('쪽지 만들어서 새 브랜치에 담는 과정 끝');
    }
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
