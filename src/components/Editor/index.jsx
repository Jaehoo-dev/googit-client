import React, { useRef, useEffect } from 'react';
import { Wrapper, TitleBlock, ContentBlock, SubmitButton } from './styledComponents';
import Toolbar from '../Toolbar';
import dompurify from 'dompurify';

export default function Editor({
  onNoteChange,
  isChanged,
  currentBranch,
  currentNote,
}) {
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
    </>
  );
}
