export default async function apiRequestNoteList(isPrivate) {
  try {
    // console.log('notes list fetch')
    // isPrivate ? console.log('private') : console.log('recent');

    // let fetchUrl;

    // if (isPrivate) fetchUrl = '/users/:user_id/branches/private';
    // fetchUrl = '/users/:user_id/branches/';  //:id는 어떻게?

    // let response = await fetch(fetchUrl, {
    //     method: 'GET',
    //     mode: 'cors',
    //   });

    // response = response.json();
    // return response;
  } catch (err) {
    console.error(err, 'note list error');
  }
}
