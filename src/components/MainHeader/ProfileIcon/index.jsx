import React from 'react';
import Button, { coralButtonTheme } from '../../shared/Button';

export default function LogoutIcon({ onClick }) {

  function clickHandler() {
    onClick();
  }

  return (
    <Button theme={coralButtonTheme} onClick={clickHandler}>
      로그아웃
    </Button>
  );
}
