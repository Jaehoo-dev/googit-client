import React, { useState } from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import Modal from '../../shared/Modal';
import Button from '../../shared/Button';

const Wrapper = styled.div`
  margin-right: 2em;
`;

const ProfileImg = styled.img`
  width: 1em;
`;

export default function ProfileIcon({ handleOnClick }) {
  const [isModalOpen, setIsModalOpen] = useState(false);

  function handleModalToggle() {
    setIsModalOpen(!isModalOpen);
  }

  function applyButtonCss() {
    const Button = styled.button`
      color: #04040a !important;
      text-decoration: none;
      background: #9e9ea8;
      padding: 10px;
      border: 1px solid #9e9ea8 !important;
      display: inline-block;
      transition: all 0.4s ease 0s;
      border-radius: 20px;
      width: 20em;

      &:hover {
        cursor: pointer;
        color: #ffffff !important;
        background: #f6b93b;
        border-color: #f6b93b !important;
        transition: all 0.4s ease 0s;
      }
    `;

    return Button;
  }

  return (
    <Wrapper>
      <div onClick={handleModalToggle}>
        <ProfileImg src={`${process.env.PUBLIC_URL}/images/G-logo.png`} alt='logo' />
      </div>
      <Modal isOpen={isModalOpen} handleOnClick={handleModalToggle} >
        <Link to='/profile/edit'>
          <Button handleOnClick={handleModalToggle}>계정관리</Button>
        </Link>
        <Link to='/'>
          <Button handleOnClick={handleOnClick}>로그아웃</Button>
        </Link>
      </Modal>
    </Wrapper>
  );
}
