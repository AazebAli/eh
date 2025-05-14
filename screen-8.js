window.addEventListener('DOMContentLoaded', () => {
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
  const user = JSON.parse(localStorage.getItem('user'));

  if (user) {
    document.querySelectorAll('.text-wrapper-80')[0].textContent = user.name;
    document.querySelectorAll('.text-wrapper-80')[1].textContent = user.email;
  } else {
    // Redirect to login screen if no user info is found
    window.location.href = 'screen-5.html';
  }

  const logoutButton = document.getElementById('account-log-out');
  if (logoutButton) {
    logoutButton.addEventListener('click', () => {
      localStorage.removeItem('user');
      window.location.href = 'screen-5.html';
    });
  }
});
