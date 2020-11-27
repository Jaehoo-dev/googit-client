export default async function requestNote(userId, noteId) {
  const res = await fetch(
    `${process.env.REACT_APP_SERVER_URL}:4000/users/${userId}/notes/${noteId}`,
    {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${localStorage.getItem(process.env.REACT_APP_GOOGIT_LOGIN_TOKEN)}`,
      },
    }
  );

  const response = await res.json();

  if (response.result === 'failure') {
    alert('쪽지를 불러오지 못했습니다');

    return;
  }

  return response.note;
}
