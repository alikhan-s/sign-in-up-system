// Helper to show alerts
function showAlert(message, type = 'danger') {
  const alertBox = document.getElementById('alertMessage');
  if (alertBox) {
    alertBox.innerHTML = `<div class="alert alert-${type}">${message}</div>`;
  } else {
    alert(message);
  }
}

// Handle Login
const loginForm = document.getElementById('loginForm');
if (loginForm) {
  loginForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    const email = document.getElementById('loginEmail').value;
    const password = document.getElementById('loginPassword').value;

    const res = await fetch('/api/auth/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password })
    });

    const data = await res.json();
    if (res.ok) {
      window.location.href = '/profile.html';
    } else {
      showAlert(data.message);
    }
  });
}

// Handle Register
const registerForm = document.getElementById('registerForm');
if (registerForm) {
  registerForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    const name = document.getElementById('regName').value;
    const email = document.getElementById('regEmail').value;
    const password = document.getElementById('regPassword').value;

    const res = await fetch('/api/auth/register', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name, email, password })
    });

    const data = await res.json();
    if (res.ok) {
      showAlert('Registration successful! Please login.', 'success');
      // Switch to login tab
      document.querySelector('#login-tab').click();
    } else {
      showAlert(data.message);
    }
  });
}

// Handle Profile Loading
async function loadProfile() {
  try {
    const res = await fetch('/api/auth/profile');
    if (!res.ok) {
      // If not authorized, redirect to login
      window.location.href = '/index.html';
      return;
    }
    const user = await res.json();
    document.getElementById('userName').innerText = user.name;
    document.getElementById('userEmail').innerText = user.email;
    document.getElementById('userId').innerText = user._id;
    document.getElementById('userDate').innerText = new Date(user.createdAt).toLocaleDateString();
  } catch (err) {
    console.error(err);
  }
}

// Handle Logout
const logoutBtn = document.getElementById('logoutBtn');
if (logoutBtn) {
  logoutBtn.addEventListener('click', async () => {
    await fetch('/api/auth/logout', { method: 'POST' });
    window.location.href = '/index.html';
  });
}