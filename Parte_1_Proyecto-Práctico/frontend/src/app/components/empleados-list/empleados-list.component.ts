import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmDialogComponent } from '../../shared/confirm-dialog.component';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { EmpleadoService } from '../../services/empleado.service';
import { EmpleadoFormComponent } from '../empleado-form/empleado-form.component';
import { FamiliaresModalComponent } from '../familiares-modal/familiares-modal.component';

@Component({
  selector: 'app-empleados-list',
  templateUrl: './empleados-list.component.html',
  styleUrls: ['./empleados-list.component.scss']
})
export class EmpleadosListComponent implements OnInit, AfterViewInit {
  dataSource = new MatTableDataSource<any>([]);
  displayedColumns: string[] = ['nombre', 'correo', 'cargo', 'fecha_ingreso', 'acciones'];
  loading = false;
  error = '';
  filtro: string = '';
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(private empleadoService: EmpleadoService, private dialog: MatDialog) {}

  ngOnInit() {
    this.cargarEmpleados();
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

  cargarEmpleados() {
    this.loading = true;
    this.empleadoService.getEmpleados().subscribe({
      next: (data) => {
        this.dataSource.data = data;
        this.dataSource.paginator = this.paginator;
        this.loading = false;
      },
      error: () => { this.error = 'Error al cargar empleados'; this.loading = false; }
    });
  }

  aplicarFiltro(event: Event) {
    const valor = (event.target as HTMLInputElement).value;
    this.filtro = valor;
    this.dataSource.filter = valor.trim().toLowerCase();
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
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      width: '350px',
      data: {
        title: 'Eliminar empleado',
        message: '¿Está seguro que desea eliminar este empleado?'
      }
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.empleadoService.eliminarEmpleado(id).subscribe(() => this.cargarEmpleados());
      }
    });
  }

  verFamiliares(empleado: any) {
    this.dialog.open(FamiliaresModalComponent, {
      width: '600px',
      data: { empleadoId: empleado.id }
    });
  }
}