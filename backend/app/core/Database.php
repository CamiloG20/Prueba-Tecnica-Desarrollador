
<?php
class Database {
    private $pdo;
    public function __construct() {
        $config = require __DIR__ . '/../../config/config.php';
        $db = $config['db'];
        $dsn = "mysql:host={$db['host']};dbname={$db['dbname']};charset=utf8";
        $this->pdo = new PDO($dsn, $db['user'], $db['pass'], [
            PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION
        ]);
    }
    public function getPdo() {
        return $this->pdo;
    }
}
