import React, { useEffect, useMemo, useState, useCallback } from 'react';
import { Wrapper } from './styledComponents';
import { createEditor } from 'slate';
import { Slate, Editable, withReact } from 'slate-react';
import HoveringToolbar from './HoveringToolbar';
import Leaf from './Leaf';

export default function Editor({
  onNoteModify,
  isModified,
  currentNote,
  isShowModificationsMode,
  hasWritingPermission,
  checkHasWritingPermission,
}) {
  const editor = useMemo(() => withReact(createEditor()), []);
  const [value, setValue] = useState([
    {
      type: 'paragraph',
      children: [{ text: '' }],
    },
  ]);

  useEffect(() => {
    checkHasWritingPermission();

    if (!currentNote) return;

    setValue(currentNote.blocks);
  }, [currentNote]);

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
          renderLeaf={renderLeaf}
          placeholder='줄을 자주 바꿔주세요.'
          readOnly={!hasWritingPermission}
        />
      </Slate>
    </Wrapper>
  );
}
