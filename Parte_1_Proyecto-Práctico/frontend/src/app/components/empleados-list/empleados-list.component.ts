import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { EmpleadoService } from '../../services/empleado.service';
import { EmpleadoFormComponent } from '../empleado-form/empleado-form.component';
import { FamiliaresModalComponent } from '../familiares-modal/familiares-modal.component';

@Component({
  selector: 'app-empleados-list',
  templateUrl: './empleados-list.component.html',
  styleUrls: ['./empleados-list.component.scss']
})
export class EmpleadosListComponent implements OnInit {
  dataSource = new MatTableDataSource<any>([]);
  displayedColumns: string[] = ['nombre', 'correo', 'cargo', 'fecha_ingreso', 'acciones'];
  loading = false;
  error = '';

  constructor(private empleadoService: EmpleadoService, private dialog: MatDialog) {}

  ngOnInit() {
    this.cargarEmpleados();
  }

  cargarEmpleados() {
    this.loading = true;
    this.empleadoService.getEmpleados().subscribe({
      next: (data) => { this.dataSource.data = data; this.loading = false; },
      error: () => { this.error = 'Error al cargar empleados'; this.loading = false; }
    });
  }

  abrirFormulario(empleado: any = null) {
    const dialogRef = this.dialog.open(EmpleadoFormComponent, {
      width: '400px',
      data: empleado
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result === 'guardado') {
        this.cargarEmpleados();
      }
    });
  }

  eliminarEmpleado(id: number) {
    if (confirm('¿Eliminar empleado?')) {
      this.empleadoService.eliminarEmpleado(id).subscribe(() => this.cargarEmpleados());
    }
  }

  verFamiliares(empleado: any) {
    this.dialog.open(FamiliaresModalComponent, {
      width: '600px',
      data: { empleadoId: empleado.id }
    });
  }
}