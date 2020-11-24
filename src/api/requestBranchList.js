import { HOST, PORT, USERS, BRANCHES, LIMIT_NUMBER } from '../constants/urls';
import { GET } from '../constants/httpMethods';

export default async function requestBranchList(currentUser, skip) {
  try {
    console.log('load notes');
    let response = await fetch(
      `http://localhost:4000/users/${currentUser._id}/branches/?limit=13&skip=${skip}`, {
      method: GET,
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${localStorage.getItem(process.env.REACT_APP_GOOGIT_LOGIN_TOKEN)}`,
      }
    }
    );

    response = await response.json();

    if (!response) return;
    if (response.result === 'no more branches') {
      console.log('last note noti');
      alert(`${response.message}`);
      return;
    }

    return response.data;

  } catch (err) {
    alert(err);
  }
}
