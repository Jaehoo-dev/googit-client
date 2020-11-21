import React from 'react';
import { StyledButton } from './styledComponents';

export default function Button({
  children,
  onClick,
}) {
  function clickHandler() {
    onClick();
  }

  return (
    <StyledButton onClick={clickHandler}>
      {children}
    </StyledButton>
  );
}

export const homeButtonTheme = {
  backgroundColor: 'white',
  fontSize: '26px',
  fontWeight: 900,
};

export const showChangesButtonTheme = {
  backgroundColor: '#f08080',
  fontSize: '16px',
};

export const deleteButtonTheme = {
  color: 'red',
  backgroundColor: 'white',
  fontSize: '12px',
};

export const shareButtonTheme = {
  backgroundColor: '#f08080',
  fontSize: '16px',
};

export const saveButtonTheme = {
  fontSize: '18px',
  fontWeight: 700,
};
