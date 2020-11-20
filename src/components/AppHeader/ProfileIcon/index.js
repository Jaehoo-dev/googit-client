import React, { useState } from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import Modal, { ModalCloseButton } from '../../shared/Modal';
import Button from '../../shared/Button';

const Wrapper = styled.div`
  margin-right: 2em;
`;

const ProfileImg = styled.img`
  width: 1em;
`;

export default function ProfileIcon({ handleOnClick }) {
  const [isModalOpen, setIsModalOpen] = useState(false);

  function toggleModal() {
    setIsModalOpen(!isModalOpen);
  }

  return (
    <Wrapper>
      <div onClick={toggleModal}>
        <ProfileImg src={`${process.env.PUBLIC_URL}/images/G-logo.png`} alt='logo' />
      </div>
      <Modal isOpen={isModalOpen} toggleModal={toggleModal} >
        <ModalCloseButton toggleModal={toggleModal} />
        <Link to='/profile/edit'>
          <Button toggleModal={toggleModal}>계정관리</Button>
        </Link>
        <Link to='/'>
          <Button toggleModal={toggleModal}>로그아웃</Button>
        </Link>
      </Modal>
    </Wrapper>
  );
}
