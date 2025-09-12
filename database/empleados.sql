CREATE TABLE empleados (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(100) NOT NULL,
    correo VARCHAR(100) NOT NULL,
    cargo VARCHAR(50) NOT NULL,
    fecha_ingreso DATE
);