import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { Pago } from 'src/app/models/pago.model';
import { EmpleadoResponse, EmpleadoService } from 'src/app/services/empleado/empleado.service';
import { ErrorHandlingService } from 'src/app/services/errorHandling/error-handling.service';

@Component({
  selector: 'app-pagos-orden-caja-modal',
  templateUrl: './pagos-orden-caja-modal.component.html',
  styleUrls: ['./pagos-orden-caja-modal.component.scss']
})
export class PagosOrdenCajaModalComponent {
  empleados: { [key: number]: EmpleadoResponse } = {};

  constructor(public dialogRef: MatDialogRef<PagosOrdenCajaModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private errorHandler:ErrorHandlingService,
    public dialog: MatDialog,
    private empleadoService: EmpleadoService
    ) { }

    ngOnInit():void{
      this.getEmpleados();
    }

    getEmpleados(): void {
      this.data.estadoPagos.infoPagos.forEach((pago: Pago) => {
        this.empleadoService.getById(pago.empleadoId).subscribe({
          next: (empleado: EmpleadoResponse) => {
            // Suponiendo que EmpleadoResponse es el tipo que devuelve tu empleadoService
            this.empleados[pago.empleadoId] = empleado;
          },
          error: err => {
            this.errorHandler.handleError(err);
            console.error('Error al obtener el empleado:', err);
          }
        });
      });
    }
}
