export default async function requestNoteAuthor(userId, authorId) {
  const res = await fetch(
    `${process.env.REACT_APP_SERVER_URL}/users/${userId}/users/${authorId}`,
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
    alert('수정한 이용자 정보를 불러오지 못했습니다');

    return;
  }

  return response.author.username;
}
