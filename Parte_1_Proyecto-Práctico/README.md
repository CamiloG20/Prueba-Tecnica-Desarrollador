# Prueba Técnica – Desarrollador Semi-Senior

## Requisitos
- Node.js y Angular CLI
- PHP >= 7.4
- MySQL

## Instalación y ejecución

### Backend (PHP)
1. Importa los scripts SQL de `database/empleados.sql` y `database/familiares.sql` en tu MySQL.
2. Configura los datos de conexión en `backend/config/config.php`.
3. Inicia un servidor local apuntando a la carpeta `backend/public` (por ejemplo, con XAMPP, Laragon o `php -S localhost:8000`).

### Frontend (Angular)
1. Ve a la carpeta `frontend`.
2. Ejecuta `npm install` para instalar dependencias.
3. Ejecuta `ng serve` y abre `http://localhost:4200` en tu navegador.

## Probar la API con Postman

### 1. Login y obtención de token
- Endpoint: `POST http://localhost/backend/public/api/auth.php`
- Body (JSON):
```
{
  "correo": "admin@demo.com",
  "password": "admin123"
}
```
- Respuesta: `{ "token": "..." }`

### 2. Usar el token en endpoints protegidos
Agrega el header:
```
Authorization: Bearer TU_TOKEN
```

### 3. Endpoints principales
- `GET /api/empleados` (público)
- `POST /api/empleados` (protegido)
- `PUT /api/empleados/{id}` (protegido)
- `DELETE /api/empleados/{id}` (protegido)
- `GET /api/empleados/{id}/familiares` (protegido)
- `POST /api/familiares` (protegido)

## Estructura de la base de datos

### Tabla empleados
| Campo         | Tipo         |
|-------------- | ------------|
| id            | INT (PK)     |
| nombre        | VARCHAR(100) |
| correo        | VARCHAR(100) |
| cargo         | VARCHAR(50)  |
| fecha_ingreso | DATE         |

### Tabla familiares_directos
| Campo           | Tipo         |
|---------------- | ------------|
| id              | INT (PK)     |
| id_empleado     | INT (FK)     |
| nombre_familiar | VARCHAR(100) |
| parentesco      | VARCHAR(50)  |
| fecha_nacimiento| DATE         |

## Notas
- El endpoint `GET /api/empleados` es público para cumplir el requisito de API pública.
- El resto de endpoints requieren autenticación JWT.
- El frontend Angular incluye validaciones, paginación, búsqueda y estilos modernos.

---

¿Dudas? Contacta al desarrollador.
