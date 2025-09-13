# Prueba Técnica – Desarrollador Semi-Senior

Este proyecto demuestra habilidades prácticas en desarrollo fullstack, diseño de base de datos relacional, buenas prácticas de código y uso de herramientas modernas como Angular, PHP y MySQL. Incluye una API REST documentada y una interfaz web para la gestión de empleados y sus familiares.

---

## Objetivo

- Registrar, listar, editar y eliminar empleados.
- Relacionar empleados con familiares directos (uno a muchos).
- Exponer una API pública para consulta y administración.
- Aplicar buenas prácticas de arquitectura, validación y seguridad básica.

---

## Estructura del Proyecto

- **Backend:** PHP (estructura MVC simple), MySQL.
- **Frontend:** Angular (Angular CLI), estilos con Tailwind CSS.
- **Base de datos:** Tablas `empleados` y `familiares` relacionadas.

---

## Instalación y Uso

### Backend (PHP)
1. Clona el repositorio y entra a la carpeta `backend`.
2. Copia `config/config.example.php` a `config/config.php` y ajusta los datos de conexión y la API key.
3. Instala dependencias con Composer si es necesario:  
   `composer install`
4. Levanta el servidor local:  
   `php -S localhost:8000 -t public`
5. Importa el script SQL incluido para crear las tablas.

### Frontend (Angular)
1. Entra a la carpeta `frontend`.
2. Instala dependencias:  
   `npm install`
3. Inicia el servidor de desarrollo:  
   `ng serve`
4. Accede a la app en:  
   `http://localhost:4200`

---

## API REST (PHP)

**Seguridad:**  
Todos los endpoints requieren el header:  
```
Authorization: sk-2f8e1b7c-4e2a-4d8b-9c1e-8e7f1a2b3c4d
```

### Endpoints principales

- **Listar empleados:**  
  `GET /api/empleados`

- **Crear empleado:**  
  `POST /api/empleados`  
  ```json
  {
    "nombre": "Juan Perez",
    "correo": "juan@correo.com",
    "cargo": "Desarrollador",
    "fecha_ingreso": "2025-09-11"
  }
  ```

- **Editar empleado:**  
  `PUT /api/empleados/{id}`

- **Eliminar empleado:**  
  `DELETE /api/empleados/{id}`

- **Listar familiares de un empleado:**  
  `GET /api/empleados/{id}/familiares`

- **Agregar familiar:**  
  `POST /api/empleados/{id}/familiares`  
  ```json
  {
    "nombre": "Ana Perez",
    "parentesco": "Hija",
    "fecha_nacimiento": "2010-05-01"
  }
  ```

- **Eliminar familiar:**  
  `DELETE /api/familiares/{id}`

---

## Pruebas y Uso con Postman

1. Agrega el header `Authorization` con la API key.
2. Usa los endpoints anteriores según la documentación.
3. La API responde con errores claros y código 422 ante datos inválidos.

---

## Estructura de Base de Datos

**Tabla empleados**
| Campo         | Tipo         | Descripción         |
|---------------|--------------|---------------------|
| id            | INT (PK)     | Identificador       |
| nombre        | VARCHAR      | Nombre completo     |
| correo        | VARCHAR      | Correo electrónico  |
| cargo         | VARCHAR      | Cargo               |
| fecha_ingreso | DATE         | Fecha de ingreso    |

**Tabla familiares**
| Campo            | Tipo      | Descripción                  |
|------------------|-----------|------------------------------|
| id               | INT (PK)  | Identificador                |
| empleado_id      | INT (FK)  | Relación con empleados       |
| nombre           | VARCHAR   | Nombre del familiar          |
| parentesco       | VARCHAR   | Parentesco                   |
| fecha_nacimiento | DATE      | Fecha de nacimiento          |

---

## Notas

- Si tienes errores de compilación en Angular, elimina `node_modules`, ejecuta `npm install` y vuelve a compilar.
- La API requiere el header `Authorization` en todas las peticiones.
- El proyecto incluye validaciones, estilos modernos y ejemplos de uso en Postman.
