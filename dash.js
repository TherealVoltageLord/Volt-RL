const API = "https://voltagelord-volt-url-shortener.hf.space";
const token = localStorage.getItem('token');
if (!token) location.href = 'index.html';

async function shortenUrl() {
  const orig = document.getElementById('long-url').value.trim();
  const custom = document.getElementById('custom-alias').value.trim();
  const res = await fetch(`${API}/shorten`, {
    method: 'POST',
    headers: {
      'Content-Type':'application/json',
      'Authorization': `Bearer ${token}`
    },
    body: JSON.stringify({ original_url: orig, custom_alias: custom })
  });
  const data = await res.json();
  if (res.ok) {
    document.getElementById('short-url-result').innerHTML =
      `<a href="${API}/${data.short_url}" target="_blank">${API}/${data.short_url}</a>`;
    fetchLinks();
  } else {
    alert(data.error || 'Error shortening URL');
  }
}

async function fetchLinks() {
  const res = await fetch(`${API}/my-links`, {
    headers: { 'Authorization': `Bearer ${token}` }
  });
  const data = await res.json();
  const ul = document.getElementById('url-list');
  ul.innerHTML = '';
  if (res.ok && data.links) {
    data.links.forEach(u => {
      const li = document.createElement('li');
      li.innerHTML = `<strong>${API}/${u.short_url}</strong><br>Visits: ${u.click_count}`;
      ul.appendChild(li);
    });
  }
}

function logout() {
  localStorage.clear();
  location.href = 'index.html';
}

// initial load
fetchLinks();
