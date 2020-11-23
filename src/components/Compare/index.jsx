import React, { useEffect, useMemo, useState, useCallback } from 'react';
import { Wrapper } from './styledComponents';
import { createEditor } from 'slate';
import { Slate, Editable, withReact } from 'slate-react';
import HoveringToolbar from './HoveringToolbar';
import Leaf from './Leaf';

export default function Editor({
  currentUser,
  currentBranch,
  onNoteModify,
  isModified,
  currentNote,
  isShowModificationsMode,
}) {
  const editor = useMemo(() => withReact(createEditor()), []);
  const [value, setValue] = useState([
    {
      'type': 'paragraph',
      'children': [{ 'text': 'rksk' }]
    },
    {
      'type': 'paragraph',
      'children': [{ 'text': '' }]
    },
    {
      'type': 'paragraph',
      'children': [{ 'text': 'asdfasdf' }]
    },
    {
      'type': 'paragraph',
      'children': [{ 'text': '' }]
    },
    {
      'type': 'paragraph',
      'children': [{ 'text': '' }]
    },
    {
      'type': 'paragraph',
      'children': [
        { 'text': 'a' },
        { 'text': 'fba', 'bold': true },
        { 'text': 'os' },
        { 'text': 'dfak', 'underline': true },
        { 'text': 'sjdf' }
      ]
    },
    {
      'type': 'paragraph',
      'children': [{ 'text': '' }]
    },
    {
      'type': 'paragraph',
      'children': [{ 'text': '' }]
    },
    {
      'type': 'paragraph',
      'children': [{ 'text': 'asdlfjkahsldkjf' }]
    }
  ]);
  const isEditable = true || checkIsEditable();

  async function checkIsEditable() {
    if (!currentNote || !currentBranch) return true;

    if (currentNote._id !== currentBranch.latest_note) {
      return false;
    }

    if (currentBranch.created_by === currentUser._id) {
      return true;
    }

    if (
      currentBranch.shared_users_info.indexOf(currentUser._id) < 0
    ) {
      return false;
    }


  }

  // useEffect(() => {
  //   if (!currentNote) return;

  //   setValue(currentNote.blocks);
  // }, [currentNote]);

  useEffect(() => {

  }, [isShowModificationsMode]);

  const renderLeaf = useCallback(props => {
    return <Leaf {...props} />;
  }, []);

  return (
    <Wrapper>
      <Slate
        editor={editor}
        value={value}
        onChange={newValue => {
          if (newValue === value) return;

          setValue(newValue);
          onNoteModify(newValue, isModified);
        }}
      >
        <HoveringToolbar />
        <Editable
          readOnly={!isEditable}
          renderLeaf={renderLeaf}
          placeholder='줄을 자주 바꿔주세요.'
        />
      </Slate>
    </Wrapper>
  );
}
