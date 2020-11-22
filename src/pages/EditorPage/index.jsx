import React, { useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import EditorPageHeader from '../../components/EditorPageHeader';
import Editor from '../../components/Editor';
import requestCreateBranch from '../../api/requestCreateBranch';
import requestCreateNote from '../../api/requestCreateNote';
import requestBranch from '../../api/requestBranch';

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
}) {
  const history = useHistory();

  useEffect(() => {
    if (!currentNote) return;

    const branch = getBranch();

    onNoteLoad(currentNote, branch);

    async function getBranch() {
      return await requestBranch(currentUser._id, currentNote.parent);
    }
  }, []);

  function homeButtonClickHandler() {
    history.push('/');
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

  return (
    <>
      <EditorPageHeader
        currentUser={currentUser}
        currentNote={currentNote}
        isShowModificationsMode={isShowModificationsMode}
        onShowModificationsModeToggle={onShowModificationsModeToggle}
        isModified={isModified}
        onHomeButtonClick={homeButtonClickHandler}
        onSubmit={submitHandler}
        onNoteLoad={onNoteLoad}
      />
      <Editor
        onNoteModify={onNoteModify}
        isModified={isModified}
      />
    </>
  );
}
