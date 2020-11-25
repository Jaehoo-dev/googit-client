import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import EditorPageHeader from '../../components/EditorPageHeader';
import Editor from '../../components/Editor';
import Compare from '../../components/Compare';
import requestCreateBranch from '../../api/requestCreateBranch';
import requestCreateNote from '../../api/requestCreateNote';
import requestBranchSharingInfo from '../../api/requestBranchSharingInfo';

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
}) {
  const [hasWritingPermission, setHasWritingPermission] = useState(undefined);
  const history = useHistory();

  function homeButtonClickHandler() {
    history.push('/');

    onHomeButtonClick();
  }

  async function submitHandler() {
    const isBrandNew = !currentNote;

    let branchCreationResponse;

    if (isBrandNew) {
      branchCreationResponse = await requestCreateBranch(currentUser);

      if (!branchCreationResponse) return;
    }
    console.log(isBrandNew, 'isb');
    console.log(branchCreationResponse, 'response branh');
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

    // should be latest_note not latest_note._id
    if (currentNote._id !== currentBranch.latest_note._id) {
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
      />
      <Editor
        currentUser={currentUser}
        currentNote={currentNote}
        currentBranch={currentBranch}
        onNoteModify={onNoteModify}
        isModified={isModified}
        isShowModificationsMode={isShowModificationsMode}
        checkHasWritingPermission={checkHasWritingPermission}
        hasWritingPermission={hasWritingPermission}
      />
      {/* <Compare
        currentUser={currentUser}
        currentNote={currentNote}
        currentBranch={currentBranch}
        onNoteModify={onNoteModify}
        isModified={isModified}
        isShowModificationsMode={isShowModificationsMode}
      /> */}
    </>
  );
}
