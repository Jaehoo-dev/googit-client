import { HOST, PORT, USERS, BRANCHES, LIMIT_NUMBER } from '../constants/urls';
import { GET } from '../constants/httpMethods';

export default async function requestBranchList(
  currentUser, isPrivateMode
) {
  try {
    const userId = currentUser._id;

    const fetchUrl = isPrivateMode
      ? `http://localhost:4000/users/${userId}/branches/private` //?q=${keyword}&limit=${LIMIT_NUMBER}&skip=${skip}
      : `http://localhost:4000/users/${userId}/branches/`

    let response = await fetch(fetchUrl, {
      method: GET,
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
