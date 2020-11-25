export default async function requestBranchSharingInfo(userId, sharedUserInfoId) {
  try {
    console.log(userId);
    console.log(sharedUserInfoId);
    const res = await fetch(
      `http://localhost:4000/users/${userId}/branch-sharing-infos/${sharedUserInfoId}`,
      {
        method: 'GET',
        mode: 'cors',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem(process.env.REACT_APP_GOOGIT_LOGIN_TOKEN)}`,
        },
      }
    );
    console.log(res);

    const response = await res.json();

    if (response.result === 'failure') {
      alert('공유 정보를 불러오지 못했어요');

      return;
    }
    console.log(3);
    return response.branchSharingInfo;
  } catch (err) {
    console.log(err);
  }
}
