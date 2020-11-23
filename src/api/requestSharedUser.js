export default async function requestSharedUsers( currentUser, currentNote ) {
  const userId = currentUser._id;
  const noteId = currentNote.parent;
  // const branchId = currentBranch._id;  cuz of promising problem
  
  const res = await fetch(
    `http://localhost:4000/users/${userId}/branches/${noteId}/share/users`,
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

  return response.sharedUserEmails;
}
