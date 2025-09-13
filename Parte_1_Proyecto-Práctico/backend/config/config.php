<?php
return [
    'db' => [
        'host' => 'localhost',
        'dbname' => 'prueba_tecnica',
        'user' => 'root',
        'pass' => ''
    ],
    // Cambia este valor por uno seguro y privado
    'api_key' => 'sk-2f8e1b7c-4e2a-4d8b-9c1e-8e7f1a2b3c4d',
    // Clave secreta para JWT
    'jwt_secret' => 'clave_super_secreta_para_jwt_2025'
];

// Definir constante global para JWT
if (!defined('JWT_SECRET')) {
    $config = include(__FILE__);
    define('JWT_SECRET', $config['jwt_secret']);
}
