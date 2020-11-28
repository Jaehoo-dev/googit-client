import React from 'react';
import Button, { logoutButtonTheme } from '../../shared/Button';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSignOutAlt } from '@fortawesome/free-solid-svg-icons';

export default function LogoutIcon({ onClick }) {
  function clickHandler() {
    if (window.confirm('로그아웃 하시겠습니까?')) {
      return onClick();
    }
  }

  return (
    <Button theme={logoutButtonTheme} onClick={clickHandler}>
      <FontAwesomeIcon icon={faSignOutAlt} />
    </Button>
  );
}
