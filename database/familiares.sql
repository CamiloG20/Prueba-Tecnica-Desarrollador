CREATE TABLE familiares (
  id INT AUTO_INCREMENT PRIMARY KEY,
  empleado_id INT NOT NULL,
  nombre VARCHAR(100) NOT NULL,
  parentesco VARCHAR(50),
  fecha_nacimiento DATE,
  FOREIGN KEY (empleado_id) REFERENCES empleados(id) ON DELETE CASCADE
);