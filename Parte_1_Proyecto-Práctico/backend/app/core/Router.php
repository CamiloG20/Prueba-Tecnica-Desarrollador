<?php
class Router {
    public function route($method, $uri) {
        
    $uri = parse_url($uri, PHP_URL_PATH);
    // Normalizar: quitar barras finales extra excepto la raíz y pasar a minúsculas
    $uri = strtolower(rtrim($uri, '/'));
    if ($uri === '') $uri = '/';
    // Log personalizado para depuración
    file_put_contents(__DIR__ . '/../../router_debug.log', "URI: $uri | METHOD: $method\n", FILE_APPEND);
        require_once __DIR__ . '/../controllers/EmpleadoController.php';
        require_once __DIR__ . '/../controllers/FamiliarController.php';
        // Empleados (acepta con o sin barra final)
        if ($uri === '/api/empleados' && $method === 'GET') {
            (new EmpleadoController())->index();
            return;
        }
        if ($uri === '/api/empleados' && $method === 'POST') {
            (new EmpleadoController())->create();
            return;
        }
        if (preg_match('#^/api/empleados/(\d+)$#', $uri, $matches) && $method === 'PUT') {
            (new EmpleadoController())->update($matches[1]);
            return;
        }
        if (preg_match('#^/api/empleados/(\d+)$#', $uri, $matches) && $method === 'DELETE') {
            (new EmpleadoController())->delete($matches[1]);
            return;
        }

        // Familiares directos (acepta con o sin barra final)
        if (preg_match('#^/api/empleados/(\d+)/familiares$#', $uri, $matches) && $method === 'GET') {
            (new FamiliarController())->index($matches[1]);
            return;
        }
        if (preg_match('#^/api/empleados/(\d+)/familiares$#', $uri, $matches) && $method === 'POST') {
            (new FamiliarController())->create($matches[1]);
            return;
        }
        if (preg_match('#^/api/familiares/(\d+)$#', $uri, $matches) && $method === 'DELETE') {
            (new FamiliarController())->delete($matches[1]);
            return;
        }

        http_response_code(404);
        echo json_encode(['error' => 'Endpoint no encontrado']);
    }
}
