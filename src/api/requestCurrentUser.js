import { GOOGIT_LOGIN_TOKEN } from '../constants/auth';

export default async function requestCurrentUser() {
  let response = await fetch(`${process.env.REACT_APP_SERVER_URL}/users/current_user`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${localStorage.getItem(GOOGIT_LOGIN_TOKEN)}`,
    },
  });

  response = await response.json();

  if (response.result === 'failure') {
    alert('이용자 정보를 불러오지 못했습니다');

    return;
  }

  return response.user;
}
