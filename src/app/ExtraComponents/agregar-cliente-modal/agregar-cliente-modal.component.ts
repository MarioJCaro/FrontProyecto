import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Cliente } from 'src/app/models/cliente.model';

@Component({
  selector: 'app-agregar-cliente',
  templateUrl: './agregar-cliente-modal.component.html',
  styleUrls: ['./agregar-cliente-modal.component.scss']
})
export class AgregarClienteModalComponent {

  constructor(
    public dialogRef: MatDialogRef<AgregarClienteModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) {}

  onConfirm(): void {
    // Confirmar y cerrar el modal retornando el nuevo empleado
    this.dialogRef.close();
  }

  onCancel(): void {
    // Cancelar y cerrar el modal sin retornar datos
    this.dialogRef.close();
  }
}
