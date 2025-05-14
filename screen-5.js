document.addEventListener("DOMContentLoaded", () => {
    
    const currentPath = window.location.pathname;
  const loggedinuser = localStorage.getItem('user');

  if (!loggedinuser && currentPath.includes('screen-8.html')) {
    window.location.href = 'screen-5.html';
    return;
  }

  if (loggedinuser && currentPath.includes('screen-5.html')) {
    window.location.href = 'screen-8.html';
    return;
  }
  const registerBtn = document.getElementById('register-btn');

  registerBtn?.addEventListener('click', async (e) => {
    e.preventDefault();

    const name = document.getElementById('register-name').value;
    const email = document.getElementById('register-email').value;
    const password = document.getElementById('register-password').value;
    const phone = document.getElementById('register-phone').value;

    const response = await fetch('http://127.0.0.1:3000/register', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ name, email, password, phone })
    });

    const result = await response.json();
    alert(result.message || result.error);
    if (result.message === 'User registered successfully') {
    window.location.href = 'screen-8.html';
  }
  });
 const loginBtn = document.getElementById('login-btn');

loginBtn?.addEventListener('click', async (e) => {
  e.preventDefault();

  const email = document.getElementById('login-email').value;
  const password = document.getElementById('login-password').value;

  const response = await fetch('http://127.0.0.1:3000/login', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, password })
  });

  const result = await response.json();
  alert(result.message || result.error);
   if (result.message === 'Login successful') {
    // Save user info and go to screen-8
    localStorage.setItem('user', JSON.stringify(result.user));
    window.location.href = 'screen-8.html';
  } else {
    alert(result.message);
  }
});
});