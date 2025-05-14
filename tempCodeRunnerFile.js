
//   document.addEventListener("DOMContentLoaded", () => {
//     const registerBtn = document.getElementById('register-btn');
//     const loginBtn = document.getElementById('login-btn');

//     registerBtn?.addEventListener('click', async (e) => {
//       e.preventDefault();
//       const name = document.getElementById('register-name').value;
//       const email = document.getElementById('register-email').value;
//       const password = document.getElementById('register-password').value;

//       const response = await fetch('http://localhost:3000/register', {
//         method: 'POST',
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify({ name, email, password })
//       });

//       const result = await response.json();
//       alert(result.message || result.error);
//     });

//     loginBtn?.addEventListener('click', async (e) => {
//       e.preventDefault();
//       const email = document.getElementById('login-email').value;
//       const password = document.getElementById('login-password').value;

//       const response = await fetch('http://localhost:3000/login', {
//         method: 'POST',
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify({ email, password })
//       });

//       const result = await response.json();
//       alert(result.message || result.error);
//     });
//   });

document.addEventListener("DOMContentLoaded", () => {
  const registerBtn = document.getElementById('register-btn');

  registerBtn?.addEventListener('click', async (e) => {
    e.preventDefault();

    const name = document.getElementById('register-name').value;
    const email = document.getElementById('register-email').value;
    const password = document.getElementById('register-password').value;
    const phone = document.getElementById('register-phone').value;

    const response = await fetch('http://localhost:3000/register', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ name, email, password, phone })
    });

    const result = await response.json();
    alert(result.message || result.error);
  });
});
