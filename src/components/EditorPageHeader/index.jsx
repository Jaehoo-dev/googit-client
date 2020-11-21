import React, { useState, useEffect } from 'react';
import { ThemeProvider } from 'styled-components';
import {
  Header,
  Arrow,
  Blank,
  ArrowsWrapper,
  ModifyRecordWrapper,
  HomeButtonWrapper,
  ShowChangesButtonWrapper,
  LeftWrapper,
  RightWrapper,
  DeleteButtonWrapper,
  ShareButtonWrapper,
  SaveButtonWrapper,
} from './styledComponents';
import Button, {
  homeButtonTheme,
  deleteButtonTheme,
  coralButtonTheme,
  saveButtonTheme,
} from '../shared/Button';
import requestNoteAuthor from '../../api/requestNoteAuthor';

export default function EditorPageHeader({
  isShowChangesMode,
  onShowChangesModeToggle,
  isChanged,
  currentNote,
  onHomeButtonClick,
  onSubmit,
}) {
  const [authorName, setAuthorName] = useState(null);

  useEffect(() => {
    if (!currentNote) return;

    getNoteAuthorName();

    async function getNoteAuthorName() {
      setAuthorName(await requestNoteAuthor(currentNote.created_by));
    }
  }, [currentNote]);

  function homeButtonClickHandler() {
    onHomeButtonClick();
  }

  function submitHandler() {
    onSubmit();
  }

  function displayPreviousNote() {

  }

  return (
    <Header>
      <LeftWrapper>
        <HomeButtonWrapper>
          <ThemeProvider theme={homeButtonTheme}>
            <Button onClick={homeButtonClickHandler}>구깃</Button>
          </ThemeProvider>
        </HomeButtonWrapper>
        <ArrowsWrapper>
          {
            currentNote?.previous_version
            && <Arrow direction='left' onClick={displayPreviousNote} />
          }
          <Blank />
          {
            currentNote?.next_version
            && <Arrow direction='right' />
          }
        </ArrowsWrapper>
        <ShowChangesButtonWrapper>
          {
            currentNote
            && <ThemeProvider theme={coralButtonTheme}>
              <Button onClick={onShowChangesModeToggle}>
                {
                  isShowChangesMode ? '수정사항 숨기기' : '수정사항 보기'
                }
              </Button>
            </ThemeProvider>
          }
        </ShowChangesButtonWrapper>
      </LeftWrapper>
      <ModifyRecordWrapper>
        {
          isShowChangesMode
            ? `${authorName}가 ${currentNote.updated_at}에 수정함`
            : null
        }
      </ModifyRecordWrapper>
      <RightWrapper>
        <DeleteButtonWrapper>
          {
            currentNote
            && <ThemeProvider theme={deleteButtonTheme}>
              <Button>삭제</Button>
            </ThemeProvider>
          }
        </DeleteButtonWrapper>
        <ShareButtonWrapper>
          {
            currentNote
            && <ThemeProvider theme={coralButtonTheme}>
              <Button>공유</Button>
            </ThemeProvider>
          }
        </ShareButtonWrapper>
        <SaveButtonWrapper>
          {
            isChanged
            && <ThemeProvider theme={saveButtonTheme}>
              <Button onClick={submitHandler}>저장</Button>
            </ThemeProvider>
          }
        </SaveButtonWrapper>
      </RightWrapper>
    </Header>
  );
}

