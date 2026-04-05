import http from 'k6/http';
import { check, sleep } from 'k6';

export const options = {
  stages: [
    { duration: '30s', target: 20 }, // Ramp-up a 20 usuarios
    { duration: '1m', target: 20 },  // Carga constante
    { duration: '30s', target: 0 },  // Ramp-down
  ],
  thresholds: {
    http_req_duration: ['p(95)<500'], // 95% de las peticiones deben ser < 500ms
    http_req_failed: ['rate<0.01'],   // Menos del 1% de errores
  },
};

const BASE_URL = __ENV.BASE_URL || 'http://localhost:8080';

export default function () {
  const url = `${BASE_URL}/auth/login`;
  const payload = JSON.stringify({
    username: 'admin',
    password: 'admin',
  });

  const params = {
    headers: {
      'Content-Type': 'application/json',
    },
  };

  const res = http.post(url, payload, params);

  check(res, {
    'is status 200': (r) => r.status === 200,
    'has token': (r) => r.json().token !== undefined,
  });
}
