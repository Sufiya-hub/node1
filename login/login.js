const btn = document.querySelector('#btn');

btn.addEventListener('click', async () => {
  const email = document.querySelector('#email').value;
  const pwd = document.querySelector('#pwd').value;
  console.log(email, pwd);
  const data = await fetch('http://127.0.0.1:8080/users/login', {
    method: 'POST',
    body: JSON.stringify({
      trail: 'ka',
      email: email,
      password: pwd,
    }),
    headers: {
      'Content-Type': 'application/json',
    },
  });
  //   //   console.log(data);
  const res = await data.json();
  console.log(res);
  document.cookie = `jwt=${res.token}; `;
  window.location.reload();
});

const cookies = document.cookie.split('; ');
let jwt;
cookies.forEach((el) => {
  if (el.split('=')[0] === 'jwt') jwt = el.split('=')[1];
});
if (jwt && jwt !== 'undefined') {
  window.location.href = './index.html';
}
