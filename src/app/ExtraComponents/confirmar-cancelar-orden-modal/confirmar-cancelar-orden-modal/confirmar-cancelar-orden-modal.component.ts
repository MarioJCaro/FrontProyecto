import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ESTADOS } from 'src/app/constants/estadosOrden.constant';
import { OrdenService, UpdateOrdenRequest } from 'src/app/services/orden/orden.service';
import { ToastService } from 'src/app/services/toast/toast.service';

@Component({
  selector: 'app-confirmar-cancelar-orden-modal',
  templateUrl: './confirmar-cancelar-orden-modal.component.html',
  styleUrls: ['./confirmar-cancelar-orden-modal.component.scss']
})
export class ConfirmarCancelarOrdenModalComponent {
  constructor(
    public dialogRef: MatDialogRef<ConfirmarCancelarOrdenModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: {id : number},
    private ordenService: OrdenService,
    private toastService: ToastService
  ) {}

  cancelar(): void {
    this.dialogRef.close(false);
  }

  confirmar(): void {
    const datosActualizar: UpdateOrdenRequest = {
      estado: ESTADOS.CANCELADA, // Aquí estamos actualizando el estado de la orden
    };

    // Llamamos al método de actualización del servicio y nos suscribimos al Observable
    this.ordenService.updateOrden(this.data.id, datosActualizar).subscribe({
      next: (response) => {
        console.log('Orden actualizada, respuesta:', response);
        this.dialogRef.close();
        // Aquí podrías también manejar cualquier lógica post-actualización como alertas de éxito o refrescar la lista de órdenes
      },
      error: (error) => {
        console.error('Hubo un error al actualizar la orden:', error);
        // Aquí podrías manejar errores, como mostrar mensajes de error al usuario
      }
    });
  }
}
