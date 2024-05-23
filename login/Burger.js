// document.cookie = 'sufiya=suf';
const cookies = document.cookie.split('; ');
let jwt;
cookies.forEach((el) => {
  if (el.split('=')[0] === 'jwt') jwt = el.split('=')[1];
});
console.log(jwt);
if (!jwt) {
  window.location.href = './login.html';
}
