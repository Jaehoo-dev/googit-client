import React from 'react';
import { useHistory } from 'react-router-dom';
import EditorPageHeader from '../../components/EditorPageHeader';
import Editor from '../../components/Editor';
import requestCreateBranch from '../../api/requestCreateBranch';
import requestCreateNote from '../../api/requestCreateNote';

export default function EditorPage({
  currentUser,
  onEditorFocusOrBlur,
  isShowChangesMode,
  onShowChangesModeToggle,
  isChanged,
  onNoteChange,
  newNoteCandidate,
  onCreateBranch,
  onSave,
  currentNote,
}) {
  // if !isLatestNote, contentEditable=false

  const history = useHistory();

  function homeButtonClickHandler() {
    history.push('/');
  }

  async function submitHandler() {
    const isBrandNew = !currentNote;

    let branchCreateResponse;

    if (isBrandNew) {
      branchCreateResponse = await requestCreateBranch(currentUser);

      if (!branchCreateResponse) return;
    }

    const branchId
      = isBrandNew
        ? branchCreateResponse.branchId
        : currentNote?.parent;

    const noteCreateResponse
      = await requestCreateNote(newNoteCandidate, currentUser, branchId);

    if (!noteCreateResponse) return;

    if (isBrandNew) {
      onCreateBranch(branchCreateResponse.updatedUser);
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
      />
      <Editor
        onEditorFocusOrBlur={onEditorFocusOrBlur}
        onNoteChange={onNoteChange}
        isChanged={isChanged}
      />
    </>
  );
}
