import http from 'k6/http';
import { check, sleep, fail } from 'k6';

export const options = {
  stages: [
    { duration: '30s', target: 10 }, // Ramp-up lento ya que la creación es costosa (argon2)
    { duration: '1m', target: 50 },
    { duration: '30s', target: 100 },
  ],
};

const BASE_URL = __ENV.BASE_URL || 'http://localhost:8080';

// Setup: Obtener token de admin
export function setup() {
  const url = `${BASE_URL}/auth/login`;
  const payload = JSON.stringify({
    username: 'admin',
    password: 'admin',
  });
  const params = { headers: { 'Content-Type': 'application/json' } };
  const res = http.post(url, payload, params);

  if (res.status !== 200) {
    fail(`Setup failed: Unable to login as admin. Status: ${res.status}`);
  }

  return { token: res.json().token };
}

export default function (data) {
  const url = `${BASE_URL}/user`;
  
  // Generar datos únicos
  const id = `${__VU}-${__ITER}-${Math.floor(Math.random() * 1000000)}`;
  const payload = JSON.stringify({
    username: `user_${id}`,
    password: 'password123',
    email: `email_${id}@example.com`,
    rol: 'user',
  });

  const params = {
    headers: {
      'Authorization': `Bearer ${data.token}`,
      'Content-Type': 'application/json',
    },
  };

  const res = http.post(url, payload, params);

  check(res, {
    'is status 201 or 200': (r) => r.status === 201 || r.status === 200,
    'has username': (r) => r.json().username !== undefined,
  });
}
