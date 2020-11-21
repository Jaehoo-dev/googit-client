import React, { useState } from 'react';
import { Wrapper, ProfileImg } from '../styledComponents';
import { ThemeProvider } from 'styled-components';
import { Link } from 'react-router-dom';
import Modal, { ModalCloseButton } from '../../shared/Modal';
import Button, { coralButtonTheme } from '../../shared/Button';

export default function ProfileIcon({ onClick }) {
  const [isModalOpen, setIsModalOpen] = useState(false);

  function toggleModal() {
    setIsModalOpen(!isModalOpen);
  }

  function clickHandler() {
    onClick();
  }

  return (
    <Wrapper>
      <div onClick={toggleModal}>
        <ProfileImg src={`${process.env.PUBLIC_URL}/images/G-logo.png`} alt='logo' />
      </div>
      <Modal isOpen={isModalOpen} toggleModal={toggleModal} >
        <ModalCloseButton toggleModal={toggleModal} />
        <Link to='/profile/edit'>
          <ThemeProvider theme={coralButtonTheme}>
            <Button toggleModal={toggleModal}>계정관리</Button>
          </ThemeProvider>
        </Link>
        <Link to='/'>
          <ThemeProvider theme={coralButtonTheme}>
            <Button onClick={clickHandler} toggleModal={toggleModal}>
              로그아웃
            </Button>
          </ThemeProvider>
        </Link>
      </Modal>
    </Wrapper>
  );
}
