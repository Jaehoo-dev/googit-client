export default async function requestCreateBranch(currentUser) {
  const branchCreateRes = await fetch(
    `${process.env.REACT_APP_SERVER_URL}:4000/users/${currentUser._id}/branches/new`,
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${localStorage.getItem(process.env.REACT_APP_GOOGIT_LOGIN_TOKEN)}`,
      },
    }
  );

  const branchCreateResponse = await branchCreateRes.json();

  if (branchCreateResponse.result === 'failure') {
    alert('브랜치를 만들다가 문제가 생겼어요');

    return;
  }

  return branchCreateResponse;
}
