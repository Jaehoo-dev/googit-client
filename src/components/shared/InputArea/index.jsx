import React from 'react';
import { StyledInputArea } from './styledComponents';

export default function InputArea({
  onChange,
  value,
  placeholder,
  name
}) {
  function textChangeHandler(event) {
    onChange(event);
  }

  return (
    <StyledInputArea
      name={name}
      placeholder={placeholder}
      value={value}
      onChange={textChangeHandler}
    />
  );

}
