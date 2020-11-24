
export default async function requestCreateBranchSharingInfo(currentUser, currentNote, sharingInfo) {
  const userId = currentUser._id;
  const noteId = currentNote.parent;

  const res = await fetch(
    `http://localhost:4000/users/${userId}/branches/${noteId}/share/new`,
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

  alert('성공적으로 공유했습니다.');

  return;
}

