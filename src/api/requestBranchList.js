import { GET } from '../constants/httpMethods';

export default async function requestBranchList(currentUser, isPrivateMode, skip, keyword) {
  try {
    keyword = keyword || '';
    const fetchUrl = isPrivateMode
      ? `${process.env.REACT_APP_SERVER_URL}:4000/users/${currentUser._id}/branches/private/?limit=13&skip=${skip}&q=${keyword}`
      : `${process.env.REACT_APP_SERVER_URL}:4000/users/${currentUser._id}/branches/?limit=13&skip=${skip}&q=${keyword}`;

    let response = await fetch(fetchUrl, {
      method: GET,
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${localStorage.getItem(process.env.REACT_APP_GOOGIT_LOGIN_TOKEN)}`,
      }
    });

    response = await response.json();

    if (!response) return;

    if (response.result === 'no more branches') {
      return [];
    }
    return response.data;
  } catch (err) {
    alert(err);
  }
}
