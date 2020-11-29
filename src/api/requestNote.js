import { GOOGIT_LOGIN_TOKEN } from '../constants/auth';

export default async function requestNote(userId, noteId) {
  let response = await fetch(
    `${process.env.REACT_APP_SERVER_URL}/users/${userId}/notes/${noteId}`,
    {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${localStorage.getItem(GOOGIT_LOGIN_TOKEN)}`,
      },
    }
  );

  response = await response.json();

  if (response.result === 'failure') {
    alert('쪽지를 불러오지 못했습니다');

    return;
  }

  return response.note;
}
