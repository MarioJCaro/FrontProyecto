import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { ErrorHandlingService } from 'src/app/services/errorHandling/error-handling.service';
import { PagosOrdenCajaModalComponent } from '../pagos-orden-caja-modal/pagos-orden-caja-modal.component';
import { OrdenService, estadoPagosResponse } from 'src/app/services/orden/orden.service';
import { EmpleadoResponse, EmpleadoService } from 'src/app/services/empleado/empleado.service';

@Component({
  selector: 'app-consultar-orden-caja',
  templateUrl: './consultar-orden-caja.component.html',
  styleUrls: ['./consultar-orden-caja.component.scss']
})
export class ConsultarOrdenCajaComponent {
  estadoPagos!: estadoPagosResponse;

  constructor(public dialogRef: MatDialogRef<ConsultarOrdenCajaComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private errorHandler:ErrorHandlingService,
    public dialog: MatDialog,
    private ordenService: OrdenService
    ) { }

    ngOnInit() {
      this.cargarEstadosPagos(this.data.orden.id);
    }

    cargarEstadosPagos(idOrden: number) {
      this.ordenService.getEstadosPagos(idOrden).subscribe({
        next: (response) => {
          // Guarda la respuesta completa en la variable del componente
          this.estadoPagos = response;
        },
        error: (error) => {
          this.errorHandler.handleError(error);
          // Manejo de errores
        }
      });
    }

    abrirModalPagos() {
      this.dialog.open(PagosOrdenCajaModalComponent, {
        width: '250px', // o el ancho que desees
        // Puedes pasar datos al modal si es necesario
        data: { estadoPagos: this.estadoPagos }
      });
    }
}
