<?php
// public/index.php
// Punto de entrada para el backend CRUD básico de empleados

header('Content-Type: application/json');
// Cambia la URL por la de tu frontend en producción si es necesario
header('Access-Control-Allow-Origin: http://localhost:4200');
header('Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type');

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit;
}

require_once __DIR__ . '/../config/config.php';
require_once __DIR__ . '/../app/core/Database.php';

require_once __DIR__ . '/../app/controllers/EmpleadoController.php';
require_once __DIR__ . '/../app/controllers/FamiliarController.php';


$controller = new EmpleadoController();
$familiarController = new FamiliarController();

$method = $_SERVER['REQUEST_METHOD'];
$uri = $_SERVER['REQUEST_URI'];

// Rutas para empleados y familiares
if (preg_match('#/api/empleados/?([0-9]*)/familiares/?([0-9]*)#', $uri, $matches)) {
    $empleado_id = isset($matches[1]) && $matches[1] !== '' ? (int)$matches[1] : null;
    $familiar_id = isset($matches[2]) && $matches[2] !== '' ? (int)$matches[2] : null;
    switch ($method) {
        case 'GET':
            if ($empleado_id) {
                $familiarController->index($empleado_id);
            } else {
                http_response_code(400);
                echo json_encode(['error' => 'ID de empleado requerido']);
            }
            break;
        case 'POST':
            if ($empleado_id) {
                $familiarController->create($empleado_id);
            } else {
                http_response_code(400);
                echo json_encode(['error' => 'ID de empleado requerido']);
            }
            break;
        default:
            http_response_code(405);
            echo json_encode(['error' => 'Método no permitido']);
    }
} else if (preg_match('#/api/familiares/?([0-9]*)#', $uri, $matches)) {
    $familiar_id = isset($matches[1]) && $matches[1] !== '' ? (int)$matches[1] : null;
    switch ($method) {
        case 'DELETE':
            if ($familiar_id) {
                $familiarController->delete($familiar_id);
            } else {
                http_response_code(400);
                echo json_encode(['error' => 'ID de familiar requerido']);
            }
            break;
        default:
            http_response_code(405);
            echo json_encode(['error' => 'Método no permitido']);
    }
} else if (preg_match('#/api/empleados/?([0-9]*)#', $uri, $matches)) {
    $id = isset($matches[1]) && $matches[1] !== '' ? (int)$matches[1] : null;
    switch ($method) {
        case 'GET':
            if ($id) {
                $controller->show($id);
            } else {
                $controller->index();
            }
            break;
        case 'POST':
            $controller->store();
            break;
        case 'PUT':
            if ($id) {
                $controller->update($id);
            } else {
                http_response_code(400);
                echo json_encode(['error' => 'ID requerido para actualizar']);
            }
            break;
        case 'DELETE':
            if ($id) {
                $controller->destroy($id);
            } else {
                http_response_code(400);
                echo json_encode(['error' => 'ID requerido para eliminar']);
            }
            break;
        default:
            http_response_code(405);
            echo json_encode(['error' => 'Método no permitido']);
    }
} else {
    http_response_code(404);
    echo json_encode(['error' => 'Ruta no encontrada']);
}
