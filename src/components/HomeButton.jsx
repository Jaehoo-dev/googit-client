import React from 'react';
import { HomeButtonWrapper } from '../styledComponents/HomeButton.styled';
import Button, { homeButtonTheme } from './Button';

export default function HomeButton({ onClick }) {
  function homeButtonClickHandler() {
    onClick();
  }

  return (
    <HomeButtonWrapper>
      <Button
        theme={homeButtonTheme}
        onClick={homeButtonClickHandler}
      >
        구깃
      </Button>
    </HomeButtonWrapper>
  );
}
