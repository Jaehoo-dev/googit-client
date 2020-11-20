import React from 'react';
import { createPortal } from 'react-dom';
import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes } from '@fortawesome/free-solid-svg-icons';

const Overlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: 'rgba(0, 0, 0, 0.7)';
  z-index: 1000;
`;

// const ModalContainer = styled.div`
//   width: 20em;
//   height: 10em;
//   background-color: white;
//   box-shadow: 0px 4px 5px 0px rgba(0, 0, 0, 0.6);
//   position: absolute;
//   top: 75px;
//   left: 83.3%;
//   display: flex;
//   flex-direction: column;
//   justify-content: space-evenly;
//   align-items: center;
//   padding-bottom: 1em;
//   z-index: 1000;
// `;

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

export const themeSharing = {
  backgroundColor: 'yellowgreen',
  width: '60em',
  height: '30em',
  top: '20%',
  left: '25%'
};

export default function Modal({ isOpen, children, toggleModal }) {
  if (!isOpen) return null;

  return createPortal(
    <>
      <Overlay onClick={toggleModal} />
      <ModalContainer>
        {children}
      </ModalContainer>
    </>,
    document.getElementById('portal'));
}

const CloseButton = styled.div`
  margin-left: 90%;
`;

export function ModalCloseButton({ toggleModal }) {
  return (
    <CloseButton onClick={toggleModal}>
      <FontAwesomeIcon icon={faTimes} />
    </CloseButton>
  );
}
