import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-agregar-item-modal',
  templateUrl: './agregar-item-modal.component.html',
  styleUrls: ['./agregar-item-modal.component.scss']
})
export class AgregarItemModalComponent {

  constructor(
    public dialogRef: MatDialogRef<AgregarItemModalComponent>,
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
