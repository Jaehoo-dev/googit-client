import React from 'react';
import { createPortal } from 'react-dom';
import styled, { ThemeProvider } from 'styled-components';
import CloseIcon from '@material-ui/icons/Close';

const Overlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: 'rgba(0, 0, 0, 0.7)';
  z-index: 1000;
`;

const ModalContainer = styled.div`
  width: ${props => props.theme.width};
  height: ${props => props.theme.height};
  background-color: ${props => props.theme.backgroundColor};
  box-shadow: 0px 4px 5px 0px rgba(0, 0, 0, 0.6);
  position: absolute;
  top: ${props => props.theme.top};
  left: ${props => props.theme.left};
  padding-bottom: 1em;
  border-radius: 1em;

  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  align-items: center;
  z-index: 1000;
`;

ModalContainer.defaultProps = {
  theme: {
    width: '20em',
    height: '10em',
    backgroundColor: 'white',
    top: '75px',
    left: '83.3%'
  }
};

export const profileIconTheme = {
  width: '20em',
  height: '10em',
  backgroundColor: 'white',
  top: '75px',
  left: '83.3%'
};

export const sharingModalTheme = {
  backgroundColor: 'white',
  width: '50em',
  height: '25em',
  top: '14%',
  left: '23%'
};

export default function Modal({
  isOpen,
  children,
  toggleModal,
  theme,
}) {
  if (!isOpen) return null;

  return createPortal(
    <>
      <Overlay onClick={toggleModal} />
      <ThemeProvider theme={theme}>
        <ModalContainer>
          {children}
        </ModalContainer>
      </ThemeProvider>
    </>,
    document.getElementById('portal')
  );
}

const CloseButton = styled.button`
  margin-left: 90%;
  background-color: transparent;
  border: none;
`;

export function ModalCloseButton({ onClick }) {
  return (
    <CloseButton onClick={onClick}>
      <CloseIcon />
    </CloseButton>
  );
}
