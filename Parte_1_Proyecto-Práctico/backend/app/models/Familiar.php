<?php
require_once __DIR__ . '/../core/Database.php';

class Familiar {
    public static function allByEmpleado($empleado_id) {
        $db = new Database();
        $pdo = $db->getPdo();
        $stmt = $pdo->prepare("SELECT * FROM familiares WHERE empleado_id = ?");
        $stmt->execute([$empleado_id]);
        return $stmt->fetchAll(PDO::FETCH_ASSOC);
    }
    public static function create($empleado_id, $data) {
        $db = new Database();
        $pdo = $db->getPdo();
        $fecha = (isset($data['fecha_nacimiento']) && $data['fecha_nacimiento'] !== '') ? $data['fecha_nacimiento'] : null;
        $stmt = $pdo->prepare("INSERT INTO familiares (empleado_id, nombre, parentesco, fecha_nacimiento) VALUES (?, ?, ?, ?)");
        return $stmt->execute([
            $empleado_id,
            $data['nombre'],
            $data['parentesco'],
            $fecha
        ]);
    }
    public static function delete($id) {
        $db = new Database();
        $pdo = $db->getPdo();
        $stmt = $pdo->prepare("DELETE FROM familiares WHERE id = ?");
        return $stmt->execute([$id]);
    }
}
