export default async function fetchBranchList(currentUser, isPrivate, searchQuery) {
  try {
    const userId = currentUser._id;
    const query = searchQuery || '';

    let fetchUrl = `http://localhost:4000/users/${userId}/branches/?q=${query}&private=${isPrivate}&limit=10`;
    // let fetchUrl = `http://localhost:4000/users/${userId}/branches/?q=${query}&private=${isPrivate}&limit=10&skip=${skip}`;

    let response = await fetch(fetchUrl, {
      method: 'GET',
      mode: 'cors',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${localStorage.getItem(process.env.REACT_APP_GOOGIT_LOGIN_TOKEN)}`,
      }
    });

    response = await response.json();
    return response.data;
  } catch (err) {
    console.log('여기');
    console.error(err, 'note list error');
  }
}
