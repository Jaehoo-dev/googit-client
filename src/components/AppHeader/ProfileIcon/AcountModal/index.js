import React, { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes } from '@fortawesome/free-solid-svg-icons';
import AccountManagement from './AccountManagement/index';
import Logout from './Logout/index';
import apiLogOutUser from '../../../../api/apiUserLogout';

const Modal = styled.div`
  width: 20em;
  height: 10em;
  box-shadow: 0px 4px 5px 0px rgba(0, 0, 0, 0.6);
  position: relative;
  top: -2em;
  left: 76.8%;
  z-index: 1000;

  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  align-items: center;
  padding-bottom: 1em;
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

export default function AccountModal({ open, handleOnClick, handleLogout }) {
  if (!open) return null;

  return createPortal(
    <>
      <Overlay onClick={handleOnClick} />
      <Modal>
        <CloseButton onClick={handleOnClick}>
          <FontAwesomeIcon icon={faTimes} />
        </CloseButton>
        <AccountManagement handleOnClick={handleOnClick} />
        <Logout handleOnClick={handleLogout} />
      </Modal>
    </>,
    document.getElementById('portal'),
  );
}
