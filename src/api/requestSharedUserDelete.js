export default async function deletePermission(currentUser, currentNote, sharedUserEmail) {
  const response = await fetch(
    `http://localhost:4000/users/${currentUser._id}/branches/${currentNote.parent}/permission/delete`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${localStorage.getItem(process.env.REACT_APP_GOOGIT_LOGIN_TOKEN)}`,
    },
    body: JSON.stringify({ sharedUserEmail })
  });

  if (response.ok) {
    alert('권한이 성공적으로 삭제되었습니다.');
    return;
  }
}
