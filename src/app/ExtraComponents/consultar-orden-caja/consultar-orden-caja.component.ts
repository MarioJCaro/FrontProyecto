import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { ErrorHandlingService } from 'src/app/services/errorHandling/error-handling.service';
import { PagosOrdenCajaModalComponent } from '../pagos-orden-caja-modal/pagos-orden-caja-modal.component';
import { OrdenService, estadoPagosResponse } from 'src/app/services/orden/orden.service';
import { EmpleadoResponse, EmpleadoService } from 'src/app/services/empleado/empleado.service';
import { EliminarItemOrdenComponent } from '../eliminar-item-orden/eliminar-item-orden.component';

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
        width: '30rem', // o el ancho que desees
        height: '30rem',
        // Puedes pasar datos al modal si es necesario
        data: { estadoPagos: this.estadoPagos }
      });
    }

    abrirModalEliminarItem(item: any) {
      this.dialog.open(EliminarItemOrdenComponent, {
        width: '250px', // Ancho del modal
        data: { item: item } // Pasando el item al modal
      });
    }
    
}
