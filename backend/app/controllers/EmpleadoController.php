
<?php
require_once __DIR__ . '/../models/Empleado.php';

class EmpleadoController {
    private $model;
    public function __construct() {
        $this->model = new Empleado();
    }

    public function index() {
        $empleados = $this->model->all();
        echo json_encode($empleados);
    }

    public function show($id) {
        $empleado = $this->model->find($id);
        if ($empleado) {
            echo json_encode($empleado);
        } else {
            http_response_code(404);
            echo json_encode(['error' => 'Empleado no encontrado']);
        }
    }

    public function store() {
        $data = json_decode(file_get_contents('php://input'), true);
        if (!$data || !isset($data['nombre'], $data['correo'], $data['cargo'])) {
            http_response_code(400);
            echo json_encode(['error' => 'Datos incompletos']);
            return;
        }
        $empleado = $this->model->create($data);
        echo json_encode($empleado);
    }

    public function update($id) {
        $data = json_decode(file_get_contents('php://input'), true);
        if (!$data || !isset($data['nombre'], $data['correo'], $data['cargo'])) {
            http_response_code(400);
            echo json_encode(['error' => 'Datos incompletos']);
            return;
        }
        $empleado = $this->model->update($id, $data);
        echo json_encode($empleado);
    }

    public function destroy($id) {
        $ok = $this->model->delete($id);
        if ($ok) {
            echo json_encode(['success' => true]);
        } else {
            http_response_code(404);
            echo json_encode(['error' => 'Empleado no encontrado']);
        }
    }
}
