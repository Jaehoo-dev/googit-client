export default async function requestBranchList(currentUser, isPrivateMode, searchQuery) {
  try {
    const userId = currentUser._id;
    const query = searchQuery || '';

    const fetchUrl = `http://localhost:4000/users/${userId}/branches/?q=${query}&private=${isPrivateMode}&limit=10`;

    let response = await fetch(fetchUrl, {
      method: 'GET',
      mode: 'cors',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${localStorage.getItem(process.env.REACT_APP_GOOGIT_LOGIN_TOKEN)}`,
      }
    });

    response = await response.json();

    if (response.result === 'failure') {
      alert('브랜치를 받아오는 중 문제가 생겼어요');

      return;
    }

    return response.data;
  } catch (err) {
    console.error(err, 'note list error');
  }
}
