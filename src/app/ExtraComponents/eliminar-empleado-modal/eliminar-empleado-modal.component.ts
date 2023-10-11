import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-eliminar-empleado-modal',
  templateUrl: './eliminar-empleado-modal.component.html',
  styleUrls: ['./eliminar-empleado-modal.component.scss']
})
export class EliminarEmpleadoModalComponent {

  constructor(
    public dialogRef: MatDialogRef<EliminarEmpleadoModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: {nombre: string}
  ) {}

  cancelar(): void {
    this.dialogRef.close(false);
  }

  confirmar(): void {
    this.dialogRef.close(true);
  }

}
