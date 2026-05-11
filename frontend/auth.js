async function login() {

  const email =
    document.getElementById('email').value;

  const password =
    document.getElementById('password').value;

  try {

    await fetch(
      `${API_BASE_URL}?action=login`,
      {
        method: 'POST',

        mode: 'no-cors',

        headers: {
          'Content-Type': 'application/json'
        },

        body: JSON.stringify({
          email,
          password
        })
      }
    );

    // TEMP USER SESSION
    localStorage.setItem(
      'uniformflow_user',
      JSON.stringify({
        name: 'Admin',
        role: 'admin'
      })
    );

    // REDIRECT TO DASHBOARD
    window.location.href =
      './dashboard.html';

  } catch(err) {

    console.error(err);

    alert('Network Error');

  }

}