import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-agregar-orden-modal',
  templateUrl: './agregar-orden-modal.component.html',
  styleUrls: ['./agregar-orden-modal.component.scss']
})
export class AgregarOrdenModalComponent {

  constructor(
    public dialogRef: MatDialogRef<AgregarOrdenModalComponent>,
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