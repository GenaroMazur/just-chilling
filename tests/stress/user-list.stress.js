import http from 'k6/http';
import { check, sleep, fail } from 'k6';

export const options = {
  stages: [
    { duration: '30s', target: 50 }, // Ramp-up a 50 usuarios
    { duration: '1m', target: 50 },  // Carga constante
    { duration: '30s', target: 0 },  // Ramp-down
  ],
};

const BASE_URL = __ENV.BASE_URL || 'http://localhost:8080';

// Setup: Obtener token de admin una vez por VU
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
  const params = {
    headers: {
      'Authorization': `Bearer ${data.token}`,
    },
  };

  const res = http.get(url, params);

  check(res, {
    'is status 200': (r) => r.status === 200,
    'is array': (r) => Array.isArray(r.json()),
  });
}
