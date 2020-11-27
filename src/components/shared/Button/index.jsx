import React from 'react';
import { ThemeProvider } from 'styled-components';
import { StyledButton } from './styledComponents';

export default function Button({
  children,
  onClick,
  name,
  value,
  theme,
}) {
  return (
    <ThemeProvider theme={theme}>
      <StyledButton name={name} value={value} onClick={onClick}>
        {children}
      </StyledButton>
    </ThemeProvider>
  );
}

export const permissionHandleButtonTheme = {
  width: '5em',
  height: '2em',
  backgroundColor: 'yellowgreen',
  border: '1px solid black',
};

export const homeButtonTheme = {
  backgroundColor: 'white',
  fontSize: '26px',
  fontWeight: 900,
  border: 'none',
};

export const deleteButtonTheme = {
  color: 'red',
  backgroundColor: 'white',
  fontSize: '12px',
};

export const coralButtonTheme = {
  backgroundColor: '#f08080',
  fontSize: '16px',
  margin: '0 0 0 2em',
  border: 'none',
  borderRadius: '1em',
};

export const shareButtonTheme = {
  backgroundColor: '#f08080',
  width: '5em',
  height: '2em',
};

export const saveButtonTheme = {
  fontSize: '18px',
  fontWeight: 700,
};

export const iconButtonTheme = {
  backgroundColor: 'transparent',
  border: 'none',
};

export const createNewBranchTheme = {
  backgroundColor: 'transparent',
  border: '2.5px solid #f08080',
  width: '55.8em',
  height: '3.2em',
  borderRadius: '1em',
  fontSize: '16px',
  margin: '0 0 0 8em',
  transform: 'translate(-50 %, -50 %)',
};
