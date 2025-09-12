import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  mensaje: { tipo: string, texto: string } | null = null;
  filtro: string = '';
  paginaActual: number = 1;
  tamanoPagina: number = 10;
  mostrarModalEmpleado: boolean = false;
  mostrarModalFamiliares: boolean = false;
  empleadoSeleccionado: any = null;

  buscarEmpleado() {}
  abrirAgregar() { this.mostrarModalEmpleado = true; this.empleadoSeleccionado = null; }
  abrirEditar(empleado: any) { this.mostrarModalEmpleado = true; this.empleadoSeleccionado = empleado; }
  eliminarEmpleado(empleado: any) {}
  abrirFamiliares(empleado: any) { this.mostrarModalFamiliares = true; this.empleadoSeleccionado = empleado; }
  cerrarModalEmpleado() { this.mostrarModalEmpleado = false; }
  cerrarModalFamiliares() { this.mostrarModalFamiliares = false; }
  actualizarLista() {}
}