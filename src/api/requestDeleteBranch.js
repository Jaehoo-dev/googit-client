export default async function requestDeleteBranch(user, branch) {
  try {
    const branchDeleteRes = await fetch(
      `${process.env.REACT_APP_SERVER_URL}:4000/users/${user._id}/branches/${branch._id}`,
      {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem(process.env.REACT_APP_GOOGIT_LOGIN_TOKEN)}`,
        },
      }
    );

    const branchDeleteResponse = await branchDeleteRes.json();

    if (branchDeleteResponse.result === 'failure') {
      alert('쪽지를 지우다가 문제가 생겼어요');

      return;
    }

    return branchDeleteResponse;
  } catch (err) {
    throw err;
  }
}
