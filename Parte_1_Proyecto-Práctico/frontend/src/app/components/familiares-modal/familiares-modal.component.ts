import { Component, Inject, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ValidatorFn, AbstractControl } from '@angular/forms';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ConfirmDialogComponent } from '../../shared/confirm-dialog.component';
import { FamiliarService } from '../../services/familiar.service';

@Component({
  selector: 'app-familiares-modal',
  templateUrl: './familiares-modal.component.html'
})
export class FamiliaresModalComponent implements OnInit {
  familiares: any[] = [];
  form: FormGroup;
  loading = false;
  error = '';

  constructor(
    private familiarService: FamiliarService,
    private fb: FormBuilder,
    public dialogRef: MatDialogRef<FamiliaresModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { empleadoId: number },
    private dialog: MatDialog
  ) {
    this.form = this.fb.group({
      nombre: ['', Validators.required],
      parentesco: ['', Validators.required],
      fecha_nacimiento: ['', [Validators.required]]
    });
  }

  ngOnInit() {
    this.cargarFamiliares();
  }

  cargarFamiliares() {
    this.loading = true;
    this.familiarService.getFamiliaresPorEmpleado(this.data.empleadoId).subscribe({
      next: (familiares) => { this.familiares = familiares; this.loading = false; },
      error: () => { this.error = 'Error al cargar familiares'; this.loading = false; }
    });
  }

  agregarFamiliar() {
    if (this.form.invalid) return;
    this.loading = true;
    this.familiarService.agregarFamiliar(this.data.empleadoId, this.form.value).subscribe({
      next: () => { this.form.reset(); this.cargarFamiliares(); this.loading = false; },
      error: () => { this.error = 'Error al agregar familiar'; this.loading = false; }
    });
  }

  eliminarFamiliar(id: number) {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      width: '350px',
      data: {
        title: 'Eliminar familiar',
        message: '¿Está seguro que desea eliminar este familiar?'
      }
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.loading = true;
        this.familiarService.eliminarFamiliar(id).subscribe({
          next: () => { this.cargarFamiliares(); this.loading = false; },
          error: () => { this.error = 'Error al eliminar familiar'; this.loading = false; }
        });
      }
    });
  }

  cerrar() {
    this.dialogRef.close();
  }
}
