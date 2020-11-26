export default async function requestCurrentUser() {
  const res = await fetch('http://localhost:4000/users/current_user', {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${localStorage.getItem(process.env.REACT_APP_GOOGIT_LOGIN_TOKEN)}`,
    },
  });

  const response = await res.json();

  if (response.result === 'failure') {
    alert('이용자 정보를 불러오지 못했습니다');

    return;
  }

  return response.user;
}
