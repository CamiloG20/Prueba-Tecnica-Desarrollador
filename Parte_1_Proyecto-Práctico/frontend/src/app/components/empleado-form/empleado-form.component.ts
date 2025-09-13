import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { EmpleadoService } from '../../services/empleado.service';

@Component({
  selector: 'app-empleado-form',
  templateUrl: './empleado-form.component.html',
  styleUrls: ['./empleado-form.component.scss']
})
export class EmpleadoFormComponent {
  form: FormGroup;
  loading = false;
  error = '';

  constructor(
    private fb: FormBuilder,
    private empleadoService: EmpleadoService,
    public dialogRef: MatDialogRef<EmpleadoFormComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.form = this.fb.group({
      nombre: [data?.nombre || '', Validators.required],
      correo: [data?.correo || '', [Validators.required, Validators.email]],
      cargo: [data?.cargo || '', Validators.required],
      fecha_ingreso: [data?.fecha_ingreso || '', Validators.required]
    });
  }

  onSubmit() {
    if (this.form.invalid) return;
    this.loading = true;
    this.error = '';
    const empleado = this.form.value;
    if (this.data && this.data.id) {
      this.empleadoService.actualizarEmpleado(this.data.id, empleado).subscribe({
        next: () => { this.loading = false; this.dialogRef.close('guardado'); },
        error: () => { this.loading = false; this.error = 'Error al actualizar.'; }
      });
    } else {
      this.empleadoService.crearEmpleado(empleado).subscribe({
        next: () => { this.loading = false; this.dialogRef.close('guardado'); },
        error: () => { this.loading = false; this.error = 'Error al crear.'; }
      });
    }
  }

  onCancel() {
    this.dialogRef.close();
  }
}
