export default async function fetchBranchList(currentUser, isPrivateMode, searchQuery) {
  try {
    const userId = currentUser._id;
    const query = searchQuery || '';

    const fetchUrl = `http://localhost:4000/users/${userId}/branches/?q=${query}&private=${isPrivateMode}&limit=10`;

    const res = await fetch(fetchUrl, {
      method: 'GET',
      mode: 'cors',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${localStorage.getItem(process.env.REACT_APP_GOOGIT_LOGIN_TOKEN)}`,
      }
    });

    const response = await res.json();

    return response.data;
  } catch (err) {
    console.log('여기');
    console.error(err, 'note list error');
  }
}
