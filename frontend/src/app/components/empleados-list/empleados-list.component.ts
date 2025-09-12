import { Component, OnInit } from '@angular/core';
import { EmpleadosService } from '../../services/empleados.service';
import { Empleado } from '../../models/empleado.model';

@Component({
  selector: 'app-empleados-list',
  templateUrl: './empleados-list.component.html',
  styleUrls: ['./empleados-list.component.scss']
})
export class EmpleadosListComponent implements OnInit {
  empleados: Empleado[] = [];
  empleadoEdit?: Empleado;
  mostrarForm = false;
  loading = false;
  error = '';

  // Filtro y paginación
  search = '';
  page = 1;
  pageSize = 5;
  showFamiliares = false;
  empleadoFamiliares?: Empleado;

  constructor(private empleadosService: EmpleadosService) {}

  ngOnInit() {
    this.cargarEmpleados();
  }

  cargarEmpleados() {
    this.loading = true;
    this.empleadosService.getEmpleados().subscribe({
      next: (data) => { this.empleados = data; this.loading = false; },
      error: (err) => { this.error = 'Error al cargar empleados'; this.loading = false; }
    });
  }

  get empleadosFiltrados() {
    let filtrados = this.empleados.filter(e =>
      e.nombre.toLowerCase().includes(this.search.toLowerCase()) ||
      e.correo.toLowerCase().includes(this.search.toLowerCase()) ||
      e.cargo.toLowerCase().includes(this.search.toLowerCase())
    );
    const start = (this.page - 1) * this.pageSize;
    return filtrados.slice(start, start + this.pageSize);
  }

  get totalPaginas() {
    return Math.ceil(this.empleados.filter(e =>
      e.nombre.toLowerCase().includes(this.search.toLowerCase()) ||
      e.correo.toLowerCase().includes(this.search.toLowerCase()) ||
      e.cargo.toLowerCase().includes(this.search.toLowerCase())
    ).length / this.pageSize);
  }

  onEdit(empleado: Empleado) {
    this.empleadoEdit = { ...empleado };
    this.mostrarForm = true;
  }

  onDelete(id?: number) {
    if (!id) return;
    if (confirm('¿Eliminar empleado?')) {
      this.empleadosService.deleteEmpleado(id).subscribe({
        next: () => this.cargarEmpleados(),
        error: () => alert('Error al eliminar')
      });
    }
  }

  onFamiliares(empleado: Empleado) {
    this.empleadoFamiliares = empleado;
    this.showFamiliares = true;
  }

  cerrarFamiliares() {
    this.showFamiliares = false;
    this.empleadoFamiliares = undefined;
  }

  onNuevo() {
    this.empleadoEdit = undefined;
    this.mostrarForm = true;
  }

  onGuardado() {
    this.mostrarForm = false;
    this.cargarEmpleados();
  }
}
