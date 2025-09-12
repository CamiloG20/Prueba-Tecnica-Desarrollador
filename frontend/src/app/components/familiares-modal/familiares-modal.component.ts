import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Familiar } from '../../models/familiar.model';
import { EmpleadosService } from '../../services/empleados.service';

@Component({
  selector: 'app-familiares-modal',
  templateUrl: './familiares-modal.component.html',
  styleUrls: ['./familiares-modal.component.scss']
})
export class FamiliaresModalComponent implements OnInit {
  @Input() idEmpleado!: number;
  familiares: Familiar[] = [];
  form: FormGroup;
  loading = false;
  error = '';

  constructor(private empleadosService: EmpleadosService, private fb: FormBuilder) {
    this.form = this.fb.group({
      nombre_familiar: ['', Validators.required],
      parentesco: ['', Validators.required],
      fecha_nacimiento: ['']
    });
  }

  ngOnInit() {
    this.cargarFamiliares();
  }

  cargarFamiliares() {
    this.loading = true;
    this.empleadosService.getFamiliares(this.idEmpleado).subscribe({
      next: (data) => { this.familiares = data; this.loading = false; },
      error: () => { this.error = 'Error al cargar familiares'; this.loading = false; }
    });
  }

  onSubmit() {
    if (this.form.invalid) return;
    this.loading = true;
    this.empleadosService.createFamiliar(this.idEmpleado, this.form.value).subscribe({
      next: () => { this.form.reset(); this.cargarFamiliares(); },
      error: () => { this.error = 'Error al agregar familiar'; this.loading = false; }
    });
  }

  onDelete(id?: number) {
    if (!id) return;
    if (confirm('¿Eliminar familiar?')) {
      this.empleadosService.deleteFamiliar(id).subscribe({
        next: () => this.cargarFamiliares(),
        error: () => alert('Error al eliminar familiar')
      });
    }
  }
}
