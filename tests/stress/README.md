# Pruebas de Estrés con k6

Este directorio contiene scripts de k6 para realizar pruebas de carga y estrés sobre los endpoints críticos de la API.

## Requisitos

- [k6](https://k6.io/docs/getting-started/installation/) instalado en tu sistema.

## Scripts Disponibles

- `auth-login.stress.js`: Prueba el endpoint de inicio de sesión (`POST /auth/login`). Es intensivo en CPU debido al hashing de contraseñas con Argon2.
- `user-list.stress.js`: Prueba el listado de usuarios (`GET /user`). Requiere autenticación.
- `user-create.stress.js`: Prueba la creación de usuarios (`POST /user`). Genera datos aleatorios para evitar colisiones.

## Cómo Ejecutar

Asegúrate de que la aplicación esté corriendo (por defecto en `http://localhost:8080`).

### Ejecución Individual

```bash
k6 run tests/stress/auth-login.stress.js
```

### Ejecución con URL personalizada

```bash
k6 run -e BASE_URL=http://tu-api.com tests/stress/auth-login.stress.js
```

### Usando npm scripts

```bash
# Ejecutar prueba de login
npm run test:stress

# Ejecutar todas las pruebas secuencialmente
npm run test:stress:all
```

## Configuración de Escenarios

Cada script tiene definida su propia estrategia de `stages` (rampas de usuarios). Puedes ajustar estos valores directamente en la constante `options` dentro de cada archivo para simular diferentes niveles de carga.
