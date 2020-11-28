
export default async function updatePermission(currentUser, currentNote, sharedUserEmail, newPermission) {
  let response = await fetch(
    `${process.env.REACT_APP_SERVER_URL}/users/${currentUser._id}/branches/${currentNote.parent}/permission`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${localStorage.getItem(process.env.REACT_APP_GOOGIT_LOGIN_TOKEN)}`,
    },
    body: JSON.stringify({ newPermission, sharedUserEmail })
  });

  response = await response.json(response);
  console.log(response, 'in update shraed user');
  if (response.result === 'ok') {
    alert('권한을 수정했습니다.');
  }

  return [response.data];
}
