import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import EditorPageHeader from '../../components/EditorPageHeader';
import Editor from '../../components/Editor';
import requestCreateBranch from '../../api/requestCreateBranch';
import requestCreateNote from '../../api/requestCreateNote';
import requestBranchSharingInfo from '../../api/requestBranchSharingInfo';
import requestDeleteBranch from '../../api/requestDeleteBranch';
import requestBranchList from '../../api/requestBranchList';
import uuid from 'uuid-random';

export default function EditorPage({
  currentUser,
  isShowModificationsMode,
  onShowModificationsModeToggle,
  isModified,
  onNoteModify,
  newBlocksCandidate,
  onCreateBranch,
  onSave,
  currentNote,
  currentBranch,
  onNoteLoad,
  onNoteChange,
  sharedUsers,
  onSharedUsersLoad,
  onClick,
  onHomeButtonClick,
  onDeleteBranch,
  setPreviousNote,
  skip,
  isPrivateMode,
  onSetBranchList,
  onUpdateBranchList,
}) {
  const history = useHistory();
  const [hasWritingPermission, setHasWritingPermission] = useState(undefined);
  const [value, setValue] = useState([
    {
      type: 'paragraph',
      children: [{ text: '' }],
      idLookingBack: uuid(),
    },
  ]);

  useEffect(() => {
    if (!currentNote) return;

    setValue(currentNote.blocks);
  }, [currentNote]);

  async function homeButtonClickHandler() {
    history.push('/');

    onHomeButtonClick();

    if (!currentUser) return;

    loadBranchList();

    async function loadBranchList() {
      const response = await requestBranchList(currentUser, isPrivateMode, skip);

      if (!response) return;
      return (!skip)
        ? onSetBranchList(response)
        : onUpdateBranchList(response);
    }
  }

  async function submitHandler() {
    const isBrandNew = !currentNote;

    let branchCreationResponse;

    if (isBrandNew) {
      branchCreationResponse = await requestCreateBranch(currentUser);

      if (!branchCreationResponse) return;
    }

    const branchId
      = isBrandNew
        ? branchCreationResponse.newBranch._id
        : currentNote.parent;

    const noteCreateResponse
      = await requestCreateNote(newBlocksCandidate, currentUser, branchId);

    if (!noteCreateResponse) return;

    if (isBrandNew) {
      onCreateBranch(branchCreationResponse.updatedUser);
    }

    onSave(
      noteCreateResponse.newNote,
      noteCreateResponse.updatedBranch
    );
  }

  async function checkHasWritingPermission() {
    if (!currentNote) return setHasWritingPermission(true);

    if (currentNote._id !== currentBranch.latest_note) {
      return setHasWritingPermission(false);
    }

    if (currentBranch.created_by === currentUser._id) {
      return setHasWritingPermission(true);
    }

    const sharedUserInfoIds = currentBranch.shared_users_info;

    for (let i = 0; i < sharedUserInfoIds.length; i++) {
      const branchSharingInfo
        = await requestBranchSharingInfo(currentUser._id, sharedUserInfoIds[i]);

      if (branchSharingInfo?.has_writing_permission) {
        return setHasWritingPermission(true);
      }
    }

    return setHasWritingPermission(false);
  }

  async function deleteButtonClickHandler() {
    const isDeleteConfirmed
      = window.confirm('정말 삭제합니까? 수정기록도 지워집니다.');

    if (!isDeleteConfirmed) return;

    const branchDeleteResponse
      = await requestDeleteBranch(currentUser, currentBranch);

    onDeleteBranch(branchDeleteResponse.updatedUser);

    history.push('/');
  }

  return (
    <>
      <EditorPageHeader
        currentUser={currentUser}
        currentNote={currentNote}
        currentBranch={currentBranch}
        isShowModificationsMode={isShowModificationsMode}
        onShowModificationsModeToggle={onShowModificationsModeToggle}
        isModified={isModified}
        onHomeButtonClick={homeButtonClickHandler}
        onSubmit={submitHandler}
        onNoteLoad={onNoteLoad}
        onNoteChange={onNoteChange}
        sharedUsers={sharedUsers}
        onSharedUsersLoad={onSharedUsersLoad}
        onClick={onClick}
        onDeleteButtonClick={deleteButtonClickHandler}
      />
      <Editor
        value={value}
        setValue={setValue}
        currentUser={currentUser}
        currentNote={currentNote}
        setPreviousNote={setPreviousNote}
        currentBranch={currentBranch}
        onNoteModify={onNoteModify}
        isModified={isModified}
        isShowModificationsMode={isShowModificationsMode}
        checkHasWritingPermission={checkHasWritingPermission}
        hasWritingPermission={hasWritingPermission}
      />
    </>
  );
}
