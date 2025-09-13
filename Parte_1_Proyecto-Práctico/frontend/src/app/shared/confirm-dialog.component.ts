import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-confirm-dialog',
  template: `
    <div class="p-8 bg-white rounded-2xl shadow-xl max-w-sm mx-auto text-center border border-blue-100">
      <h2 class="text-xl font-bold mb-3 text-blue-700">{{ data.title || 'Confirmar' }}</h2>
      <p class="mb-7 text-gray-600">{{ data.message || '¿Está seguro que desea continuar?' }}</p>
      <div class="flex justify-center gap-4">
        <button (click)="onCancel()" class="bg-blue-100 hover:bg-blue-200 text-blue-700 font-semibold px-5 py-2 rounded-lg shadow">Cancelar</button>
        <button (click)="onConfirm()" class="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-5 py-2 rounded-lg shadow">Sí, eliminar</button>
      </div>
    </div>
  `
})
export class ConfirmDialogComponent {
  constructor(
    public dialogRef: MatDialogRef<ConfirmDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { title?: string; message?: string }
  ) {}

  onConfirm() {
    this.dialogRef.close(true);
  }

  onCancel() {
    this.dialogRef.close(false);
  }
}
