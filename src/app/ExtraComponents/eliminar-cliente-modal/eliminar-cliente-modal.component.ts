import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-eliminar-cliente-modal',
  templateUrl: './eliminar-cliente-modal.component.html',
  styleUrls: ['./eliminar-cliente-modal.component.scss']
})
export class EliminarClienteModalComponent {

  constructor(
    public dialogRef: MatDialogRef<EliminarClienteModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: {nombre: string}
  ) {}

  cancelar(): void {
    this.dialogRef.close(false);
  }

  confirmar(): void {
    this.dialogRef.close(true);
  }

}
