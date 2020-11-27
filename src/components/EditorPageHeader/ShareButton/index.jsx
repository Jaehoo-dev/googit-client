import React, { useState, useEffect } from 'react';
import SharedUserList from './SharedUserList';
import Modal, { ModalCloseButton, sharingModalTheme } from '../../shared/Modal';
import Button, { coralButtonTheme, shareButtonTheme } from '../../shared/Button';
import { ModalContentWrapper, StyledForm } from '../styledComponents';
import requestSharedUser from '../../../api/requestSharedUser';
import requestSharedUserUpdate from '../../../api/requestSharedUserUpdate';
import requestSharedUserDelete from '../../../api/requestSharedUserDelete';
import requestCrateBranchSharingInfo from '../../../api/requestCreateBranchSharingInfo';

export default function SharingButton({ currentUser, currentNote, onSharedUsersLoad, sharedUsers, authorName }) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [actionName, setActionName] = useState('');
  const [email, setEmail] = useState('');

  function toggleModal() {
    setIsModalOpen(!isModalOpen);
    setIsSubmitted(!isSubmitted);
  }

  useEffect(() => {
    if (isModalOpen) loadSharedUsers();

    async function loadSharedUsers() {
      const sharedUsers = await requestSharedUser(currentUser, currentNote);

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

  async function permissionUpdateAndDeleteSubmitHandler(event) {
    event.preventDefault();
    if (authorName !== currentUser.username) {
      alert('작성자만 수정 가능합니다.');
      return;
    }

    const sharedUserEmail = event.target.email.value;
    const newPermission = event.target.permission.value;

    actionName === 'update'
      ? updatePermission(currentUser, currentNote, sharedUserEmail, newPermission)
      : deletePermission(currentUser, currentNote, sharedUserEmail, newPermission);

    async function updatePermission(currentUser, currentNote, sharedUserEmail, newPermission) {
      const sharedUsers = await requestSharedUserUpdate(currentUser, currentNote, sharedUserEmail, newPermission);
      if (sharedUsers) onSharedUsersLoad(sharedUsers);
    }

    async function deletePermission(currentUser, currentNote, sharedUserEmail) {
      await requestSharedUserDelete(currentUser, currentNote, sharedUserEmail);
      onSharedUsersLoad([]);
    }
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
          <ModalCloseButton onClick={toggleModal} />
          <StyledForm onSubmit={submitHandler}>
            <input onChange={handleOnChange} value={email} name='email' type='text' />
            <select name='permission'>
              <option value='read only'>read only</option>
              <option value='write'>write</option>
            </select>
            <Button theme={shareButtonTheme}>공유</Button>
          </StyledForm>
          <SharedUserList
            sharedUsers={sharedUsers}
            submitHandler={permissionUpdateAndDeleteSubmitHandler}
            onClick={setActionName}
          />
        </ModalContentWrapper>
      </Modal>
    </>
  );
}
