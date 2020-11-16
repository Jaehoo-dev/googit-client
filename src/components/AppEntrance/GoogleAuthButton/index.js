import React from 'react';
import styled from 'styled-components';

const GoogleAuthBtn = styled.button`
  display: flex;
  background: white;
  color: #444;
  width: 220px;
  border-radius: 5px;
  border: thin solid #888;
  box-shadow: 1px 1px 5px 1px rgba(0, 0, 0, 0.2);
  white-space: nowrap;
  padding: 2px 0 2px 10px;
  margin-bottom: 8px;

  &:hover {
    cursor: pointer;
  }

  .icon {
    display: flex;
    vertical-align: middle;
    width: 40px;
    height: 40px;
  }

  .buttonText {
    display: flex;
    vertical-align: middle;
    margin: auto;
    font-size: 14px;
    font-weight: bold;
    font-family: 'Roboto', sans-serif;
  }
`;

export default function GoogleAuthButton({
  signupOrLogin,
  onClick,
}) {
  function clickHandler() {
    onClick();
  }

  return (
    <GoogleAuthBtn onClick={clickHandler}>
      <img
        className='icon'
        src='/images/G-logo.png'
        alt=''
      />
      <span className='buttonText'>{signupOrLogin} with Google</span>
    </GoogleAuthBtn>
  );
}
