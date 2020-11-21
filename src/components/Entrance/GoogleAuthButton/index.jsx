import React from 'react';
import { StyledGoogleAuthButton } from './styledComponents';

export default function GoogleAuthButton({
  signupOrLogin,
  onClick,
}) {
  function clickHandler() {
    onClick();
  }

  return (
    <StyledGoogleAuthButton onClick={clickHandler}>
      <img
        className='icon'
        src='/images/G-logo.png'
        alt='G-logo'
      />
      <span className='buttonText'>{signupOrLogin} with Google</span>
    </StyledGoogleAuthButton>
  );
}
