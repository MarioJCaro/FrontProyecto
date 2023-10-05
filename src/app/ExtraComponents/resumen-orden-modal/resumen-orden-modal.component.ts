import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-resumen-orden-modal',
  templateUrl: './resumen-orden-modal.component.html',
  styleUrls: ['./resumen-orden-modal.component.scss']
})
export class ResumenOrdenModalComponent {
  constructor(
    public dialogRef: MatDialogRef<ResumenOrdenModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) { }

  onCancel(): void {
    this.dialogRef.close();
  }

  onSubmit(): void {
    // Aquí puedes agregar la lógica para enviar el formulario.
    // Por ahora, simplemente cerraremos el modal y enviaremos la data.
    this.dialogRef.close(this.data);
  }
}