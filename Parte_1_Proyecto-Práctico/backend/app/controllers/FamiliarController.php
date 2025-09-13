<?php
require_once __DIR__ . '/../models/Familiar.php';

class FamiliarController {
    public function index($id_empleado) {
        $familiares = Familiar::allByEmpleado($id_empleado);
        echo json_encode($familiares);
    }
    public function create($id_empleado) {
        $data = json_decode(file_get_contents('php://input'), true);
        // Validar y crear familiar usando solo 'nombre' como campo
        $errores = $this->validarFamiliar($data);
        if (!empty($errores)) {
            http_response_code(422);
            echo json_encode(['errors' => $errores]);
            return;
        }
        if (Familiar::create($id_empleado, $data)) {
            http_response_code(201);
            echo json_encode(['message' => 'Familiar creado']);
        } else {
            http_response_code(400);
            echo json_encode(['error' => 'Error al crear familiar']);
        }
    }
    // Validación de datos de familiar
    private function validarFamiliar($data) {
        $errores = [];
        if (empty($data['nombre'])) {
            $errores['nombre'] = 'El nombre del familiar es obligatorio.';
        }
        if (empty($data['parentesco'])) {
            $errores['parentesco'] = 'El parentesco es obligatorio.';
        }
        return $errores;
    }
    public function delete($id) {
        if (Familiar::delete($id)) {
            echo json_encode(['message' => 'Familiar eliminado']);
        } else {
            http_response_code(400);
            echo json_encode(['error' => 'Error al eliminar familiar']);
        }
    }
}
