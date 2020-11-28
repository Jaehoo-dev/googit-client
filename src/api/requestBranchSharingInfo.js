export default async function requestBranchSharingInfo(userId, sharedUserInfoId) {
  try {
    const res = await fetch(
      `${process.env.REACT_APP_SERVER_URL}/users/${userId}/branch_sharing_infos/${sharedUserInfoId}`,
      {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem(process.env.REACT_APP_GOOGIT_LOGIN_TOKEN)}`,
        },
      }
    );

    const response = await res.json();

    if (response.result === 'failure') {
      alert('공유 정보를 불러오지 못했어요');

      return;
    }

    return response.branchSharingInfo;
  } catch (err) {
    throw err;
  }
}
