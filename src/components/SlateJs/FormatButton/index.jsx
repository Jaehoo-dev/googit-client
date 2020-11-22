import React from 'react';
import { useSlate } from 'slate-react';
import { Editor, Transforms, Text } from 'slate';
import { Button } from '../components';
import FormatBoldIcon from '@material-ui/icons/FormatBold';
import FormatItalicIcon from '@material-ui/icons/FormatItalic';
import FormatUnderlinedIcon from '@material-ui/icons/FormatUnderlined';
import FormatStrikethroughIcon from '@material-ui/icons/FormatStrikethrough';
import FormatSizeIcon from '@material-ui/icons/FormatSize';
import HighlightIcon from '@material-ui/icons/Highlight';

export default function FormatButton({ format, icon }) {
  const editor = useSlate();

  return (
    <Button
      reversed
      active={isFormatActive(editor, format)}
      onMouseDown={event => {
        event.preventDefault();
        toggleFormat(editor, format);
      }}
    >
      {
        icon === 'bold' ? <FormatBoldIcon />
          : icon === 'italic' ? <FormatItalicIcon />
            : icon === 'underline' ? <FormatUnderlinedIcon />
              : icon === 'strike' ? <FormatStrikethroughIcon />
                : icon === 'mark' ? <HighlightIcon />
                  : <FormatSizeIcon />
      }
    </Button>
  );
};

function toggleFormat(editor, format) {
  const isActive = isFormatActive(editor, format);

  Transforms.setNodes(
    editor,
    { [format]: isActive ? null : true },
    { match: Text.isText, split: true }
  );
};

function isFormatActive(editor, format) {
  const [match] = Editor.nodes(editor, {
    match: n => n[format] === true,
    mode: 'all',
  });

  return !!match;
};
