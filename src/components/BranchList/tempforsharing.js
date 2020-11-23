import React, { useState, useEffect } from 'react';
import styled, { ThemeProvider } from 'styled-components';
import Modal, { ModalCloseButton, themeSharing } from '../shared/Modal';
import { isEmpty } from 'lodash';
import Button, { coralButtonTheme } from '../shared/Button/index new';

const Wrapper = styled.div`
  /* margin-top: 6em; */
`;

export default function SharingButton({ currentUser }) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [email, setEmail] = useState('');
  const [sharingInfo, setSharingInfo] = useState({});

  function toggleModal() {
    setIsModalOpen(!isModalOpen);
  }

  useEffect(() => {
    if (!isEmpty(sharingInfo)) createBranchSharingInfo();

    async function createBranchSharingInfo() {

      const res = await fetch('http://localhost:4000/users/:user_id/branches/5fb804bd3e0ce3ba997161e0/share', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem(process.env.REACT_APP_GOOGIT_LOGIN_TOKEN)}`,
        },
        body: JSON.stringify({
          currentUser,
          sharingInfo
        })
      });

      if (res.result === 'failure') {
        alert('이미 공유했습니다.');
        return;
      }

      alert('성공적으로 공유했습니다.');
      setIsModalOpen(!isModalOpen);
      return;
    }
  }, [sharingInfo]);

  function handleOnChange(e) {
    setEmail(e.target.value);
  }

  function submitHandler(e) {
    e.preventDefault();
    console.log(e.target.email.value);
    console.log(e.target.auth.value);

    const sharingInfo = {
      email: e.target.email.value,
      auth: e.target.auth.value,
    };

    setEmail('');
    setSharingInfo(sharingInfo);
  }

  return (
    <Wrapper>
      <Button
        theme={coralButtonTheme}
        currentUser={currentUser}
        onClick={toggleModal}
      >
        공유
        </Button>
      <ThemeProvider theme={themeSharing}>
        <Modal isOpen={isModalOpen} toggleModal={toggleModal} >
          <ModalCloseButton toggleModal={toggleModal} />
          <form onSubmit={submitHandler}>
            <input onChange={handleOnChange} value={email} name='email' type='text' />
            <select name='auth'>
              <option value='read only'>read only</option>
              <option value='write'>write</option>
            </select>
            <button>gogo</button>
          </form>
        </Modal>
      </ThemeProvider>
    </Wrapper>
  );
}


