import React, { useEffect, useMemo, useCallback } from 'react';
import { Wrapper } from './styledComponents';
import { createEditor } from 'slate';
import { Slate, Editable, withReact } from 'slate-react';
import HoveringToolbar from './HoveringToolbar';
import Leaf from './Leaf';
import { emitJoinRoom, emitLeaveRoom, emitTyping, listenForTyping } from '../../services/socket';
import uuid from 'uuid-random';

export default function Editor({
  value,
  setValue,
  onNoteModify,
  isModified,
  currentNote,
  hasWritingPermission,
  checkHasWritingPermission,
}) {
  const editor = useMemo(() => withReact(createEditor()), []);

  useEffect(() => {
    checkHasWritingPermission();

    // if (!currentNote) return;

    // setValue(currentNote.blocks);
    // onNoteLoad();

    // async function onNoteLoad() {
    //   const previousNote
    //     = await requestNote(currentUser._id, currentNote.previous_version);

    //   setPreviousNote(previousNote);
    // }

    // return () => setPreviousNote(null);
  }, [currentNote]);

  useEffect(() => {
    emitJoinRoom(currentNote?._id);
    listenForTyping(setValue);

    return () => emitLeaveRoom(currentNote?._id);
  }, []);

  function noteValueChangeHandler(newValue) {
    if (newValue === value) return;

    setValue(newValue);
    onNoteModify(newValue, isModified);
    emitTyping(currentNote?._id, newValue);
  }

  function enterPressHandler() {
    const newBlock = {
      type: 'paragraph',
      children: [{ text: '' }],
      idLookingBack: uuid(),
    };

    editor.insertNode(newBlock);
  }

  const renderLeaf = useCallback(props => {
    return <Leaf {...props} />;
  }, []);

  return (
    <Wrapper>
      <Slate
        editor={editor}
        value={value}
        onChange={value => noteValueChangeHandler(value)}
      >
        <HoveringToolbar />
        <Editable
          renderLeaf={renderLeaf}
          placeholder='줄을 자주 바꿔주세요.'
          readOnly={!hasWritingPermission}
          onKeyDown={event => {
            if (event.key === 'Enter') {
              event.preventDefault();
              enterPressHandler();
            }
          }}
        />
      </Slate>
    </Wrapper>
  );
}
