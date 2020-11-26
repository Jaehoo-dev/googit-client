
export default async function updatePermission(currentUser, currentNote, sharedUserEmail, newPermission) {
  let response = await fetch(
    `${process.env.REACT_APP_SERVER_URL}:4000/users/${currentUser._id}/branches/${currentNote.parent}/permission/update`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${localStorage.getItem(process.env.REACT_APP_GOOGIT_LOGIN_TOKEN)}`,
    },
    body: JSON.stringify({ newPermission, sharedUserEmail })
  });

  response = await response.json(response);

  if (response.result === 'ok') {
    alert('권한이 성공적으로 수정되었습니다.');
  }

  return [response.data];
}
