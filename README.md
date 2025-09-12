
# Prueba-Tecnica-Desarrollador
Demostrar habilidades prácticas en desarrollo fullstack, diseño de base de datos relacional, buenas prácticas de código y conocimientos sobre herramientas modernas como Angular, PHP y MySQL.

## API Backend (PHP)

### Seguridad
Todos los endpoints requieren el header:
```
Authorization: sk-2f8e1b7c-4e2a-4d8b-9c1e-8e7f1a2b3c4d
```

### Endpoints principales

#### Listar empleados
`GET /api/empleados`

#### Crear empleado
`POST /api/empleados`
Body JSON ejemplo:
```
{
	"nombre": "Juan Perez",
	"correo": "juan@correo.com",
	"cargo": "Desarrollador",
	"fecha_ingreso": "2025-09-11"
}
```

#### Editar empleado
`PUT /api/empleados/{id}`
Body igual al de crear.

#### Eliminar empleado
`DELETE /api/empleados/{id}`

#### Listar familiares de un empleado
`GET /api/empleados/{id}/familiares`

#### Agregar familiar
`POST /api/empleados/{id}/familiares`
Body JSON ejemplo:
```
{
	"nombre_familiar": "Ana Perez",
	"parentesco": "Hija",
	"fecha_nacimiento": "2010-05-01"
}
```

#### Eliminar familiar
`DELETE /api/familiares/{id}`

### Ejemplo de uso con Postman
1. Agrega el header `Authorization` con el valor de la API key.
2. Usa los endpoints anteriores con los métodos y cuerpos indicados.
3. Si envías datos inválidos, la API responderá con errores claros y código 422.

### Pruebas
Todos los endpoints han sido probados con Postman. Puedes importar los ejemplos anteriores para tus pruebas.

---

## Instalación y uso

### Backend (PHP)
1. Clona el repositorio y entra a la carpeta `backend`.
2. Copia el archivo `config/config.example.php` a `config/config.php` y ajusta los datos de conexión a tu base de datos MySQL y la API key.
3. Instala las dependencias de Composer si las hay (`composer install`).
4. Levanta el servidor local (puedes usar `php -S localhost:8000 -t public`).
5. Importa el script SQL de abajo en tu base de datos.

### Frontend (Angular)
1. Entra a la carpeta `frontend`.
2. Instala dependencias: `npm install`
3. Levanta el servidor: `npm start` o `ng serve`
4. Accede a `http://localhost:4200`

---

## Notas finales
- Si tienes errores de compilación en Angular, elimina la carpeta `node_modules`, ejecuta `npm install` y vuelve a compilar.
- La API requiere el header `Authorization` en todas las peticiones.
