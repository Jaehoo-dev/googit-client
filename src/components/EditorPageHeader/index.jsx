import React, { useState, useEffect } from 'react';
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
import SharingButton from './ShareButton';

export default function EditorPageHeader({
  currentUser,
  isShowModificationsMode,
  onShowModificationsModeToggle,
  isModified,
  currentNote,
  currentBranch,
  onHomeButtonClick,
  onSubmit,
  onNoteChange,
  sharedUsers,
  onSharedUsersLoad,
  onClick
}) {
  const [authorName, setAuthorName] = useState(null);

  useEffect(() => {
    if (!currentNote) return;

    getNoteAuthorName();

    async function getNoteAuthorName() {
      setAuthorName(
        await requestNoteAuthor(
          currentUser._id,
          currentNote.created_by
        )
      );
    }
  }, [currentNote]);

  function homeButtonClickHandler() {
    onHomeButtonClick();
  }

  function submitHandler() {
    onSubmit();
    onClick();
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
          <Button theme={homeButtonTheme} onClick={homeButtonClickHandler}>구깃</Button>
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
            && <Button theme={coralButtonTheme} onClick={onShowModificationsModeToggle}>
              {
                isShowModificationsMode
                  ? '수정사항 숨기기'
                  : '수정사항 보기'
              }
            </Button>
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
            && <Button theme={deleteButtonTheme}>삭제</Button>
          }
        </DeleteButtonWrapper>
        <ShareButtonWrapper>
          {
            currentNote
            && <SharingButton
              currentUser={currentUser}
              currentNote={currentNote}
              sharedUsers={sharedUsers}
              onSharedUsersLoad={onSharedUsersLoad}
            >
              공유
            </SharingButton>
          }
        </ShareButtonWrapper>
        <SaveButtonWrapper>
          {
            isModified
            && <Button theme={saveButtonTheme} onClick={submitHandler}>저장</Button>

          }
        </SaveButtonWrapper>
      </RightWrapper>
    </Header>
  );
}

