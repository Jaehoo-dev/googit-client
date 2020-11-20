import React from 'react';
import styled from 'styled-components';
import { useHistory } from 'react-router-dom';
import ToggleButton from '../ToggleButton';

const Header = styled.header`
  position: fixed;
  min-width: 576px;
  width: 100%;
  top: 0;
  left: 0;
  height: 75px;
  box-shadow: 0px 1px 5px 1px rgba(0, 0, 0, 0.2);
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const HomeButton = styled.div`
  position: absolute;
  left: 20px;

  &:hover {
    cursor: pointer;
  }
`;

const Arrow = styled.div`
  width: 0;
  height: 0;
  border-top: 24px solid transparent;
  border-bottom: 24px solid transparent;
  border-left: ${({ direction }) => direction === 'left' ? 'none' : '40px solid black'};
  border-right: ${({ direction }) => direction === 'left' ? '40px solid black' : 'none'};

  &:hover {
    cursor: pointer;
  }
`;

const Blank = styled.div`
  width: 15px;
`;

const ArrowsWrapper = styled.div`
  display: flex;
  position: absolute;
  left: 100px;
`;

const ToggleButtonWrapper = styled.div`
  position: absolute;
  left: 215px;
`;

const ShareButtonWrapper = styled.div`
  position: absolute;
  right: 80px;
`;

const DeleteButton = styled.div`
  position: absolute;
  right: 140px;
  color: red;

  &:hover {
    cursor: pointer;
  }
`;

const DoneButton = styled.div`
  position: absolute;
  right: 20px;

  &:hover {
    cursor: pointer;
  }
`;

const ModifyRecordWrapper = styled.div`
  position: absolute;
  left: 345px;
`;

const Button = styled.button`
  color: #04040a !important;
  text-decoration: none;
  background: #9e9ea8;
  padding: 10px;
  border: 1px solid #9e9ea8 !important;
  display: inline-block;
  transition: all 0.4s ease 0s;
  border-radius: 20px;

  &:hover {
    color: #ffffff !important;
    background: #f6b93b;
    border-color: #f6b93b !important;
    transition: all 0.4s ease 0s;
  }
`;

export default function EditorPageHeader({
  currentUser,
  isShowChangesMode,
  onShowChangesModeToggle,
  isChanged,
  currentBranch,
  currentNote,
  onSaveClick,
  newNoteCandidate,
  onCreateBranch,
  onSave,
}) {
  const history = useHistory();

  function homeButtonClickHandler() {
    history.push('/');

    // initialize states related to Editor state..
    // what if user presses back button in the browser?
  }

  async function submitHandler() {
    const isBrandNew = !currentNote;

    let branchCreateResponse;

    if (isBrandNew) {
      const branchCreateRes = await fetch(
        `http://localhost:4000/users/${currentUser._id}/branches/new`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${localStorage.getItem(process.env.REACT_APP_GOOGIT_LOGIN_TOKEN)}`,
          },
        }
      );

      branchCreateResponse = await branchCreateRes.json();

      if (branchCreateResponse.result === 'failure') {
        alert('브랜치를 만들다가 문제가 생겼어요');

        return;
      }
    }

    const branchId = isBrandNew ? branchCreateResponse.branchId : currentNote?.parent;

    const noteCreateRes = await fetch(
      `http://localhost:4000/users/${currentUser._id}/branches/${branchId}/notes/new`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem(process.env.REACT_APP_GOOGIT_LOGIN_TOKEN)}`,
        },
        body: JSON.stringify(newNoteCandidate)
      }
    );

    const noteCreateResponse = await noteCreateRes.json();

    if (noteCreateResponse.result === 'failure') {
      alert('쪽지를 만들다가 문제가 생겼어요');

      // delete branch

      return;
    }

    if (isBrandNew) {
      onCreateBranch(branchCreateResponse.updatedUser);
    }

    console.log(noteCreateResponse);

    onSave(noteCreateResponse.newNote);
  }

  return (
    <Header>
      <HomeButton onClick={homeButtonClickHandler}>
        <h1>구깃</h1>
      </HomeButton>
      {
        !isChanged
        && <ArrowsWrapper>
          {/* {
            note.previous_version && */}
          <Arrow direction='left' />
          {/* } */}
          <Blank />
          {/* {
            note.next_version && */}
          <Arrow direction='right' />
          {/* } */}
        </ArrowsWrapper>
      }
      <ToggleButtonWrapper>
        <ToggleButton
          onClick={onShowChangesModeToggle}
          text={isShowChangesMode ? '수정사항 숨기기' : '수정사항 보기'}
        />
      </ToggleButtonWrapper>
      {
        isShowChangesMode
        && <ModifyRecordWrapper>
          누구누구가 언제언제 수정함
        </ModifyRecordWrapper>
      }
      {
        currentNote &&
        <>
          <DeleteButton>
            <h4>삭제</h4>
          </DeleteButton>
          <ShareButtonWrapper>
            <Button>공유</Button>
          </ShareButtonWrapper>
        </>
      }
      {
        isChanged
        && <DoneButton onClick={submitHandler}>
          <h2>저장</h2>
        </DoneButton>
      }
    </Header >
  );
}
