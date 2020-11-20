import React, { useState, useEffect } from 'react';
import styled, { ThemeProvider } from 'styled-components';
import Modal, { ModalCloseButton, themeSharing } from '../../shared/Modal';
import { isEmpty } from 'lodash';

const Wrapper = styled.div`
  margin-top: 6em;
`;

export default function SharingFunc({ currentUser }) {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const [email, setEmail] = useState('');
  const [sharingInfo, setSharingInfo] = useState({});

  function toggleModal() {
    setIsModalOpen(!isModalOpen);
  }

  useEffect(() => {
    async function createBranchSharingInfo() {

      const res = await fetch('http://localhost:4000/users/:user_id/branches/5fb381c8664091175a0e7b3f/share', {
        method: 'POST',
        mode: 'cors',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem(process.env.REACT_APP_GOOGIT_LOGIN_TOKEN)}`,
        },
        body: JSON.stringify({
          currentUser,
          sharingInfo
        })
      });
    }

    if (!isEmpty(sharingInfo)) createBranchSharingInfo();
  }, [sharingInfo]);

  function handleOnChange(e) {
    setEmail(e.target.value);
  }

  function handleOnSubmit(e) {
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
      <button onClick={toggleModal}>sharing</button>
      <ThemeProvider theme={themeSharing}>
        <Modal isOpen={isModalOpen} toggleModal={toggleModal} >
          <ModalCloseButton toggleModal={toggleModal} />
          <form onSubmit={handleOnSubmit}>
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


