import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Cliente } from 'src/app/models/cliente.model';

@Component({
  selector: 'app-agregar-cliente',
  templateUrl: './agregar-cliente-modal.component.html',
  styleUrls: ['./agregar-cliente-modal.component.scss']
})
export class AgregarClienteModalComponent {

  cliente: Cliente = {
    id: 0, // Esto es solo un valor por defecto. Debes manejar cómo asignar un ID adecuadamente.
    nombre: '',
    apellido: '',
    telefono: '',
    cuenta: 0
  };


  constructor(
    public dialogRef: MatDialogRef<AgregarClienteModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) {}

  onConfirm(): void {
    // Confirmar y cerrar el modal retornando el nuevo empleado
    this.dialogRef.close(this.cliente);
  }

  onCancel(): void {
    // Cancelar y cerrar el modal sin retornar datos
    this.dialogRef.close();
  }
}
