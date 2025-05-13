const API = "https://voltagelord-volt-url-shortener.hf.space";

async function signup() {
  const username = document.getElementById('username').value.trim();
  const password = document.getElementById('password').value.trim();
  const res = await fetch(`${API}/signup`, {
    method: 'POST',
    headers: {'Content-Type':'application/json'},
    body: JSON.stringify({ username, password })
  });
  const data = await res.json();
  if (res.ok) {
    alert('Account created! Log in now.');
  } else {
    alert(data.error || 'Sign up failed');
  }
}

async function login() {
  const username = document.getElementById('username').value.trim();
  const password = document.getElementById('password').value.trim();
  const res = await fetch(`${API}/login`, {
    method: 'POST',
    headers: {'Content-Type':'application/json'},
    body: JSON.stringify({ username, password })
  });
  const data = await res.json();
  if (res.ok && data.access_token) {
    localStorage.setItem('token', data.access_token);
    window.location.href = 'dash.html';
  } else {
    alert(data.error || 'Login failed');
  }
}
