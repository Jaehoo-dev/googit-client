//userinput을 escape해야하나?
//태그가 들어오면? 리액트가 알아서 이스케이프?

export async function apiSearchNoteByKeyword(keyword) {
  try {
    let response = await fetch(`/users/123123/branches?q=${keyword}`, {
      method: 'GET',
      mode: 'cors',
    });
    response = response.json();
    return response;
  } catch (err) {
    console.error(err, 'apiKeyword error');
  }
}

export async function apiSearchAutoComplete() {
  console.log('autoComplete');
}
