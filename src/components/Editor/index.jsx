import React, { useRef, useEffect } from 'react';
import styled from 'styled-components';
import Toolbar from '../Toolbar';
import dompurify from 'dompurify';

const Wrapper = styled.div`
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
  margin-top: 85px;
  margin-bottom: 20px;
  width: 560px;
  border-radius: .5em;
  box-shadow: 1px 1px 5px 1px rgba(0, 0, 0, 0.2);
`;

const TitleBlock = styled.div`
  padding: 0 20px 0 20px;

  h2 {
    margin-block-end: 0;
  }
`;

const ContentBlock = styled.div`
  padding: 0 20px 20px 20px;
  margin-top: 15px;
`;

const SubmitButton = styled.button`
  position: relative;
  top: 100px;
`;

export default function Editor({
  onNoteChange,
  isChanged,
  currentBranch,
  currentNote,
}) {
  // const currentNote = {
  //   title: 'Title',
  //   content: 'Magna do ex.&nbsp;<div>Lorem ad <b>pariatur</b> ut&nbsp; ut. or <span style="background-color: yellow;">commodo</span> laboris est. Duis proident. Eiusmod anim excepteur id mollit Lorem dolor mollit in proident. Esse aliquip eiusmod in eu exercitation culpa magna sint labore reprehenderit. Excepteur nostrud eiusmod irure eu laboris enim ipsum incididunt irure exercitation duis nulla mollit. Duis ut adipisicing ad officia culpa eu aute reprehenderit deserunt cupidatat ex cillum. Ut pariatur dolore reprehenderit sint occaecat magna.<script>alert("hi")</script></div>'
  // };
  const sanitizer = dompurify.sanitize;
  const titleRef = useRef();
  const contentRef = useRef();

  useEffect(() => {
    contentRef.current = sanitizer(currentNote?.content) || '내용..';

    if (currentNote?.title) {
      titleRef.current = currentNote.title;
    } else if (currentNote?.content) {
      titleRef.current
        = currentNote.content.length > 20
          ? currentNote.content.slice(0, 21) + '...'
          : currentNote.content;
    } else {
      titleRef.current = '제목..';
    }
  }, []);

  function titleChangeHandler(event) {
    titleRef.current = event.target.textContent;

    const note = {
      title: titleRef.current,
      content: contentRef.current,
    };

    onNoteChange(note, isChanged);
  }

  function contentChangeHandler(event) {
    contentRef.current = event.currentTarget.innerHTML;

    const note = {
      title: titleRef.current,
      content: contentRef.current,
    };

    onNoteChange(note, isChanged);
  }

  function submitHandler() {
    // const title = document.getElementById('title').textContent;
    // const content = document.getElementById('content').innerHTML;

    // console.log({ title, content });
    console.log({
      title: titleRef.current,
      content: sanitizer(contentRef.current),
    });
  }

  return (
    <>
      <Wrapper>
        <Toolbar />
        <TitleBlock
          id='title'
          ref={titleRef}
          onInput={titleChangeHandler}
          contentEditable
        >
          <h2>
            {
              currentNote?.title
              || (currentNote?.content
                ? (currentNote.content.length > 20
                  ? currentNote.content.slice(0, 21) + '...'
                  : currentNote.content)
                : '제목..')
            }
          </h2>
        </TitleBlock>
        <ContentBlock
          id='content'
          ref={contentRef}
          contentEditable
          onInput={contentChangeHandler}
          dangerouslySetInnerHTML={{
            __html:
              currentNote?.content
                ? sanitizer(currentNote.content)
                : '내용..'
          }}
        />
      </Wrapper>
      <SubmitButton onClick={submitHandler}>제출</SubmitButton>
    </>
  );
}
