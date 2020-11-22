import React from 'react';
import { useHistory } from 'react-router-dom';
import EditorPageHeader from '../../components/EditorPageHeader';
import Editor from '../../components/Editor';
import requestCreateBranch from '../../api/requestCreateBranch';
import requestCreateNote from '../../api/requestCreateNote';

export default function EditorPage({
  currentUser,
  isShowChangesMode,
  onShowChangesModeToggle,
  isChanged,
  onNoteChange,
  newBlocksCandidate,
  onCreateBranch,
  onSave,
  currentNote,
  onNoteLoad,
}) {
  const history = useHistory();

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
        ? branchCreationResponse.branchId
        : currentNote.parent;

    const noteCreateResponse
      = await requestCreateNote(newBlocksCandidate, currentUser, branchId);

    if (!noteCreateResponse) return;

    if (isBrandNew) {
      onCreateBranch(branchCreationResponse.updatedUser);
    }

    onSave(noteCreateResponse.newNote);
  }

  return (
    <>
      <EditorPageHeader
        currentNote={currentNote}
        isShowChangesMode={isShowChangesMode}
        onShowChangesModeToggle={onShowChangesModeToggle}
        isChanged={isChanged}
        onHomeButtonClick={homeButtonClickHandler}
        onSubmit={submitHandler}
        onNoteLoad={onNoteLoad}
      />
      <Editor
        onNoteChange={onNoteChange}
        isChanged={isChanged}
      />
    </>
  );
}
