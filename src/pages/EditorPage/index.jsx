import React, { useEffect } from 'react';
import EditorPageHeader from '../../components/EditorPageHeader';
import Editor from '../../components/Editor';

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
  // if isChanged, disable arrows
  // if isShowChangesMode, 누가 언제 작성했는지 보여줌
  // if !isLatestNote, contentEditable=false

  return (
    <>
      <EditorPageHeader
        currentUser={currentUser}
        currentNote={currentNote}
        isShowChangesMode={isShowChangesMode}
        onShowChangesModeToggle={onShowChangesModeToggle}
        isChanged={isChanged}
        newNoteCandidate={newNoteCandidate}
        onCreateBranch={onCreateBranch}
        onSave={onSave}
      />
      <Editor
        onEditorFocusOrBlur={onEditorFocusOrBlur}
        onNoteChange={onNoteChange}
        isChanged={isChanged}
      />
    </>
  );
}
