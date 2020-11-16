import React, { useState } from 'react';
import styled from 'styled-components';
import AccountModal from './AcountModal/index';

const Wrapper = styled.div`
  margin-right: 2em;
`;

const ProfileImg = styled.img`
  width: 1em;
`;

export default function ProfileIcon({ img }) {
  const [isClicked, setIsClicked] = useState(false);

  function handleOnClick() {
    console.log('click');
    setIsClicked(!isClicked);
  }

  return (
    <Wrapper>
      <div onClick={handleOnClick}>
        <ProfileImg src={`${process.env.PUBLIC_URL}/images/G-logo.png`} alt='logo' />
      </div>
      <AccountModal open={isClicked} handleOnClick={handleOnClick} />
    </Wrapper>
  );
}
