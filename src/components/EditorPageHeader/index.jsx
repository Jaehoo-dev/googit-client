import React, { useState, useEffect } from 'react';
import { ThemeProvider } from 'styled-components';
import {
  Header,
  Arrow,
  Blank,
  ArrowsWrapper,
  ArrowWrapper,
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
import requestNote from '../../api/requestNote';
import requestBranch from '../../api/requestBranch';
import SharingButton from '../BranchList/tempforsharing';

export default function EditorPageHeader({
  currentUser,
  isShowModificationsMode,
  onShowModificationsModeToggle,
  isModified,
  currentNote,
  onHomeButtonClick,
  onSubmit,
  onNoteChange,
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

  async function displayLinkedNote(version) {
    const note
      = version === 'previous'
        ? await requestNote(currentUser._id, currentNote.previous_version)
        : await requestNote(currentUser._id, currentNote.next_version);

    if (!note) return;

    const branch
      = await requestBranch(currentUser._id, note.parent);

    if (!branch) return;

    onNoteChange(note, branch);
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
          <ArrowWrapper>
            {
              currentNote?.previous_version
              && <Arrow
                direction='left'
                onClick={displayLinkedNote.bind(null, 'previous')}
              />
            }
          </ArrowWrapper>
          <Blank />
          <ArrowWrapper>
            {
              currentNote?.next_version
              && <Arrow
                direction='right'
                onClick={displayLinkedNote.bind(null, 'next')}
              />
            }
          </ArrowWrapper>
        </ArrowsWrapper>
        <ShowChangesButtonWrapper>
          {
            currentNote
            && <ThemeProvider theme={coralButtonTheme}>
              <Button onClick={onShowModificationsModeToggle}>
                {
                  isShowModificationsMode
                    ? '수정사항 숨기기'
                    : '수정사항 보기'
                }
              </Button>
            </ThemeProvider>
          }
        </ShowChangesButtonWrapper>
      </LeftWrapper>
      <ModifyRecordWrapper>
        {
          isShowModificationsMode
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
            && <SharingButton currentUser={currentUser}>공유</SharingButton>
          }
        </ShareButtonWrapper>
        <SaveButtonWrapper>
          {
            isModified
            && <ThemeProvider theme={saveButtonTheme}>
              <Button onClick={submitHandler}>저장</Button>
            </ThemeProvider>
          }
        </SaveButtonWrapper>
      </RightWrapper>
    </Header>
  );
}

