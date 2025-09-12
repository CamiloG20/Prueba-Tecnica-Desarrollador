import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { EmpleadosService } from '../../services/empleados.service';
import { Empleado } from '../../models/empleado.model';

@Component({
  selector: 'app-empleado-form',
  templateUrl: './empleado-form.component.html',
  styleUrls: ['./empleado-form.component.scss']
})
export class EmpleadoFormComponent implements OnInit {
  @Input() empleado?: Empleado;
  @Output() guardado = new EventEmitter<void>();
  form: FormGroup;
  loading = false;
  error = '';

  constructor(private fb: FormBuilder, private empleadosService: EmpleadosService) {
    this.form = this.fb.group({
      nombre: ['', Validators.required],
      correo: ['', [Validators.required, Validators.email]],
      cargo: ['', Validators.required],
      fecha_ingreso: ['']
    });
  }

  ngOnInit() {
    if (this.empleado) {
      this.form.patchValue(this.empleado);
    }
  }

  onSubmit() {
    if (this.form.invalid) return;
    this.loading = true;
    this.error = '';
    const data = this.form.value;
    if (this.empleado && this.empleado.id) {
      this.empleadosService.updateEmpleado(this.empleado.id, data).subscribe({
        next: () => { this.loading = false; this.guardado.emit(); },
        error: err => { this.loading = false; this.error = 'Error al actualizar.'; }
      });
    } else {
      this.empleadosService.createEmpleado(data).subscribe({
        next: () => { this.loading = false; this.guardado.emit(); this.form.reset(); },
        error: err => { this.loading = false; this.error = 'Error al crear.'; }
      });
    }
  }
}
