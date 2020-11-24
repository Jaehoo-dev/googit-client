import React, { useState, useEffect } from 'react';
import Modal, { ModalCloseButton, sharingModalTheme } from '../../shared/Modal';
import Button, { coralButtonTheme, shareButtonTheme } from '../../shared/Button';
import { ModalContentWrapper, StyledForm, SharedUserList } from '../styledComponents';
import requestSharedUsers from '../../../api/requestSharedUser';
import requestCrateBranchSharingInfo from '../../../api/requestCreateBranchSharingInfo';

export default function SharingButton({ currentUser, currentNote, onSharedUsersLoad, sharedUsers }) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [email, setEmail] = useState('');

  function toggleModal() {
    setIsModalOpen(!isModalOpen);
    setIsSubmitted(!isSubmitted);
  }

  useEffect(() => {
    if (isModalOpen) loadSharedUsers();

    async function loadSharedUsers() {
      const sharedUsers = await requestSharedUsers(currentUser, currentNote);

      if (sharedUsers) onSharedUsersLoad(sharedUsers);
    }
  }, [isSubmitted]);

  function handleOnChange(event) {
    setEmail(event.target.value);
  }

  async function submitHandler(event) {
    event.preventDefault();

    const sharingInfo = {
      email: event.target.email.value,
      permission: event.target.permission.value
    };

    await requestCrateBranchSharingInfo(currentUser, currentNote, sharingInfo);

    setEmail('');
    setIsSubmitted(!isSubmitted);
  }

  return (
    <>
      <Button
        theme={coralButtonTheme}
        currentUser={currentUser}
        onClick={toggleModal}
      >
        공유
        </Button>
      <Modal theme={sharingModalTheme} isOpen={isModalOpen} toggleModal={toggleModal} >
        <ModalContentWrapper>
          <ModalCloseButton toggleModal={toggleModal} />
          <StyledForm onSubmit={submitHandler}>
            <input onChange={handleOnChange} value={email} name='email' type='text' />
            <select name='permission'>
              <option value='read only'>read only</option>
              <option value='write'>write</option>
            </select>
            <Button theme={shareButtonTheme}>공유</Button>
          </StyledForm>
          <SharedUserList>
            공유 유저리스트
              {sharedUsers && sharedUsers.map((user, i) => (
            <div key={i}>{user}</div>
          ))}
          </SharedUserList>
        </ModalContentWrapper>
      </Modal>
    </>
  );
}


