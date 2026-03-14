const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';

// ─── Helpers ───────────────────────────────────────────────

function getToken() {
  return localStorage.getItem('ayursutra_token');
}

function setToken(token) {
  localStorage.setItem('ayursutra_token', token);
}

function removeToken() {
  localStorage.removeItem('ayursutra_token');
}

async function request(endpoint, options = {}) {
  const token = getToken();
  const headers = {
    'Content-Type': 'application/json',
    ...options.headers,
  };

  if (token) {
    headers['Authorization'] = `Bearer ${token}`;
  }

  const res = await fetch(`${API_URL}${endpoint}`, {
    ...options,
    headers,
  });

  const data = await res.json();

  if (!res.ok) {
    throw new Error(data.message || `Request failed with status ${res.status}`);
  }

  return data;
}

// ─── Auth ──────────────────────────────────────────────────

export async function apiLogin(email, password) {
  const data = await request('/api/auth/login', {
    method: 'POST',
    body: JSON.stringify({ email, password }),
  });
  setToken(data.token);
  return data;
}

export async function apiRegister(name, email, password) {
  const data = await request('/api/auth/register', {
    method: 'POST',
    body: JSON.stringify({ name, email, password }),
  });
  setToken(data.token);
  return data;
}

export async function apiGetMe() {
  return request('/api/auth/me');
}

export function apiLogout() {
  removeToken();
}

export function hasToken() {
  return !!getToken();
}

// ─── Users ─────────────────────────────────────────────────

export async function apiSaveDosha(dosha, doshaScores) {
  return request('/api/users/dosha', {
    method: 'PUT',
    body: JSON.stringify({ dosha, doshaScores }),
  });
}

// ─── Posts ──────────────────────────────────────────────────

export async function apiGetPosts() {
  return request('/api/posts');
}

export async function apiCreatePost(content) {
  return request('/api/posts', {
    method: 'POST',
    body: JSON.stringify({ content }),
  });
}

export async function apiToggleLike(postId) {
  return request(`/api/posts/${postId}/like`, {
    method: 'PUT',
  });
}

// ─── Herbs ─────────────────────────────────────────────────

export async function apiGetHerbs() {
  return request('/api/herbs');
}

export async function apiSeedHerbs() {
  return request('/api/herbs/seed', {
    method: 'POST',
  });
}
