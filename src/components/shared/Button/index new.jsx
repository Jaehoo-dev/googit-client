import React from 'react';
import { ThemeProvider } from 'styled-components';
import { StyledButton } from './styledComponents';

export default function Button({
  children,
  onClick,
  theme
}) {
  return (
    <ThemeProvider theme={theme}>
      <StyledButton onClick={onClick}>
        {children}
      </StyledButton>
    </ThemeProvider>
  );
}

export const homeButtonTheme = {
  backgroundColor: 'white',
  fontSize: '26px',
  fontWeight: 900,
};

export const deleteButtonTheme = {
  color: 'red',
  backgroundColor: 'white',
  fontSize: '12px',
};

export const coralButtonTheme = {
  backgroundColor: '#f08080',
  fontSize: '16px',
};

export const saveButtonTheme = {
  fontSize: '18px',
  fontWeight: 700,
};

export const searchButtonTheme = {
  backgroundColor: 'transparent'
};

export const createNewBranchTheme = {
  height: '3em',
};
