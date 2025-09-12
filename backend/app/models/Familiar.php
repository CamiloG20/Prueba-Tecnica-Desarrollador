<?php
require_once __DIR__ . '/../core/Database.php';

class Familiar {
    public static function allByEmpleado($id_empleado) {
        $db = Database::connect();
        $stmt = $db->prepare("SELECT * FROM familiares_directos WHERE id_empleado = ?");
        $stmt->execute([$id_empleado]);
        return $stmt->fetchAll(PDO::FETCH_ASSOC);
    }
    public static function create($id_empleado, $data) {
        $db = Database::connect();
        $stmt = $db->prepare("INSERT INTO familiares_directos (id_empleado, nombre_familiar, parentesco, fecha_nacimiento) VALUES (?, ?, ?, ?)");
        return $stmt->execute([
            $id_empleado,
            $data['nombre_familiar'],
            $data['parentesco'],
            $data['fecha_nacimiento'] ?? null
        ]);
    }
    public static function delete($id) {
        $db = Database::connect();
        $stmt = $db->prepare("DELETE FROM familiares_directos WHERE id = ?");
        return $stmt->execute([$id]);
    }
}
