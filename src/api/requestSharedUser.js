export default async function requestSharedUsers(currentUser, currentNote) {
  const userId = currentUser._id;
  const noteId = currentNote.parent;

  const res = await fetch(
    `${process.env.REACT_APP_SERVER_URL}/users/${userId}/branches/${noteId}/share/users`,
    {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${localStorage.getItem(process.env.REACT_APP_GOOGIT_LOGIN_TOKEN)}`,
      },
    }
  );

  const response = await res.json();

  if (response.result === 'not exist') {
    alert(`${response.message}`);
    return;
  }

  return response.data;
}
