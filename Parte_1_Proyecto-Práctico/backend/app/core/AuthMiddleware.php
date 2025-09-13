<?php
// backend/app/core/AuthMiddleware.php
require_once __DIR__ . '/JwtHelper.php';

class AuthMiddleware {
    public static function check() {
        $headers = getallheaders();
        if (!isset($headers['Authorization'])) {
            http_response_code(401);
            echo json_encode(['error' => 'Token no proporcionado']);
            exit;
        }
        $authHeader = $headers['Authorization'];
        if (strpos($authHeader, 'Bearer ') !== 0) {
            http_response_code(401);
            echo json_encode(['error' => 'Formato de token inválido']);
            exit;
        }
        $jwt = substr($authHeader, 7);
        $payload = JwtHelper::decode($jwt);
        if (!$payload) {
            http_response_code(401);
            echo json_encode(['error' => 'Token inválido o expirado']);
            exit;
        }
        return $payload;
    }
}
