import React, { useMemo, useState, useCallback } from 'react';
import { createEditor } from 'slate';
import { Slate, Editable, withReact } from 'slate-react';
import HoveringToolbar from './HoveringToolbar';
import Leaf from './Leaf';

export default function SlateJs({
  onNoteChange,
  isChanged,
}) {
  const editor = useMemo(() => withReact(createEditor()), []);

  const [value, setValue] = useState([
    {
      type: 'paragraph',
      children: [{ text: '' }],
    },
  ]);

  const renderLeaf = useCallback(props => {
    return <Leaf {...props} />;
  }, []);

  return (
    <Slate
      editor={editor}
      value={value}
      onChange={newValue => {
        if (newValue === value) return;

        setValue(newValue);
        onNoteChange(newValue, isChanged);
      }}
    >
      <HoveringToolbar />
      <Editable renderLeaf={renderLeaf} />
    </Slate>
  );
}
