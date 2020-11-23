import React from 'react';

export default function Leaf({
  attributes,
  children,
  leaf,
}) {
  if (leaf.bold) {
    children = <strong>{children}</strong>;
  }

  if (leaf.italic) {
    children = <em>{children}</em>;
  }

  if (leaf.underline) {
    children = <u>{children}</u>;
  }

  if (leaf.strike) {
    children = <strike>{children}</strike>;
  }

  if (leaf.big) {
    children = <big>{children}</big>;
  }

  if (leaf.mark) {
    children = <mark>{children}</mark>;
  }

  return <span {...attributes}>{children}</span>;
};
