import React from 'react';
import { useSlate } from 'slate-react';
import { Editor, Transforms, Text } from 'slate';
import FormatBoldIcon from '@material-ui/icons/FormatBold';
import FormatItalicIcon from '@material-ui/icons/FormatItalic';
import FormatUnderlinedIcon from '@material-ui/icons/FormatUnderlined';
import FormatStrikethroughIcon from '@material-ui/icons/FormatStrikethrough';
import FormatSizeIcon from '@material-ui/icons/FormatSize';
import HighlightIcon from '@material-ui/icons/Highlight';
import { cx, css } from '@emotion/css';

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

const Button = React.forwardRef(
  (
    {
      className,
      active,
      reversed,
      ...props
    },
    ref
  ) => (
      <span
        {...props}
        ref={ref}
        className={cx(
          className,
          css`
          cursor: pointer;
          color: ${reversed
              ? active
                ? 'white'
                : '#aaa'
              : active
                ? 'black'
                : '#ccc'};
        `
        )}
      />
    )
);
