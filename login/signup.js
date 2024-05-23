const btn = document.querySelector('#btn');
btn.addEventListener('click', async () => {
  const email = document.querySelector('#email').value;
  const name = document.querySelector('#name').value;
  const password = document.querySelector('#pwd').value;
  const cpwd = document.querySelector('#cpwd').value;
  const res = await fetch('http://127.0.0.1:8080/users/createUser', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      email,
      password,
      userName: name,
      confirmPassword: cpwd,
    }),
  });

  const data = await res.json();
  console.log(data);
});
