CREATE TABLE empleados (
  id INT AUTO_INCREMENT PRIMARY KEY,
  nombre VARCHAR(255) NOT NULL,
  correo VARCHAR(255) NOT NULL,
  cargo VARCHAR(100) NOT NULL,
  fecha_ingreso DATE
);

CREATE TABLE familiares (
  id INT AUTO_INCREMENT PRIMARY KEY,
  id_empleado INT NOT NULL,
  nombre_familiar VARCHAR(255) NOT NULL,
  parentesco VARCHAR(100) NOT NULL,
  fecha_nacimiento DATE,
  FOREIGN KEY (id_empleado) REFERENCES empleados(id) ON DELETE CASCADE
);