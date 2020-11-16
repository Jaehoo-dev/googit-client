import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

const Button = styled.button`
  color: #04040a !important;
  text-decoration: none;
  background: #9e9ea8;
  padding: 10px;
  border: 1px solid #9e9ea8 !important;
  display: inline-block;
  transition: all 0.4s ease 0s;
  border-radius: 20px;
  width: 20em;

  &:hover {
    color: #ffffff !important;
    background: #f6b93b;
    border-color: #f6b93b !important;
    transition: all 0.4s ease 0s;
  }
`;

export default function AccountManagement({ handleOnClick }) {
  return (
    <Link to='/profile/edit'>
      <Button onClick={handleOnClick}>
        계정관리
      </Button>
    </Link>
  );
}
