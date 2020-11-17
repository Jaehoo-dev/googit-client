export default async function requestNoteList(isPrivate, currentUser) {
  try {
    // isPrivate ? console.log('private note fetch called') : console.log('recent note fetch called');
    console.log('ajax')
    const userId = currentUser._id;
    let fetchUrl;

    isPrivate
      ? fetchUrl = `http://localhost:4000/users/${userId}/branches/private`
      : fetchUrl = `http://localhost:4000/users/${userId}/branches/`;

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
    console.error(err, 'note list error');
  }
}
