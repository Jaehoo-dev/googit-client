import React, { useEffect, useMemo, useCallback } from 'react';
import { Wrapper } from './styledComponents';
import { createEditor, Transforms } from 'slate';
import { Slate, Editable, withReact } from 'slate-react';
import HoveringToolbar from './HoveringToolbar';
import Leaf from './Leaf';
import { emitJoinRoom, emitLeaveRoom, emitTyping, listenForTyping } from '../../services/socket';
import uuid from 'uuid-random';

export default function Editor({
  editor,
  value,
  setValue,
  onNoteModify,
  isModified,
  currentNote,
  hasWritingPermission,
  checkHasWritingPermission,
}) {
  useEffect(() => {
    console.log(currentNote, ' currentnote');
    emitJoinRoom(currentNote?._id);
    listenForTyping(setValue);

    return () => emitLeaveRoom(currentNote?._id);
  }, []);

  useEffect(() => {
    checkHasWritingPermission();
  }, [currentNote]);

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
      idLookingForwards: uuid(),
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
