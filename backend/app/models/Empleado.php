<?php
require_once __DIR__ . '/../core/Database.php';

class Empleado {
    private $db;
    public function __construct() {
        $this->db = (new Database())->getPdo();
    }

    public function all() {
        $stmt = $this->db->query('SELECT * FROM empleados ORDER BY id DESC');
        return $stmt->fetchAll(PDO::FETCH_ASSOC);
    }

    public function find($id) {
        $stmt = $this->db->prepare('SELECT * FROM empleados WHERE id = ?');
        $stmt->execute([$id]);
        return $stmt->fetch(PDO::FETCH_ASSOC);
    }

    public function create($data) {
        $stmt = $this->db->prepare('INSERT INTO empleados (nombre, correo, cargo) VALUES (?, ?, ?)');
        $stmt->execute([
            $data['nombre'],
            $data['correo'],
            $data['cargo']
        ]);
        return $this->find($this->db->lastInsertId());
    }

    public function update($id, $data) {
        $stmt = $this->db->prepare('UPDATE empleados SET nombre = ?, correo = ?, cargo = ? WHERE id = ?');
        $stmt->execute([
            $data['nombre'],
            $data['correo'],
            $data['cargo'],
            $id
        ]);
        return $this->find($id);
    }

    public function delete($id) {
        $stmt = $this->db->prepare('DELETE FROM empleados WHERE id = ?');
        return $stmt->execute([$id]);
    }
}