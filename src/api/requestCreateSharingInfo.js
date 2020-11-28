
export default async function requestCreateSharingInfo(currentUser, currentNote, sharingInfo) {
  const userId = currentUser._id;
  const noteId = currentNote.parent;

  const res = await fetch(
    `${process.env.REACT_APP_SERVER_URL}/users/${userId}/branches/${noteId}/share/new`,
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${localStorage.getItem(process.env.REACT_APP_GOOGIT_LOGIN_TOKEN)}`,
      },
      body: JSON.stringify({ sharingInfo })
    }
  );

  const response = await res.json();

  if (response.result === 'validation err') {
    alert(`${response.message}`);

    return;
  }

  if (response.result === 'ok') {
    alert('공유했습니다');

    return;
  }

  alert('공유하다가 문제가 생겼어요');
}

