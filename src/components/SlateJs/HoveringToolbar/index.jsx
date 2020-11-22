import React, { useRef, useEffect } from 'react';
import { ReactEditor, useSlate } from 'slate-react';
import { Editor } from 'slate';
import { css } from '@emotion/css';
import { Menu, Portal } from '../components';
import { Range } from 'slate';
import FormatButton from '../FormatButton';

export default function HoveringToolbar() {
  const formats = [
    'bold',
    'italic',
    'underline',
    'strike',
    'mark',
    'big'
  ];
  const menuRef = useRef();
  const editor = useSlate();

  useEffect(() => {
    const element = menuRef.current;
    const { selection } = editor;

    if (!element) {
      return;
    }

    if (
      !selection
      || !ReactEditor.isFocused(editor)
      || Range.isCollapsed(selection)
      || Editor.string(editor, selection)
      === ''
    ) {
      element.removeAttribute('style');

      return;
    }

    const domSelection = window.getSelection();
    const domRange = domSelection.getRangeAt(0);
    const rect = domRange.getBoundingClientRect();

    element.style.opacity = '1';
    element.style.top
      = `${rect.top + window.pageYOffset - element.offsetHeight}px`;
    element.style.left
      = `${rect.left + window.pageXOffset - element.offsetWidth / 2 + rect.width / 2}px`;
  });

  return (
    <Portal>
      <Menu
        ref={menuRef}
        className={css`
          padding: 8px 7px 6px;
          position: absolute;
          z-index: 1;
          top: -10000px;
          left: -10000px;
          margin-top: -6px;
          opacity: 0;
          background-color: #222;
          border-radius: 4px;
          transition: opacity 0.75s;
        `}
      >
        {
          formats.map(format => {
            return (
              <FormatButton
                key={format}
                format={format}
                icon={format}
              />
            );
          })
        }
      </Menu>
    </Portal>
  );
};
