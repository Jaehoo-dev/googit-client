import React from 'react';
import { createPortal } from 'react-dom';
import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes } from '@fortawesome/free-solid-svg-icons';

const ModalContainer = styled.div`
  width: 20em;
  height: 10em;
  background-color: white;
  box-shadow: 0px 4px 5px 0px rgba(0, 0, 0, 0.6);
  position: absolute;
  top: 75px;
  left: 83.3%;

  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  align-items: center;
  padding-bottom: 1em;
  z-index: 1000;
`;

const CloseButton = styled.div`
  margin-left: 90%;
`;

const Overlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: 'rgba(0, 0, 0, 0.7)';
  z-index: 1000;
`;

export default function Modal({ isOpen, children, handleOnClick }) {
  if (!isOpen) return null;

  return createPortal(
    <>
      <Overlay onClick={handleOnClick} />
      <ModalContainer>
        <CloseButton onClick={handleOnClick}>
          <FontAwesomeIcon icon={faTimes} />
        </CloseButton>
        {children}
      </ModalContainer>
    </>,
    document.getElementById('portal'));
}
