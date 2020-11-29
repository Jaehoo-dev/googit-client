import { GOOGIT_LOGIN_TOKEN } from '../constants/auth';

export default async function requestDeleteBranch(user, branch) {
  try {
    let branchDeleteResponse = await fetch(
      `${process.env.REACT_APP_SERVER_URL}/users/${user._id}/branches/${branch._id}`,
      {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem(GOOGIT_LOGIN_TOKEN)}`,
        },
      }
    );

    branchDeleteResponse = await branchDeleteResponse.json();

    if (branchDeleteResponse.result === 'failure') {
      alert('쪽지를 지우다가 문제가 생겼어요');

      return;
    }

    return branchDeleteResponse;
  } catch (err) {
    throw err;
  }
}
