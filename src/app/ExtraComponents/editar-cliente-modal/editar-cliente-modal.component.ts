import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Cliente } from 'src/app/models/cliente.model';

@Component({
  selector: 'app-editar-cliente',
  templateUrl: './editar-cliente-modal.component.html',
  styleUrls: ['./editar-cliente-modal.component.scss']
})
export class EditarClienteModalComponent {
  

  constructor(
    public dialogRef: MatDialogRef<EditarClienteModalComponent>,
    @Inject(MAT_DIALOG_DATA) public cliente: Cliente
  ) {}

  onCancel(): void {
    this.dialogRef.close();
  }
}
