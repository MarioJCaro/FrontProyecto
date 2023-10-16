import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Empleado } from 'src/app/models/empleado.model';

@Component({
  selector: 'app-agregar-empleado',
  templateUrl: './agregar-empleado-modal.component.html',
  styleUrls: ['./agregar-empleado-modal.component.scss']
})
export class AgregarEmpleadoModalComponent {

  empleado: Empleado = {
    id: 0, // Esto es solo un valor por defecto. Debes manejar cómo asignar un ID adecuadamente.
    nombre: '',
    apellido: '',
    telefono: '',
    nick: '',
    password: '',
    rol: '',
    activo: true
  };

  roles: string[] = ['Chef', 'Bartender', 'Mozo', 'Otro'];


  constructor(
    public dialogRef: MatDialogRef<AgregarEmpleadoModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) {}

  onConfirm(): void {
    // Confirmar y cerrar el modal retornando el nuevo empleado
    this.dialogRef.close(this.empleado);
  }

  onCancel(): void {
    // Cancelar y cerrar el modal sin retornar datos
    this.dialogRef.close();
  }
}
