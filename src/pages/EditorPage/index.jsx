import React, { useState, useEffect, useMemo } from 'react';
import { useHistory } from 'react-router-dom';
import EditorPageHeader from '../../components/EditorPageHeader';
import Editor from '../../components/Editor';
import requestCreateBranch from '../../api/requestCreateBranch';
import requestCreateNote from '../../api/requestCreateNote';
import requestDeleteBranch from '../../api/requestDeleteBranch';
import requestNoteList from '../../api/requestNoteList';
import requestNote from '../../api/requestNote';
import checkHasWritingPermission from '../../utils/checkHasWritingPermission';
import compareNoteChanges from '../../utils/compareNoteChanges';
import { createEditor, Transforms } from 'slate';
import { withReact } from 'slate-react';
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
  skip,
  isPrivateMode,
  onSetNoteList,
  onUpdateNoteList,
}) {
  const editor = useMemo(() => withReact(createEditor()), []);
  const history = useHistory();
  const [hasWritingPermission, setHasWritingPermission] = useState(undefined);
  const [value, setValue] = useState([
    {
      type: 'paragraph',
      children: [{ text: '' }],
      idLookingForwards: uuid(),
    },
  ]);

  useEffect(() => {
    if (!currentNote) return;

    setValue(currentNote.blocks);
  }, [currentNote]);

  async function onShowModificationsModeButtonClick() {
    if (!isShowModificationsMode) {
      onShowModificationsModeToggle();

      let comparedNoteValue
        = JSON.parse(localStorage.getItem('googit-compared-note-value')) || null;

      if (comparedNoteValue) {
        Transforms.select(editor, [0]);
        initializeSelectAndSetValue(comparedNoteValue);

        return;
      }

      const previousNote
        = await requestNote(currentUser._id, currentNote.previous_version);

      comparedNoteValue = compareNoteChanges(previousNote, currentNote);

      initializeSelectAndSetValue(comparedNoteValue);
      localStorage.setItem('googit-compared-note-value', JSON.stringify(comparedNoteValue));

    } else {
      onShowModificationsModeToggle();
      initializeSelectAndSetValue(currentNote.blocks);
    }
  }

  function initializeSelectAndSetValue(value) {
    Transforms.select(editor, [0]);
    setValue(value);
  }

  async function homeButtonClickHandler() {
    history.push('/');

    onHomeButtonClick();

    if (!currentUser) return;

    loadNoteList();

    async function loadNoteList() {
      const response = await requestNoteList(currentUser, isPrivateMode, skip);

      if (!response) return;
      return (!skip)
        ? onSetNoteList(response)
        : onUpdateNoteList(response);
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
        onShowModificationsModeButtonClick={onShowModificationsModeButtonClick}
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
        editor={editor}
        value={value}
        setValue={setValue}
        currentUser={currentUser}
        currentNote={currentNote}
        currentBranch={currentBranch}
        onNoteModify={onNoteModify}
        isModified={isModified}
        isShowModificationsMode={isShowModificationsMode}
        checkHasWritingPermission={checkHasWritingPermission.bind(null, currentUser, currentNote, currentBranch, setHasWritingPermission)}
        hasWritingPermission={hasWritingPermission}
      />
    </>
  );
}
