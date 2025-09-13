<?php
// backend/public/api/auth.php
require_once __DIR__ . '/../../app/core/JwtHelper.php';
require_once __DIR__ . '/../../app/core/Database.php';

header('Content-Type: application/json');

$method = $_SERVER['REQUEST_METHOD'];
if ($method !== 'POST') {
    http_response_code(405);
    echo json_encode(['error' => 'Método no permitido']);
    exit;
}

$input = json_decode(file_get_contents('php://input'), true);
$email = $input['correo'] ?? '';
$password = $input['password'] ?? '';

// Demo: usuario y contraseña fijos (ajusta según tu modelo real)
if ($email === 'admin@demo.com' && $password === 'admin123') {
    $payload = [
        'correo' => $email,
        'rol' => 'admin'
    ];
    $token = JwtHelper::encode($payload);
    echo json_encode(['token' => $token]);
    exit;
} else {
    http_response_code(401);
    echo json_encode(['error' => 'Credenciales inválidas']);
    exit;
}
