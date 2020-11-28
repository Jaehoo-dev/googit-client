import React from 'react';
import { ThemeProvider } from 'styled-components';
import { StyledButton } from '../styledComponents/Button.styled';

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

export const logoutButtonTheme = {
  backgroundColor: 'transparent',
  border: 'none',
  fontSize: 'xx-large',
  marginLeft: '1em',
};

export const permissionHandleButtonTheme = {
  width: '5em',
  height: '2em',
  backgroundColor: '#f08080',
  border: 'none',
  borderRadius: '1em',
  margin: '0 3px',
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
  border: 'none',
};

export const coralButtonTheme = {
  backgroundColor: '#f08080',
  fontSize: '16px',
  border: 'none',
  borderRadius: '1em',
};

export const shareButtonTheme = {
  backgroundColor: '#f08080',
  width: '5em',
  height: '2em',
  border: 'none',
  borderRadius: '1em',
};

export const saveButtonTheme = {
  fontSize: '18px',
  fontWeight: 700,
  border: 'none',
  borderRadius: '1em',
};

export const iconButtonTheme = {
  backgroundColor: 'transparent',
  border: 'none',
};

export const createNewBranchTheme = {
  backgroundColor: 'transparent',
  border: '2.5px solid #f08080',
  width: '50%',
  height: '3.2em',
  borderRadius: '1em',
  fontSize: '16px',
  margin: '0 0 0 30%',
  transform: 'translate(-50 %, -50 %)',
};
