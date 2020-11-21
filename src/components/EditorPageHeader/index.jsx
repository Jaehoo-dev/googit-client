import React, { useState } from 'react';
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
  showChangesButtonTheme,
  deleteButtonTheme,
  shareButtonTheme,
  saveButtonTheme,
} from '../Button';

export default function EditorPageHeader({
  isShowChangesMode,
  onShowChangesModeToggle,
  isChanged,
  currentNote,
  onHomeButtonClick,
  onSubmit,
}) {
  function homeButtonClickHandler() {
    onHomeButtonClick();
  }

  function submitHandler() {
    onSubmit();
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
            && <Arrow direction='left' />
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
            && <ThemeProvider theme={showChangesButtonTheme}>
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
            ? `${currentNote.created_by}가 ${currentNote.updated_at}에 수정함`
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
            && <ThemeProvider theme={shareButtonTheme}>
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

