import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';


@Component({
  selector: 'app-liberar-mesa-modal',
  templateUrl: './liberar-mesa-modal.component.html',
  styleUrls: ['./liberar-mesa-modal.component.scss']
})
export class LiberarMesaModalComponent {

  constructor(
    public dialogRef: MatDialogRef<LiberarMesaModalComponent>,
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