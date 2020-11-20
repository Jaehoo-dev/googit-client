import React from 'react';
import styled from 'styled-components';

const Container = styled.div`
  border: solid 1px #ddd;
  background: #f4f4f4;
  padding: 5px;
  border-radius: 0.5em 0.5em 0 0;
  top: 50px;
  display: flex;
  align-items: center;
  justify-content: space-evenly;
`;

const HiddenDiv = styled.div`
  display: none;
`;

export default function Toolbar() {
  function format(command, value) {
    document.execCommand(command, false, value);
  }
  // function addLink() { }
  // function setUrl() { }

  return (
    <Container>
      <button onClick={e => format('undo')}>{'<-'}</button>
      <button onClick={e => format('redo')}>{'->'}</button>
      <button onClick={e => format('bold')}>굵게</button>
      <button onClick={e => format('italic')}>기울이기</button>
      <button onClick={e => format('underline')}>밑줄</button>
      <button onClick={e => format('strikethrough')}>취소선</button>
      <button onClick={e => format('hiliteColor', 'yellow')}>강조</button>
      <button onClick={e => format('justifyFull')}>기본</button>
      <button onClick={e => format('justifyLeft')}>왼쪽</button>
      <button onClick={e => format('justifyCenter')}>가운데</button>
      <button onClick={e => format('justifyRight')}>오른쪽</button>
      {/* <button onClick={e => addLink()}>링크</button>
      <HiddenDiv id='url-input'>
        <input id='txtFormatUrl' placeholder='url' />
        <button onClick={e => setUrl(e)}>Create Link</button>
      </HiddenDiv> */}
    </Container>
  );
}
