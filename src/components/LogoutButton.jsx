import React from 'react';
import Button, { logoutButtonTheme } from './Button';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';

export default function LogoutButton({ onClick }) {
  function clickHandler() {
    if (window.confirm('로그아웃 하시겠습니까?')) {
      return onClick();
    }
  }

  return (
    <Button theme={logoutButtonTheme} onClick={clickHandler}>
      <ExitToAppIcon />
    </Button>
  );
}
