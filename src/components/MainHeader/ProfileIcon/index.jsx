import React, { useState } from 'react';
import { Wrapper, ProfileImg } from '../styledComponents';
import { Link } from 'react-router-dom';
import Modal, { ModalCloseButton, profileIconTheme } from '../../shared/Modal';
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
        <ProfileImg src={'/images/G-logo.png'} alt='logo' />
      </div>
      <Modal theme={profileIconTheme} isOpen={isModalOpen} toggleModal={toggleModal} >
        <ModalCloseButton toggleModal={toggleModal} />
        <Link to='/profile/edit'>
          <Button theme={coralButtonTheme} toggleModal={toggleModal}>계정관리</Button>
        </Link>
        <Link to='/'>
          <Button theme={coralButtonTheme} onClick={clickHandler} toggleModal={toggleModal}>
            로그아웃
            </Button>
        </Link>
      </Modal>
    </Wrapper>
  );
}
