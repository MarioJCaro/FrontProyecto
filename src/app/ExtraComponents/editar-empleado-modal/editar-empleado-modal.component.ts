import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Empleado } from 'src/app/models/empleado.model';

@Component({
  selector: 'app-editar-empleado',
  templateUrl: './editar-empleado-modal.component.html',
  styleUrls: ['./editar-empleado-modal.component.scss']
})
export class EditarEmpleadoModalComponent {
  roles: string[] = ['Chef', 'Bartender', 'Mozo', 'Otro'];

  constructor(
    public dialogRef: MatDialogRef<EditarEmpleadoModalComponent>,
    @Inject(MAT_DIALOG_DATA) public empleado: Empleado
  ) {}

  onCancel(): void {
    this.dialogRef.close();
  }
}
