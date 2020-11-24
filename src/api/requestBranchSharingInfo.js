export default async function requestBranchSharingInfo(userId, sharedUserInfoId) {
  const response = await fetch(
    `http://localhost:4000/users/${userId}/branch-sharing-infos/${sharedUserInfoId}`,
    {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${localStorage.getItem(process.env.REACT_APP_GOOGIT_LOGIN_TOKEN)}`,
      },
    }
  );

  return await response.json();
}
